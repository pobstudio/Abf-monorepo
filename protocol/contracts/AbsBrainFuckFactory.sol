// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import './tokens/ERC721Z.sol';
import './ERC721ZMinter.sol';
import './renderers/AbsBrainFuckMetadataRenderer.sol';
import '@openzeppelin/contracts/proxy/Clones.sol';

contract AbsBrainFuckFactory {
  address public immutable erc721ZImplementation;
  address public immutable erc721ZMinterImplementation;
  AbsBrainFuckMetadataRenderer public immutable absBrainFuckMetadataRenderer;

  event CreatedNFT(address nft, address minter, address creator);

  struct CreateNFTAdditionalConfig {
    uint96 royaltyFraction;
  }

  constructor(
    address _erc721ZImplementation,
    address _erc721ZMinterImplementation,
    address _absBrainFuckMetadataRenderer
  ) {
    absBrainFuckMetadataRenderer = AbsBrainFuckMetadataRenderer(
      _absBrainFuckMetadataRenderer
    );
    erc721ZImplementation = _erc721ZImplementation;
    erc721ZMinterImplementation = _erc721ZMinterImplementation;
  }

  function createNFT(
    ERC721Z.InitConfig memory config,
    AbsBrainFuckMetadataRenderer.AbsBrainFuckMetadataConfig
      memory metadataConfig,
    CreateNFTAdditionalConfig memory additionalConfig,
    ERC721ZMinter.InitConfig memory minterConfig
  ) public returns (address, address) {
    // requires the use of the ABF renderer
    config.metadataRenderer = address(absBrainFuckMetadataRenderer);

    ERC721Z nft = ERC721Z(Clones.clone(erc721ZImplementation));
    nft.init(address(this), config);
    nft.setRoyalty(msg.sender, additionalConfig.royaltyFraction);
    ERC721ZMinter minter = ERC721ZMinter(
      Clones.clone(erc721ZMinterImplementation)
    );
    minter.init(msg.sender, address(nft), minterConfig);
    nft.setAdminMinter(address(minter));
    absBrainFuckMetadataRenderer.addMetadataConfig(
      address(nft),
      metadataConfig
    );
    nft.transferOwnership(msg.sender);

    emit CreatedNFT(address(nft), address(minter), msg.sender);

    return (address(nft), address(minter));
  }
}
