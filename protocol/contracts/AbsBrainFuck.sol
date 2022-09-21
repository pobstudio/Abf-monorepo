// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import './vms/BrainFuckVM.sol';
import './interfaces/IRenderer.sol';
import './interfaces/IVirtualMachine.sol';
import './libraries/NftMetadataUtils.sol';
import './AbsBrainFuckURIConstructor.sol';
import './tokens/ERC721A.sol';
import './libraries/SSTORE2Map.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract AbsBrainFuck is ERC721A, ERC2981, Ownable {
  using Strings for uint256;

  bytes32 public constant PROPS_PREFIX_KEY = 'PROPS_PREFIX';
  bytes32 public constant PROPS_SUFFIX_KEY = 'PROPS_SUFFIX';

  bytes32 public tokenDescriptionKey;

  IRenderer public renderer;

  IRenderer public metadataRenderer;

  bool public isInit = false;

  uint256 public mintingSupply;

  bytes32 public seed;

  bytes public customContractURI;

  bool public allowRendererSwapping;

  address public adminMinter;

  event SetSeed(bytes32 seed);

  struct CreateAbsBrainFuckConfig {
    string name;
    string symbol;
    bytes32 seed;
    bytes suffix;
    bytes prefix;
    address renderer;
    address metadataRenderer;
    address adminMinter;
    uint256 mintingSupply;
    uint96 royaltyFraction;
    bytes32 tokenDescriptionKey;
    bool allowRendererSwapping;
    bytes tokenDescription;
  }

  constructor() ERC721A() {}

  function init(address owner, CreateAbsBrainFuckConfig memory config) public {
    require(!isInit, 'NFT has already been initialized');
    isInit = true;
    _transferOwnership(owner);
    _name = config.name;
    _symbol = config.symbol;
    seed = config.seed;
    SSTORE2Map.write(PROPS_PREFIX_KEY, config.prefix);
    SSTORE2Map.write(PROPS_SUFFIX_KEY, config.suffix);
    SSTORE2Map.write(config.tokenDescriptionKey, config.tokenDescription);
    tokenDescriptionKey = config.tokenDescriptionKey;
    renderer = IRenderer(config.renderer);
    metadataRenderer = IRenderer(config.metadataRenderer);
    allowRendererSwapping = config.allowRendererSwapping;
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

  function setRenderer(address _renderer) public onlyOwner {
    require(
      allowRendererSwapping,
      'Requires NFT to be configured to allow renderer swapping.'
    );
    renderer = IRenderer(_renderer);
  }

  function setMetadataRenderer(address _metadataRenderer) public onlyOwner {
    require(
      allowRendererSwapping,
      'Requires NFT to be configured to allow renderer swapping.'
    );
    metadataRenderer = IRenderer(_metadataRenderer);
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

  function propsPrefix() public view returns (bytes memory) {
    return SSTORE2Map.read(PROPS_PREFIX_KEY);
  }

  function propsSuffix() public view returns (bytes memory) {
    return SSTORE2Map.read(PROPS_SUFFIX_KEY);
  }

  function tokenDescription() public view returns (bytes memory) {
    return SSTORE2Map.read(tokenDescriptionKey);
  }

  function contractURI() public view returns (string memory) {
    if (customContractURI.length != 0) {
      return string(customContractURI);
    }
    return AbsBrainFuckURIConstructor.contractURI(name(), address(this));
  }

  function setCustomContractURI(bytes calldata _customContractURI)
    public
    onlyOwner
  {
    customContractURI = _customContractURI;
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
      AbsBrainFuckURIConstructor.tokenURI(
        tokenId,
        propsPrefix(),
        propsSuffix(),
        seed,
        renderer,
        metadataRenderer
      );
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
