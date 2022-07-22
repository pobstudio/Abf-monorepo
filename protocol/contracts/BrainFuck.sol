// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./BrainFuckVM.sol";
import "./BrainFuckURIConstructor.sol";
import "./interfaces/IRenderer.sol";
import "./tokens/ERC721A.sol";

import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract BrainFuck is ERC721A, ERC2981, Ownable {

    uint public constant MAX_MINTING_PER_TX = 6;

    IRenderer public immutable renderer;

    uint256 public immutable mintingSupply;
    uint256 public immutable price;

    uint256 public immutable rendererRoyaltyFraction;
    address public immutable whitelistToken;
    bytes32 public immutable constants;

    bytes public seed;
    bytes public code;
    bool public isActive; 

    bytes public customContractURI;
    
    event ChangedIsActive(
      bool isActive
    );

    event SetSeed(
      bytes seed
    );

    constructor (
      string memory _name,
      string memory _symbol,
      bytes memory _seed,
      bytes32 _constants,
      bytes memory _code,
      address _renderer,
      uint256 _mintingSupply,
      uint256 _price,
      uint96 _rendererRoyaltyFraction,
      address _whitelistToken
    ) ERC721A(_name, _symbol) {
      constants = _constants;
      seed = _seed;
      code = _code;
      renderer = IRenderer(_renderer);
      mintingSupply = _mintingSupply;
      price = _price;
      rendererRoyaltyFraction = _rendererRoyaltyFraction;
      whitelistToken = _whitelistToken;
    } 

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setRoyalty(address newReceiver, uint96 newRoyaltyFraction) public onlyOwner {
      _setDefaultRoyalty(newReceiver, newRoyaltyFraction);
    }

    function setIsActive(bool _isActive) public onlyOwner {
      isActive = _isActive; 
      emit ChangedIsActive(isActive);
    }

    function setSeed(bytes calldata _seed) public onlyOwner {
      require(seed.length == 0, "BrainFuck: Seed is already set");
      seed = _seed; 
      emit SetSeed(seed);
    }

    function contractURI() public view returns (string memory) {
      if (customContractURI.length != 0) {
        return string(customContractURI);
      }
      return BrainFuckURIConstructor.contractURI(name(), address(this)); 
    }

    function setCustomContractURI(bytes calldata _customContractURI) public onlyOwner {
      customContractURI = _customContractURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      require(_exists(tokenId), "BrainFuck: URI query for nonexistent token");
      require(seed.length != 0, "BrainFuck: Seed is not set yet");
      return BrainFuckURIConstructor.tokenURI(tokenId, name(), seed, constants, code, renderer);
    }
    
    modifier onlyUnderMaxSupply(uint256 numToMint) {
      require(_currentIndex + numToMint <= mintingSupply, 'exceeded max supply');
      _;
    }

    modifier onlyIsActive() {
      require(isActive, 'minting needs to be active to mint');
      _;
    }

    modifier onlyPublicMintOrWhitelist() {
      require(whitelistToken == address(0) || IERC721(whitelistToken).balanceOf(msg.sender) > 0, 'not whitelisted');
      _;
    }

    function mint(address to, uint256 numMints) onlyIsActive onlyUnderMaxSupply(numMints) onlyPublicMintOrWhitelist() public payable {
      require(numMints <= MAX_MINTING_PER_TX, "exceeded number of mint in single call");
      _mint(to, numMints, '', false);
      uint256 totalPrice = price * numMints;
      require(totalPrice <= msg.value, "insufficient funds to pay for mint");
      if (rendererRoyaltyFraction == 0) {
        owner().call{value: totalPrice }("");
        payable(msg.sender).transfer(msg.value - totalPrice);
      } else {
        uint rendererRoyalty = totalPrice * rendererRoyaltyFraction / 10000; // in bps 
        owner().call{value: totalPrice - rendererRoyalty }("");
        renderer.owner().call{value: rendererRoyalty }(""); 
        payable(msg.sender).transfer(msg.value - totalPrice);
      }
    }

    function airdropMint(address[] memory to, uint256 numMintsEach) onlyOwner onlyUnderMaxSupply(to.length * numMintsEach) public {
      for (uint i = 0; i < to.length; ++i) {
        _mint(to[i], numMintsEach, '', false);
      }
    }

    function currentIndex() public view returns (uint256) {
      return _currentIndex;
    }
}