// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface IVirtualMachine {
  function name() external view returns (string memory);

  function run(bytes calldata code, bytes calldata input)
    external
    view
    returns (bytes memory out);
}
