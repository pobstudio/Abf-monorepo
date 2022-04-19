// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IBFR.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract DotMatrixBFR is IBFR {
  using Strings for uint256;

  function name() external override pure returns (string memory) {
    return "DOT MATRIX";
  }
  
  function outSize() external override pure returns (uint256) {
    return 256;
  }
  
  function additionalMetadataURI() external override pure returns (string memory) {
    return "";
  }

  function renderRaw(bytes calldata out) public override pure returns (string memory) {
    return string(abi.encodePacked(
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" style="background:#F1F1F1">',

      '</svg>'
      )
    );
  }

  function render(bytes calldata out) external override pure returns (string memory) {
    return string(
      abi.encodePacked(
        'data:application/json;base64,',
        Base64.encode(bytes(renderRaw(out))) 
      )
    );
  }

  function attributes(bytes calldata out) external override pure returns (string memory) {
    uint i = 0;
    while(out[i] != 0x00) {
      i++;
    }
      return string(
            abi.encodePacked(
              '{"trait_type": "Data Length", "value":', i.toString(), '},'
            )
          );
  }
}