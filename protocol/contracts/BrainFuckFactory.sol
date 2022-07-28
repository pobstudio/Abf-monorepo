// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./BrainFuck.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract BrainFuckFactory {

    address public immutable implementation;
    
    event CreatedBrainFuckNFT(
      address nft,
      address creator
    );

    constructor (
      address _implementation
    ) {
      implementation = _implementation;
    } 

    function createNFT(BrainFuck.CreateBrainFuckNFTConfig memory config) public returns (address) {
      BrainFuck nft = BrainFuck(Clones.clone(implementation));
      nft.init(address(this), config);
      nft.setRoyalty(msg.sender, config.royaltyFraction);
      nft.transferOwnership(msg.sender);
      emit CreatedBrainFuckNFT(
       address(nft),
       msg.sender 
      );
      return address(nft);
    }
}