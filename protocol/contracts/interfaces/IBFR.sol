// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface IBFR {
  function name() external view returns (string memory);
  function outSize() external view returns (uint256);
  function additionalMetadataURI() external view returns (string memory);
  function render(bytes calldata out) external view returns (string memory);
  function attributes(bytes calldata out) external view returns (string memory);
}