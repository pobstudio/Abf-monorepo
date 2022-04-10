// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract BrainFuckVM {
  function runBrainFuckCode(bytes calldata code, bytes calldata input, uint outSize) public pure returns (bytes memory out) {
    out = new bytes(outSize);
    bytes memory tape = new bytes(32);

    uint writeIndex = 0;
    uint readIndex = 0;
    uint ptr = 0;
    bool isLooping = false;
    uint innerLoops = 0;
    // technically a max of 1028 nested loops
    uint[] memory loopingStack = new uint[](1028);
    uint loopingStackIndex = 0;

    for (uint i = 0; i < code.length; ++i) {
      bytes1 opcode = code[i];
      if (isLooping) {
        // [
        if (opcode == 0x5B) {
          innerLoops++; 
        }
        // ]
        if(opcode == 0x5D) {
          if(innerLoops == 0) isLooping = false;
          else innerLoops--;
        }
      } else {
        // +
        if (opcode == 0x2B) {
          tape[ptr] = bytes1(uint8(tape[ptr]) + 1);
        }
        // -
        if (opcode == 0x2D) {
          tape[ptr] = bytes1(uint8(tape[ptr]) - 1);
        }
        // ,
        if (opcode == 0x2C) {
          tape[ptr] = input[readIndex];
          readIndex++;
        }
        // .
        if (opcode == 0x2E) {
          out[writeIndex] = tape[ptr];
          writeIndex++;
        }
        // >
        if (opcode == 0x3E) {
          ptr++;
        }
        // <
        if (opcode == 0x3C) {
          ptr--;
        }
        // [
        if (opcode == 0x5B) {
          if (tape[ptr] == 0x0) {
            isLooping = true;
          } else {
            loopingStack[loopingStackIndex] = i;
            loopingStackIndex++;
          }
        }
        // ]
        if (opcode == 0x5D) {
         if (tape[ptr] != 0x00) {
            i = loopingStack[loopingStackIndex - 1];
          } else {
            loopingStack[loopingStackIndex--] = 0;
          }
        }
      }
    }
  } 
}