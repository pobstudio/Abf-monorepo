import { createTemplateInsert } from '../constants';
export const DEBUG_LIBRARY = {
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
