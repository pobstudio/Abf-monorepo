// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import './AbsBrainFuck.sol';
import './AbsBrainFuckMinter.sol';
import '@openzeppelin/contracts/proxy/Clones.sol';

contract AbsBrainFuckFactory {
  address public immutable abfImplementation;
  address public immutable abfMinterImplementation;

  event CreatedAbsBrainFuckNFT(address nft, address minter, address creator);

  constructor(address _abfImplementation, address _abfMinterImplementation) {
    abfImplementation = _abfImplementation;
    abfMinterImplementation = _abfMinterImplementation;
  }

  function createNFT(
    AbsBrainFuck.CreateAbsBrainFuckConfig memory config,
    AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfig memory minterConfig
  ) public returns (address, address) {
    AbsBrainFuck nft = AbsBrainFuck(Clones.clone(abfImplementation));
    nft.init(address(this), config);
    nft.setRoyalty(msg.sender, config.royaltyFraction);
    AbsBrainFuckMinter minter = AbsBrainFuckMinter(
      Clones.clone(abfMinterImplementation)
    );
    minter.init(msg.sender, address(nft), minterConfig);
    nft.setAdminMinter(address(minter));
    nft.transferOwnership(msg.sender);

    emit CreatedAbsBrainFuckNFT(address(nft), address(minter), msg.sender);

    return (address(nft), address(minter));
  }
}
