// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IRenderer.sol';
import '../libraries/BytesUtils.sol';
import '../libraries/SvgUtils.sol';
import '../libraries/AbsBrainFuckConstants.sol';

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

contract AlphaFilterRenderer is IRenderer, Ownable, ERC165 {
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
    return 'ipfs://bafkreibkwsc26duxjv7g5qmc55immby3zzme6cua7lzr3nccthfhteyc3u';
  }

  function renderType() external pure override returns (string memory) {
    return AbsBrainFuckConstants.IMAGE_RENDER_TYPE;
  }

  function name() public pure override returns (string memory) {
    return 'Alpha Filter';
  }

  function convertProps(bytes calldata props)
    public
    pure
    returns (bytes memory output)
  {
    output = props[21:props.length];
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    uint256 alpha = SvgUtils.lerpWithDecimals(0, 1, props[0]);

    IRenderer destinationRenderer = IRenderer(BytesUtils.toAddress(props, 1));
    return
      abi.encodePacked(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" style="opacity:',
        SvgUtils.toDecimalString(alpha),
        ';background-image:url(',
        destinationRenderer.render(convertProps(props)),
        ');background-repeat:no-repeat;background-size:contain;background-position:center;image-rendering:-webkit-optimize-contrast;-ms-interpolation-mode:nearest-neighbor;image-rendering:-moz-crisp-edges;image-rendering:pixelated;">',
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
          'data:image/svg+xml;base64,',
          Base64.encode(renderRaw(props))
        )
      );
  }
}
