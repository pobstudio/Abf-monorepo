// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '../../libraries/ERC721ZUtils.sol';
import '../../interfaces/IRenderer.sol';
import '../../libraries/BytesUtils.sol';
import '../../libraries/SSTORE2Map.sol';
import '../../libraries/SvgUtils.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

contract MiddlewareRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  constructor() {}

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
    return ERC721ZUtils.MIDDLEWARE_RENDER_TYPE;
  }

  function name() public pure override returns (string memory) {
    return 'Middleware';
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    uint8 numRenderers = uint8(props[0]);
    address[] memory renderers = new address[](numRenderers);
    for (uint256 i = 0; i < renderers.length; ++i) {
      renderers[i] = BytesUtils.toAddress(props, 1 + 20 * i);
    }

    bytes memory output = props[(1 + renderers.length * 20):];

    for (uint256 i = 0; i < renderers.length; i += 0) {
      if (renderers[i] != address(0)) {
        IRenderer renderer = IRenderer(renderers[i]);
        output = renderer.renderRaw(output);
      }
    }

    return output;
  }

  function render(bytes calldata props)
    external
    view
    override
    returns (string memory)
  {
    uint8 numRenderers = uint8(props[0]);
    address[] memory renderers = new address[](numRenderers);
    for (uint256 i = 0; i < renderers.length; ++i) {
      renderers[i] = BytesUtils.toAddress(props, 1 + 20 * i);
    }

    bytes memory output = props[(1 + renderers.length * 20):];

    for (uint256 i = 0; i < renderers.length; i += 0) {
      if (renderers[i] != address(0)) {
        IRenderer renderer = IRenderer(renderers[i]);
        output = bytes(renderer.render(output));
      }
    }

    return string(output);
  }
}
