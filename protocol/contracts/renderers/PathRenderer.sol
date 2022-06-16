// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

contract PathRenderer is IRenderer, ERC165 {
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
    string memory content = '';
    uint i = 0;
    while((i * 3 + 2) < out.length) {
      if (out[i * 3] == 0x4C || out[i * 3] == 0x4D || out[i * 3] == 0x6C || out[i * 3] == 0x6D) {
        content = string(abi.encodePacked(content, ' ', out[i * 3], (uint(uint8(out[i * 3 + 1])) + 16).toString(), ' ', (uint(uint8(out[i * 3 + 2])) + 16).toString()));
      }
      i++;
    }
    return string(abi.encodePacked(
      '<svg xmlns="http://www.w3.org/2000/svg" width="288" height="288" style="background:#F1F1F1"><path fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="',
        content,
      '" /> </svg>'
      )
    );
  }

  function render(bytes calldata out) external override pure returns (string memory) {
    return string(
      abi.encodePacked(
        'data:image/svg+xml;base64,',
        Base64.encode(bytes(renderRaw(out))) 
      )
    );
  }

  function attributes(bytes calldata out) external override pure returns (string memory) {
      return string(
            abi.encodePacked(
              '{"trait_type": "Data Length", "value":', (out.length / 3).toString(), '},'
            )
          );
  }
}