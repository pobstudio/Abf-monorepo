// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/introspection/IERC165.sol';

interface IRenderer is IERC165 {
  function owner() external view returns (address);
  function outSize() external pure returns (uint256);
  function additionalMetadataURI() external pure returns (string memory);
  function renderAttributeKey() external pure returns (string memory);
  function renderRaw(bytes calldata out) external view returns (string memory);
  function render(bytes calldata out) external view returns (string memory);
  function attributes(bytes calldata out) external view returns (string memory);
}