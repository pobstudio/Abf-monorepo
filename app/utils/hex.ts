import { BigNumber, BigNumberish } from 'ethers';
import { MAX_UINT } from '../constants';

export function shortenHexString(str: string, chars = 4): string {
  return `${str.substring(0, chars + 2)}...${str.substring(
    str.length - chars,
  )}`;
}

export function padHexString(str: string, length = 64): string {
  return `0x${str.slice(2).padStart(length, '0')}`;
}

export const convertStrToHexStr = (code: string) => {
  let hexStr = '0x';
  for (const c of code) {
    hexStr += c.charCodeAt(0).toString(16);
  }
  if (hexStr.length <= 2) {
    hexStr += '00';
  }
  return hexStr;
};

export const prettifyCountableNumber = (number: BigNumberish) => {
  if (MAX_UINT.eq(number)) {
    return '∞';
  }
  return BigNumber.from(number).toString();
};

export const getHexStringNumBytes = (hexStr: string) =>
  hexStr.slice(2).length / 2;
