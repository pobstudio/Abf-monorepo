// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./BrainFuckVM.sol";
import "./BrainFuckURIConstructor.sol";
import "./interfaces/IRenderer.sol";
import "./tokens/ERC721A.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract BrainFuck is ERC721A, ERC2981, Ownable, ReentrancyGuard {
    using Strings for uint256;

    uint public constant MAX_MINTING_PER_TX = 6;

    IRenderer public immutable renderer;

    uint256 public immutable mintingSupply;
    uint256 public immutable price;

    string public additionalMetadataURI;
    bytes public seed;
    bytes public code;
    bytes8 public constants;
    bool public isActive = false;
    
    uint256 public constant VERSION = 1;
    
    constructor (
      string memory _name,
      string memory _symbol,
      string memory _additionalMetadataURI,
      bytes memory _seed,
      bytes8 _constants,
      bytes memory _code,
      address _renderer,
      uint256 _mintingSupply,
      uint256 _price
    ) ERC721A(_name, _symbol) {
      constants = _constants;
      additionalMetadataURI = _additionalMetadataURI;
      seed = _seed;
      code = _code;
      renderer = IRenderer(_renderer);
      mintingSupply = _mintingSupply;
      price = _price;
    } 

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721A, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setRoyalty(address newReceiver, uint96 newRoyaltyFraction) public onlyOwner {
      _setDefaultRoyalty(newReceiver, newRoyaltyFraction);
    }

    function setIsActive(bool _isActive) public onlyOwner {
      isActive = _isActive; 
    }

    function setSeed(bytes calldata _seed) public onlyOwner {
      require(seed.length == 0, "BrainFuck: Seed is already set");
      seed = _seed; 
    }

    function contractURI() public view returns (string memory) {
      return BrainFuckURIConstructor.contractURI(name(), address(this)); 
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

    function mint(address to, uint256 numMints) onlyIsActive onlyUnderMaxSupply(numMints) public payable nonReentrant {
      require(numMints <= MAX_MINTING_PER_TX, "exceeded number of mint in single call");
      _mint(to, numMints, '', false);
      uint256 totalPrice = price * numMints;
      require(totalPrice <= msg.value, "insufficient funds to pay for mint");
      owner().call{value: totalPrice }("");
      msg.sender.call{value: msg.value - totalPrice }("");
    }

    function airdropMint(address[] memory to, uint256 numMintsEach) onlyOwner onlyUnderMaxSupply(to.length * numMintsEach) public {
      for (uint i = 0; i < to.length; ++i) {
        _mint(to[i], numMintsEach, '', false);
      }
    }
}