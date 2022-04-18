// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./BrainFuckVM.sol";
import "./BrainFuckURIConstructor.sol";
import "./interfaces/IBFR.sol";
import "./tokens/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract BrainFuck is ERC721A, Ownable, ReentrancyGuard {
    using Strings for uint256;

    IBFR public immutable renderer;

    uint256 public immutable mintingSupply;
    uint256 public immutable price;

    string public additionalMetadataURI;
    bytes public seed;
    bytes public code;

    constructor (
      string memory _name,
      string memory _symbol,
      string memory _additionalMetadataURI,
      bytes memory _seed,
      bytes memory _code,
      address _renderer,
      uint256 _mintingSupply,
      uint256 _price 
    ) ERC721A(_name, _symbol) {
      additionalMetadataURI = _additionalMetadataURI;
      seed = _seed;
      code = _code;
      renderer = IBFR(_renderer);
      mintingSupply = _mintingSupply;
      price = _price;
    } 

    function contractURI() public view returns (string memory) {
      return BrainFuckURIConstructor.contractURI(name(), address(this)); 
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
      return BrainFuckURIConstructor.tokenURI(tokenId, name(), seed, code, renderer);
    }
    
    modifier onlyUnderMaxSupply(uint256 numToMint) {
      require(_currentIndex + numToMint <= mintingSupply, 'exceeded max supply');
      _;
    }

    function mint(address to, uint256 numMints) onlyUnderMaxSupply(numMints) public payable nonReentrant {
      _safeMint(to, numMints);
      uint256 totalPrice = price * numMints;
      require(totalPrice <= msg.value, "insufficient funds to pay for mint");
      owner().call{value: totalPrice }("");
      msg.sender.call{value: msg.value - totalPrice }("");
    }
}