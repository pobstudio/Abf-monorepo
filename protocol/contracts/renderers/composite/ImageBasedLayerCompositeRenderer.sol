// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../../interfaces/IRenderer.sol';
import '../../libraries/BytesUtils.sol';
import '../../libraries/SvgUtils.sol';
import '../../libraries/ERC721ZUtils.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

contract ImageBasedLayerCompositeRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  uint256 public WIDTH_INDEX = 0;
  uint256 public HEIGHT_INDEX = 1;

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
    return 'ipfs://bafkreigjwztwrolwcbkbz3ombzkvxg2767bckeobrfwdjfohvxgozbepv4';
  }

  function renderType() external pure override returns (string memory) {
    return ERC721ZUtils.IMAGE_KEY;
  }

  function name() public pure override returns (string memory) {
    return 'ImageBasedLayerComposite';
  }

  function encodeProps(address[] memory renderers, bytes[] memory rendererProps)
    public
    pure
    returns (bytes memory output)
  {
    for (uint256 i = 0; i < renderers.length; ++i) {
      if (renderers[i] != address(0)) {
        output = abi.encodePacked(
          output,
          renderers[i],
          rendererProps[i].length,
          rendererProps[i]
        );
      }
    }
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    bytes memory images;

    for (uint256 i = 0; i < props.length; i += 0) {
      IRenderer destinationRenderer = IRenderer(BytesUtils.toAddress(props, i));
      uint256 start = i + 20 + 32;
      uint256 end = start + BytesUtils.toUint256(props, i + 20);
      images = abi.encodePacked(
        images,
        '<image width="1200" height="1200" href="',
        destinationRenderer.render(props[start:end]),
        '"/>'
      );
      i = end;
    }

    return
      abi.encodePacked(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">',
        '<style> image { image-rendering:-webkit-optimize-contrast;-ms-interpolation-mode:nearest-neighbor;image-rendering:-moz-crisp-edges;image-rendering:pixelated; }</style>',
        images,
        '</svg>'
      );
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
          ERC721ZUtils.SVG_DATA_BASE_64_PREFIX,
          Base64.encode(renderRaw(props))
        )
      );
  }
}
