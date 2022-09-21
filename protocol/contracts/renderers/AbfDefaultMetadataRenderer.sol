// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IRenderer.sol';
import '../libraries/BytesUtils.sol';
import '../libraries/SvgUtils.sol';
import '../libraries/NftMetadataUtils.sol';
import '../libraries/AbsBrainFuckConstants.sol';
import '../AbsBrainFuck.sol';

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

contract AbfDefaultMetadataRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  function owner() public view override(Ownable, IRenderer) returns (address) {
    return super.owner();
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC165, IERC165)
    returns (bool)
  {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function propsSize() external pure override returns (uint256) {
    return 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
  }

  function additionalMetadataURI()
    external
    pure
    override
    returns (string memory)
  {
    return 'ipfs://TODO';
  }

  function renderType() external pure override returns (string memory) {
    return AbsBrainFuckConstants.METADATA_RENDER_TYPE;
  }

  function name() public pure override returns (string memory) {
    return 'ABF Default Metadata';
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    AbsBrainFuck abf = AbsBrainFuck(BytesUtils.toAddress(props, 0));
    uint256 tokenId = BytesUtils.toUint256(props, 20);

    string[] memory metadata = new string[](3);
    metadata[0] = NftMetadataUtils.keyValue(
      'name',
      string(abi.encodePacked(abf.name(), ' #', tokenId.toString()))
    );
    metadata[1] = NftMetadataUtils.keyValue(
      'description',
      string(abf.tokenDescription())
    );
    string[] memory attributes = new string[](1);
    attributes[0] = NftMetadataUtils.getBaseAttributeObject(
      'Renderer',
      uint256(uint160(address(abf.renderer()))).toHexString(),
      ''
    );
    metadata[2] = NftMetadataUtils.keyValue(
      'attributes',
      NftMetadataUtils.array(attributes)
    );
    return bytes(NftMetadataUtils.delimit(metadata));
  }

  function render(bytes calldata props)
    external
    view
    override
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          'data:application/json;base64,',
          Base64.encode(renderRaw(props))
        )
      );
  }
}
