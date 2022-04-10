// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./BrainFuckVM.sol";
import "./interfaces/IBFR.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract BrainFuck is ERC721, ReentrancyGuard {
    using Strings for uint256;

    uint public constant MAX_MINTING_SUPPLY = 10000;

    BrainFuckVM public immutable brainFuckVM;
    
    struct GeneratorConfig {
      string name;
      string additionalMetadataURI;
      bytes sourceChaos;
      bytes code; 
      address renderer;
      uint256 mintingSupply;
      uint256 price;
    }

    event CreateGenerator(
      uint indexed id,
      string name,
      string additionalMetadataURI,
      bytes sourceChaos,
      bytes code,
      address renderer,
      uint256 mintingSupply,
      uint256 price
    );

   event GeneratorOwnershipTransferred(
      uint indexed id,
      address previousOwner,
      address newOwner
    );

    mapping(uint256 => GeneratorConfig) public idToGeneratorConfig;
    mapping(uint256 => address) public idToOwner;
    mapping(uint256 => uint256) public idToMintedSupply;
    mapping(uint256 => uint256) public tokenIdToGeneratorId;

    uint256 public generatorIndex = 0;

    constructor (
      string memory _name,
      string memory _symbol,
      address _brainFuckVM
    ) ERC721(_name, _symbol) {
      brainFuckVM = BrainFuckVM(_brainFuckVM);
    } 

    function contractURI() public pure returns (string memory) {
        return '{"name":"Abs Brain Fuck","description":"On-chain generative art written in BrainFuck. Why? Who knows."}';
    }

    function createGenerator(address owner, GeneratorConfig calldata config) public {
      require(config.mintingSupply < MAX_MINTING_SUPPLY, "Exceeds max minting mintingSupply");
      generatorIndex += MAX_MINTING_SUPPLY;
      idToGeneratorConfig[generatorIndex] = config;
      idToOwner[generatorIndex] = owner;
      emit CreateGenerator(
        generatorIndex,
        config.name,
        config.additionalMetadataURI,
        config.sourceChaos,
        config.code,
        config.renderer,
        config.mintingSupply,
        config.price
      );
    }

    function transferGeneratorOwner(uint256 generatorId, address newOwner) public {
      require(idToOwner[generatorId] == msg.sender);
      idToOwner[generatorId] = newOwner;
      emit GeneratorOwnershipTransferred(generatorId, msg.sender, newOwner);
    }

    modifier onlyUnderMaxSupply(uint256 generatorId, uint256 numToMint) {
      require(idToMintedSupply[generatorId] + numToMint <= idToGeneratorConfig[generatorId].mintingSupply, 'exceeded max supply');
      _;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

      uint256 generatorId = (tokenId / MAX_MINTING_SUPPLY) * MAX_MINTING_SUPPLY;
      uint256 tokenIndex = (tokenId % MAX_MINTING_SUPPLY);

      GeneratorConfig memory config = idToGeneratorConfig[generatorId];
      IBFR bfr = IBFR(config.renderer);
      string memory name = string(abi.encodePacked(config.name, " #", tokenIndex.toString()));
      bytes memory out = brainFuckVM.runBrainFuckCode(config.code, abi.encodePacked(keccak256(abi.encodePacked(config.sourceChaos, tokenIndex))), bfr.outSize());
      string memory image = bfr.render(out);

      return string(
            abi.encodePacked(
                'data:application/json;base64,', 
                Base64.encode(
                    abi.encodePacked(
                        '{"name":"',
                        name,
                        '","description": "Absolute Brain Fuck by POB studios. Generative art written in BrainFuck. Good god why is this a thing.", "image": "',
                        image,
                        '", "aspect_ratio":1, "attributes": [', bfr.attributes(out), '{"trait_type":"Artist","value":"', uint256(uint160(idToOwner[generatorId])).toHexString(), '"},', '{"trait_type":"Project","value":"', config.name, '"},','{"trait_type":"Renderer","value":"',
                          bfr.name(),
                        '"}]}'
                    )
                )
            )
        ); 
    }
    
    function mint(uint generatorId, address[] calldata addresses) onlyUnderMaxSupply(generatorId, addresses.length) public payable nonReentrant {
      for (uint i = 0; i < addresses.length; ++i) {
        idToMintedSupply[generatorId]++;
        // mint token
        uint tokenIndex = generatorId + idToMintedSupply[generatorId];
        _safeMint(addresses[i], tokenIndex);
        tokenIdToGeneratorId[tokenIndex] = generatorId;
      }
      uint256 price = idToGeneratorConfig[generatorId].price * addresses.length;
      require(price <= msg.value, "insufficient funds to pay for mint");
      idToOwner[generatorId].call{value: price }("");
      msg.sender.call{value: msg.value - price }("");
    }
}