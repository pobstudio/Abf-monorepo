// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IRenderer.sol';
import '../libraries/BytesUtils.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/AbsBrainFuckConstants.sol';

contract CompactMiddlewareRenderer is IRenderer, Ownable, ERC165 {
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
    return 'ipfs://bafkreifio7i4ixmw4dpvhn3xpvinmgne4hgyuze53aa3hss3padz3qawui';
  }

  function renderType() external pure override returns (string memory) {
    return AbsBrainFuckConstants.MIDDLEWARE_RENDER_TYPE;
  }

  function name() public pure override returns (string memory) {
    return 'Compact Data Middleware';
  }

  function convertProps(bytes calldata props)
    public
    pure
    returns (bytes memory output)
  {
    uint8 numBytesPrefix = uint8(props[20]);
    uint16 totalSize = BytesUtils.toUint16(props, 21);
    uint16 skipValues = BytesUtils.toUint16(props, 23);

    // TODO build color table array

    output = new bytes(totalSize);

    uint256 idx = 25;
    for (uint256 i = 0; i < numBytesPrefix; ++i) {
      output[i] = props[idx + i];
    }
    idx += numBytesPrefix;
    uint256 acc = skipValues + numBytesPrefix;
    while (idx < props.length) {
      uint8 qt = uint8(props[idx]);
      bytes1 val = props[idx + 1];
      if (val != 0) {
        for (uint8 ct = 0; ct < qt; ct++) {
          output[acc + ct] = val;
        }
      }
      acc += uint256(qt);
      idx += 2;
    }
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    IRenderer destinationRenderer = IRenderer(BytesUtils.toAddress(props, 0));
    return destinationRenderer.renderRaw(convertProps(props));
  }

  function render(bytes calldata props)
    external
    view
    override
    returns (string memory)
  {
    IRenderer destinationRenderer = IRenderer(BytesUtils.toAddress(props, 0));
    return destinationRenderer.render(convertProps(props));
  }
}
