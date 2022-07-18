import { createTemplateInsert } from '../constants';
export const CONSTANTS_LIBRARY = {
  constants: (hexString: any) => {
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
      bfCode += `${createTemplateInsert(value.toString())}>`;
    }
    return bfCode;
  },
};
