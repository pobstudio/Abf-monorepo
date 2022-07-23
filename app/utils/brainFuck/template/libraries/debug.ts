import { transpileTemplatedBf } from '..';
import { createTemplateInsert } from '../constants';
import { NUMBERS_LIBRARY } from './numbers';
export const DEBUG_LIBRARY = {
  logValue: (hexString: any) => {
    if (typeof hexString !== 'string') {
      return undefined;
    }
    const prunedHexString = hexString.startsWith('0x')
      ? hexString.slice(2)
      : hexString;
    if (prunedHexString.length % 2 !== 0) {
      return undefined;
    }
    let bfCode = '';
    for (let i = 0; i < prunedHexString.length; i += 2) {
      const value = parseInt(prunedHexString.slice(i, i + 2), 16);
      if (bfCode.length === 0) {
        bfCode += `${createTemplateInsert(value.toString())}.`;
      } else {
        const prevValue = parseInt(prunedHexString.slice(i - 2, i), 16);
        const delta = value - prevValue;
        const deltaCode = `${(delta > 0 ? '+' : '-').repeat(Math.abs(delta))}`;
        const inputCode = transpileTemplatedBf(
          createTemplateInsert(value.toString()),
          [NUMBERS_LIBRARY],
        );

        bfCode += `${
          deltaCode.length > inputCode.length ? inputCode : deltaCode
        }.`;
      }
    }
    return bfCode + createTemplateInsert('0');
  },
  log: (startIndex: any, endIndex: any) => {
    const safeStartIndex = parseInt(startIndex);
    const safeEndIndex = parseInt(endIndex);

    if (isNaN(safeStartIndex) || isNaN(safeEndIndex)) {
      return undefined;
    }
    if (safeEndIndex < safeStartIndex) {
      return undefined;
    }
    return `!${createTemplateInsert('jump', [startIndex])}.${'>.'.repeat(
      safeEndIndex - safeStartIndex,
    )}`;
  },
};
