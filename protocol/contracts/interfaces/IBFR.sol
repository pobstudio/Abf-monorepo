// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface IBFR {
  function name() external pure returns (string memory);
  function outSize() external pure returns (uint256);
  function additionalMetadataURI() external pure returns (string memory);
  function renderRaw(bytes calldata out) external pure returns (string memory);
  function render(bytes calldata out) external pure returns (string memory);
  function attributes(bytes calldata out) external pure returns (string memory);
}