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

export function escapeUnicode(str: string) {
  return [...str]
    .map((c) =>
      /^[\x00-\x7F]$/.test(c)
        ? c
        : c
            .split('')
            .map((a) => '\\u' + a.charCodeAt(0).toString(16).padStart(4, '0'))
            .join(''),
    )
    .join('');
}

export function escapeQuotes(str: string) {
  return [...str]
    .map((c) => {
      if (c === '"') {
        return '\\"';
      }
      if (c === `'`) {
        return "\\'";
      }
      return c;
    })
    .join('');
}

export function unicodeToChar(text: string) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

export function escapedQuotesToChar(text: string) {
  return text
    .replace(/\\"/gi, function (match) {
      return '"';
    })
    .replace(/\\'/gi, function (match) {
      return "'";
    });
}

export const convertHexStrToAscii = (hexStr: string) => {
  let asciiStr = '';
  for (let i = 2; i < hexStr.length; i += 2) {
    const byte = hexStr.slice(i, i + 2);
    asciiStr += String.fromCharCode(BigNumber.from('0x' + byte).toNumber());
  }
  return asciiStr;
};

export const convertHexStrToUtf8 = (hexStr: string) => {
  const asciiStr = convertHexStrToAscii(hexStr);
  return escapedQuotesToChar(unicodeToChar(asciiStr));
};

export const convertStrToHexStr = (code: string) => {
  let hexStr = '0x';
  const prunedCode = escapeQuotes(escapeUnicode(code));
  for (const c of prunedCode) {
    hexStr += c.charCodeAt(0).toString(16).padStart(2, '0');
  }
  console.log(hexStr);
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
