// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import './ERC721A.sol';
import '../vms/BrainFuckVM.sol';
import '../interfaces/IRenderer.sol';
import '../interfaces/IVirtualMachine.sol';
import '../libraries/ERC721ZUtils.sol';
import '../libraries/SSTORE2Map.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract ERC721Z is ERC721A, ERC2981, Ownable {
  using Strings for uint256;

  bytes32 public constant CONTRACT_PROPS_PREFIX_KEY = 'CONTRACT_PROPS_PREFIX';
  bytes32 public constant CONTRACT_PROPS_SUFFIX_KEY = 'CONTRACT_PROPS_SUFFIX';
  bytes32 public constant METADATA_PROPS_PREFIX_KEY = 'METADATA_PROPS_PREFIX';
  bytes32 public constant METADATA_PROPS_SUFFIX_KEY = 'METADATA_PROPS_SUFFIX';

  bytes32 public tokenDescriptionKey;

  IRenderer public contractMetadataRenderer;
  IRenderer public metadataRenderer;

  bool public isInit = false;

  uint256 public mintingSupply;

  bytes32 public seed;

  bytes public customContractURI;

  bool public allowRendererSwapping;

  address public adminMinter;

  event SetSeed(bytes32 seed);

  struct InitConfig {
    string name;
    string symbol;
    bytes32 seed;
    address contractMetadataRenderer;
    address metadataRenderer;
    bool allowRendererSwapping;
    address adminMinter;
    uint256 mintingSupply;
  }

  constructor() ERC721A() {}

  function init(address owner, InitConfig memory config) public {
    require(!isInit, 'NFT has already been initialized');

    isInit = true;

    _transferOwnership(owner);

    _name = config.name;
    _symbol = config.symbol;

    seed = config.seed;

    // renderers
    metadataRenderer = IRenderer(config.metadataRenderer);
    contractMetadataRenderer = IRenderer(config.contractMetadataRenderer);

    // configs
    allowRendererSwapping = config.allowRendererSwapping;

    // minting related params
    mintingSupply = config.mintingSupply;
    adminMinter = config.adminMinter;
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721A, ERC2981)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function setMetadataRenderer(address _metadataRenderer) public onlyOwner {
    require(
      allowRendererSwapping,
      'Requires NFT to be configured to allow renderer swapping.'
    );
    metadataRenderer = IRenderer(_metadataRenderer);
  }

  function setContractMetadataRenderer(address _contractMetadataRenderer)
    public
    onlyOwner
  {
    require(
      allowRendererSwapping,
      'Requires NFT to be configured to allow renderer swapping.'
    );
    contractMetadataRenderer = IRenderer(_contractMetadataRenderer);
  }

  function setAdminMinter(address _adminMinter) public onlyOwner {
    adminMinter = _adminMinter;
  }

  function setRoyalty(address newReceiver, uint96 newRoyaltyFraction)
    public
    onlyOwner
  {
    _setDefaultRoyalty(newReceiver, newRoyaltyFraction);
  }

  function setSeed(bytes32 _seed) public onlyOwner {
    seed = _seed;
    emit SetSeed(seed);
  }

  function contractURI() public view returns (string memory) {
    if (address(contractMetadataRenderer) == address(0)) {
      return '{}';
    }
    return contractMetadataRenderer.render(abi.encodePacked(address(this)));
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(_exists(tokenId), 'BrainFuck: URI query for nonexistent token');
    require(seed.length != 0, 'BrainFuck: Seed is not set yet');

    return
      metadataRenderer.render(abi.encodePacked(address(this), tokenId, seed));
  }

  function adminMint(address to, uint256 numToMint) public {
    require(msg.sender == adminMinter, 'Only admin minter can mint');
    require(_currentIndex + numToMint <= mintingSupply, 'exceeded max supply');
    _mint(to, numToMint, '', false);
  }

  function currentIndex() public view returns (uint256) {
    return _currentIndex;
  }
}
