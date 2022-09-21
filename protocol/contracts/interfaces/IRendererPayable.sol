// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/introspection/IERC165.sol';

interface IRendererPayable is IERC165 {
  function treasury(bytes calldata props) external view returns (address);

  function createTreasury(bytes calldata props) external returns (address);
}
