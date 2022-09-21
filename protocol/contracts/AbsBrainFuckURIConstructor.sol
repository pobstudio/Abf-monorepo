// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import './libraries/AbsBrainFuckConstants.sol';
import './libraries/NftMetadataUtils.sol';
import './interfaces/IRenderer.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

library AbsBrainFuckURIConstructor {
  using Strings for uint256;

  function contractURI(string memory name, address nft)
    public
    pure
    returns (string memory)
  {
    string[] memory content = new string[](4);
    content[0] = NftMetadataUtils.keyValue(
      'name',
      NftMetadataUtils.stringWrap(name)
    );
    content[1] = NftMetadataUtils.keyValue(
      'description',
      AbsBrainFuckConstants.DEFAULT_CONTRACT_DESCRIPTION
    );
    content[2] = NftMetadataUtils.keyValue(
      'external_link',
      string(
        abi.encodePacked(
          '"https://abf.dev/nft/',
          uint256(uint160(nft)).toHexString(),
          '"'
        )
      )
    );
    content[3] = NftMetadataUtils.keyValue(
      'image',
      AbsBrainFuckConstants.DEFAULT_CONTRACT_IMAGE
    );

    return NftMetadataUtils.encodeJson(NftMetadataUtils.object(content));
  }

  function tokenURI(
    uint256 tokenId,
    bytes memory propsPrefix,
    bytes memory propsSuffix,
    bytes32 seed,
    IRenderer renderer,
    IRenderer metadataRenderer
  ) public view returns (string memory) {
    bytes memory props = abi.encodePacked(
      propsPrefix,
      abi.encodePacked(address(this), tokenId, seed),
      propsSuffix
    );

    string memory renderedOutput = renderer.render(props);

    string[] memory content = new string[](3);
    content[0] = NftMetadataUtils.keyValue(
      renderer.renderType(),
      NftMetadataUtils.stringWrap(renderedOutput)
    );
    content[1] = '"aspect_ratio":1';
    content[2] = string(metadataRenderer.renderRaw(props));

    return NftMetadataUtils.encodeJson(NftMetadataUtils.object(content));
  }

  function decodeProps(bytes memory props)
    public
    pure
    returns (
      address nft,
      uint256 tokenId,
      bytes32 seed
    )
  {
    nft = BytesUtils.toAddress(props, 0);
    tokenId = BytesUtils.toUint256(props, 20);
    seed = bytes32(BytesUtils.toUint256(props, 20 + 32));
  }
}
