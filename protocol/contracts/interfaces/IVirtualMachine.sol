// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface IVirtualMachine {
  function run(bytes calldata constants, bytes calldata input)
    external
    view
    returns (bytes memory out);
}
