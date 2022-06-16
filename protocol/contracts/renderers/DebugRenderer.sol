// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

contract DebugRenderer is IRenderer, ERC165 {
  using Strings for uint256;

  address public override owner; 

  constructor() {
    owner = msg.sender;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function outSize() external override pure returns (uint256) {
    return 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
  }
  function additionalMetadataURI() external override pure returns (string memory) {
    return "";
  }
  
  function renderAttributeKey() external override pure returns (string memory) {
    return "image";
  }

  function renderRaw(bytes calldata out) public override pure returns (string memory) {
    string memory output = "";
    uint i = 0;
    while(i < out.length) {
      output = string(abi.encodePacked(output, out[i]));      
      i++;
    }
    return output;
  }

  function render(bytes calldata out) external override pure returns (string memory) {
    return renderRaw(out);
  }

  function attributes(bytes calldata out) external override pure returns (string memory) {
    return string(
            abi.encodePacked(
              '{"trait_type": "Data Length", "value":', out.length.toString(), '},'
            )
          );
  }
}