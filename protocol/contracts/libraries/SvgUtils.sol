// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Strings.sol";

library SvgUtils {
  using Strings for uint256;

  uint public constant DECIMALS = 4;
  uint public constant ONE_UNIT = 10 ** DECIMALS;

  function padZeros(string memory s, uint len) public pure returns (string memory) {
    uint local_len = bytes(s).length;
    string memory local_s = s;
    while(local_len < len) {
      local_s = string(abi.encodePacked('0', local_s));
      local_len++;
    }
    return local_s;
  }

  function wholeNumber(uint n) public pure returns (uint) {
    return n / ONE_UNIT;
  }

  function decimals(uint n) public pure returns (uint) {
    return n % ONE_UNIT;
  }

  function toDecimalString(uint n) public pure returns (string memory s) {
    if (n == 0) return '0';

    s = string(abi.encodePacked(
      (n / (ONE_UNIT)).toString(), '.' , padZeros((n % ONE_UNIT).toString(), DECIMALS)
    ));
  }

  function lerpWithDecimals(uint min, uint max, bytes1 scale) public pure returns (uint) {
    if (scale == 0x0) return min * ONE_UNIT;
    if (scale == 0xff) return max * ONE_UNIT;
    uint delta = ((max - min) * ONE_UNIT * uint(uint8(scale))) / 256; 
    return (min * ONE_UNIT) + delta;
  }
}