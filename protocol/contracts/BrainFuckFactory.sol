// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./BrainFuck.sol";

contract BrainFuckFactory {

    uint constant public VERSION = 1;

    struct CreateBrainFuckNFTConfig {
      string name;
      string symbol;
      bytes seed;
      bytes32 constants;
      bytes code; 
      address renderer;
      uint256 mintingSupply;
      uint256 price;
      uint96 royaltyFraction;
      uint96 rendererRoyaltyFraction;
      address whitelistToken;
    }

    event CreatedBrainFuckNFT(
      address nft,
      address creator
    );

    constructor (
    ) {
    } 

    function createNFT(CreateBrainFuckNFTConfig memory config) public returns (address) {
      BrainFuck nft = new BrainFuck(
        config.name,
        config.symbol,
        config.seed,
        config.constants,
        config.code,
        config.renderer,
        config.mintingSupply,
        config.price,
        config.rendererRoyaltyFraction,
        config.whitelistToken
      );
      nft.setRoyalty(msg.sender, config.royaltyFraction);
      nft.transferOwnership(msg.sender);
      emit CreatedBrainFuckNFT(
       address(nft),
       msg.sender 
      );
      return address(nft);
    }
}