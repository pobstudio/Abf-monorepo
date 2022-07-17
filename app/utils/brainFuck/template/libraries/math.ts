import { createTemplateInsert } from '../constants';

// TODO
export const MATH_LIBRARY = {
  add: (val: any) => {
    if (val === undefined) {
      return `<${createTemplateInsert('copy', [2, 3])}<${createTemplateInsert(
        'copy',
        [2, 3],
      )}[<+>-]<`;
    }
    const safeVal = parseInt(val);
    if (isNaN(safeVal)) {
      return undefined;
    }
    return `${createTemplateInsert('copy')}${'+'.repeat(safeVal)}`;
  },
  sub: (val: any) => {
    if (val === undefined) {
      return `<${createTemplateInsert('copy', [2, 3])}<${createTemplateInsert(
        'copy',
        [2, 3],
      )}[<->-]<`;
    }
    const safeVal = parseInt(val);
    if (isNaN(safeVal)) {
      return undefined;
    }
    return `${createTemplateInsert('copy')}${'-'.repeat(safeVal)}`;
  },
};
