// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./BrainFuck.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./BrainFuckVM.sol";

contract BrainFuckFactory is ReentrancyGuard {

    mapping(uint => address) public projectIdToAddress;
    mapping(address => uint) public addressToProjectId;

    uint public projectIdIndex = 0;

    struct CreateBrainFuckNFTConfig {
      string name;
      string symbol;
      string additionalMetadataURI;
      bytes seed;
      bytes8 constants;
      bytes code; 
      address renderer;
      uint256 mintingSupply;
      uint256 price;
      uint96 royaltyFraction;
      bool isActive;
    }

    event CreatedBrainFuckNFT(
      address nft,
      address creator
    );

    constructor (
    ) {
    } 

    function createNFT(CreateBrainFuckNFTConfig memory config) public {
      BrainFuck nft = new BrainFuck(
        config.name,
        config.symbol,
        config.additionalMetadataURI,
        config.seed,
        config.constants,
        config.code,
        config.renderer,
        config.mintingSupply,
        config.price
      );
      nft.setRoyalty(msg.sender, config.royaltyFraction);
      nft.setIsActive(config.isActive);
      nft.transferOwnership(msg.sender);
      projectIdIndex++;
      projectIdToAddress[projectIdIndex] = address(nft);
      addressToProjectId[address(nft)] = projectIdIndex;
      emit CreatedBrainFuckNFT(
       address(nft),
       msg.sender 
      );
    }
}