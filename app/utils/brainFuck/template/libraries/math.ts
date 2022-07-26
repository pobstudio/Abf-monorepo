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
  absSub: (...params: any[]) => {
    return `${createTemplateInsert('sub', params)}${createTemplateInsert('if', [
      'lessThan',
    ])}${createTemplateInsert('255')}[<<->>-]${createTemplateInsert('ifEnd')}`;
  },
  sub: (val: any) => {
    if (val === undefined) {
      return `<${createTemplateInsert('copy', [3, 2])}<<${createTemplateInsert(
        'copy',
        [1, 3],
      )}>[<->-]<`;
    }
    const safeVal = parseInt(val);
    if (isNaN(safeVal)) {
      return undefined;
    }
    return `${createTemplateInsert('copy')}${'-'.repeat(safeVal)}`;
  },
  flippedSub: (val: any) => {
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
    return `${createTemplateInsert('copy', [2])}<${createTemplateInsert(
      val,
    )}>[<->-]<`;
  },
  mul: (val: any) => {},
};
