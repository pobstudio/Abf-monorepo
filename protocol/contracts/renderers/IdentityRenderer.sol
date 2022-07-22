// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract IdentityRenderer is IRenderer, Ownable, ERC165 {
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
    return "ipfs://bafkreicxqdlbjlnrjqvcxvlz5x2swhrp5hahxvelvs2i4qxvn7hxqdtwga";
  }
  
  function renderAttributeKey() external override pure returns (string memory) {
    return "image";
  }
  
  function name() public override pure returns (string memory) {
    return 'Identity';
  }
  
  function renderRaw(bytes calldata props) public override pure returns (bytes memory) {
    bytes memory output = "";
    uint i = 0;
    while(i < props.length) {
      output = abi.encodePacked(output, props[i]);      
      i++;
    }
    return output;
  }

  function render(bytes calldata props) external override pure returns (string memory) {
    return string(renderRaw(props));
  }

  function attributes(bytes calldata props) external override pure returns (string memory) {
    return string(
            abi.encodePacked(
              '{"trait_type": "Data Length", "value":', props.length.toString(), '}'
            )
          );
  }
}