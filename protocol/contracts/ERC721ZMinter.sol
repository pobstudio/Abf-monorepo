// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import './tokens/ERC721Z.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';

contract ERC721ZMinter is Ownable, ReentrancyGuard {
  uint256 public constant MAX_MINTING_PER_ADDRESS = 6;
  uint256 public constant MAX_MINTING_PER_WHITELIST_TOKEN = 6;

  uint256 public price;

  uint256 public royaltyFraction;
  address public royaltyTreasury;

  address public whitelistToken;

  bool public isActive;

  bool public isInit = false;

  ERC721Z public nft;

  mapping(address => uint256) public mintCount;
  bytes32 public claimMerkleRoot;
  string public claimMerkleTreeURI;

  event ChangedIsActive(bool isActive);

  struct InitConfig {
    uint256 price;
    uint96 royaltyFraction;
    address whitelistToken;
    bytes32 claimMerkleRoot;
    string claimMerkleTreeURI;
  }

  constructor() {}

  function init(
    address owner,
    address _nft,
    InitConfig memory config
  ) public {
    require(!isInit, 'NFT has already been initialized');
    isInit = true;
    nft = ERC721Z(_nft);
    price = config.price;
    royaltyFraction = config.royaltyFraction;
    whitelistToken = config.whitelistToken;
    claimMerkleRoot = config.claimMerkleRoot;
    claimMerkleTreeURI = config.claimMerkleTreeURI;
    _transferOwnership(owner);
  }

  function setRoyaltyTreasury(address _royaltyTreasury) public onlyOwner {
    royaltyTreasury = _royaltyTreasury;
  }

  function setWhitelistToken(address _whitelistToken) public onlyOwner {
    whitelistToken = _whitelistToken;
  }

  function setIsActive(bool _isActive) public onlyOwner {
    isActive = _isActive;
    emit ChangedIsActive(isActive);
  }

  modifier onlyIsActive() {
    require(isActive, 'minting needs to be active to mint');
    _;
  }

  modifier onlyPublicMintOrWhitelist() {
    require(
      whitelistToken == address(0) ||
        IERC721(whitelistToken).balanceOf(msg.sender) > 0,
      'not whitelisted'
    );
    _;
  }

  function claim(
    address account,
    uint256 numMints,
    bytes32[] calldata proof
  ) external onlyIsActive {
    require(
      _verify(_leaf(account, numMints), proof),
      'ERC721ZMinter: Invalid claim merkle proof'
    );
    require(
      mintCount[account] == 0,
      'ERC721ZMinter: Already claimed or minted'
    );
    nft.adminMint(account, numMints);
    mintCount[account] += numMints;
  }

  function _verify(bytes32 leaf, bytes32[] memory proof)
    internal
    view
    returns (bool)
  {
    return MerkleProof.verify(proof, claimMerkleRoot, leaf);
  }

  function _leaf(address account, uint256 numMints)
    internal
    pure
    returns (bytes32)
  {
    return keccak256(abi.encodePacked(numMints, account));
  }

  function mint(address to, uint256 numMints)
    public
    payable
    nonReentrant
    onlyIsActive
    onlyPublicMintOrWhitelist
  {
    require(
      (mintCount[msg.sender] + numMints) <= MAX_MINTING_PER_ADDRESS,
      'exceeded number of mint in single call'
    );
    mintCount[msg.sender] += numMints;
    nft.adminMint(to, numMints);
    uint256 totalPrice = price * numMints;
    require(totalPrice <= msg.value, 'insufficient funds to pay for mint');
    if (royaltyFraction == 0) {
      nft.owner().call{value: totalPrice}('');
    } else {
      uint256 rendererRoyalty = (totalPrice * royaltyFraction) / 10000; // in bps
      nft.owner().call{value: totalPrice - rendererRoyalty}('');
      if (royaltyTreasury != address(0)) {
        royaltyTreasury.call{value: rendererRoyalty}('');
      } else {
        nft.metadataRenderer().owner().call{value: rendererRoyalty}('');
      }
    }
    payable(msg.sender).transfer(msg.value - totalPrice);
  }
}
