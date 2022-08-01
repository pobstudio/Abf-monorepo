// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "../libraries/BytesUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ImageTupleDataMiddlewareRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  function owner() public override(Ownable, IRenderer) view returns (address) {
    return super.owner();
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function propsSize() external override pure returns (uint256) {
    return 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
  }
  function additionalMetadataURI() external override pure returns (string memory) {
    return "ipfs://bafkreihcnkignwx5qk3r5f42wo4zepunq24vtoxkvo3wfpcafoky575p4u";
  }
  
  function renderAttributeKey() external override pure returns (string memory) {
    return "image";
  }
  
  function name() public override pure returns (string memory) {
    return 'Tuple Data Middleware';
  }
  
  function convertProps(bytes calldata props) internal pure returns (bytes memory output) {
    for (uint i = 20; i < props.length; i+=2) {
      bytes memory tupleBytes = new bytes(uint(uint8(props[i])));
      for (uint8 ct = 0; ct < uint8(props[i]); ++ct) {
        tupleBytes[ct] = props[i + 1];
      }
      output = abi.encodePacked(output, tupleBytes);
    }
  }

  function renderRaw(bytes calldata props) public override view returns (bytes memory) {
    IRenderer destinationRenderer = IRenderer(BytesUtils.toAddress(props, 0));
    return destinationRenderer.renderRaw(convertProps(props));
  }

  function render(bytes calldata props) external override view returns (string memory) {
    IRenderer destinationRenderer = IRenderer(BytesUtils.toAddress(props, 0));
    return destinationRenderer.render(convertProps(props));
  }

  function attributes(bytes calldata props) external override view returns (string memory) {
    IRenderer destinationRenderer = IRenderer(BytesUtils.toAddress(props, 0));
    return destinationRenderer.attributes(convertProps(props));
  }
}