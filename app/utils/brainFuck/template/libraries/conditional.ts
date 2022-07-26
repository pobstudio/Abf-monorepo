import { BfTemplateInsertLibrary } from '../../../../types/bf';
import { createTemplateInsert } from '../constants';

export const CONDITIONAL_LIBRARY: BfTemplateInsertLibrary = {
  'true': () => createTemplateInsert('1'),
  'false': () => createTemplateInsert('0'),
  '==': (...params: any[]) => createTemplateInsert('eq', params),
  'eq': (val: any) => {
    let prefix: string | undefined | null = undefined;
    if (val === undefined) {
      prefix = createTemplateInsert('sub');
    } else {
      const safeVal = parseInt(val);
      if (isNaN(safeVal) || safeVal < 0 || safeVal > 255) {
        prefix = null;
      } else {
        prefix = `${createTemplateInsert('copy')}${'-'.repeat(safeVal)}`;
      }
    }
    if (!prefix) {
      return undefined;
    }
    return `${prefix}>${createTemplateInsert('true')}<[>[-]<-]>[<+>-]<`;
  },
  'lessThan': (val: any) => {
    let prefix: string | undefined | null = undefined;
    if (val === undefined) {
      prefix = `<${createTemplateInsert('copy', [2, 3])}<${createTemplateInsert(
        'copy',
        [2, 3],
      )}`;
    } else {
      const safeVal = parseInt(val);
      if (isNaN(safeVal) || safeVal < 0 || safeVal > 255) {
        prefix = null;
      } else {
        prefix = `${createTemplateInsert('copy')}>${createTemplateInsert(
          safeVal.toString(),
        )}`;
      }
    }
    if (!prefix) {
      return undefined;
    }
    return `${prefix}<[>${createTemplateInsert('if', [
      '!=',
      '0',
    ])}<<->>${createTemplateInsert('ifEnd')}<-]>${createTemplateInsert(
      'boolify',
    )}${createTemplateInsert('move', ['-1'])}`;
  },
  'greaterThan': (val: any) => {
    // console.log(val);
    let prefix: string | undefined | null = undefined;
    if (val === undefined) {
      prefix = `<${createTemplateInsert(
        'copy',
        [3, 2],
      )}<<${createTemplateInsert('copy', [1, 4])}`;
    } else {
      const safeVal = parseInt(val);
      if (isNaN(safeVal) || safeVal < 0 || safeVal > 255) {
        prefix = null;
      } else {
        prefix = `${createTemplateInsert('copy', [2])}<${createTemplateInsert(
          safeVal.toString(),
        )}`;
      }
    }
    if (!prefix) {
      return undefined;
    }
    return `${prefix}[>${createTemplateInsert('if', [
      '!=',
      '0',
    ])}<<->>${createTemplateInsert('ifEnd')}<-]>${createTemplateInsert(
      'boolify',
    )}${createTemplateInsert('move', ['-1'])}`;
  },
  'greaterThanOrEq': (...params: any[]) => {
    return `${createTemplateInsert('lessThan', params)}${createTemplateInsert(
      'flip',
    )}`;
  },
  'lessThanOrEq': (...params: any[]) => {
    return `${createTemplateInsert(
      'greaterThan',
      params,
    )}${createTemplateInsert('flip')}`;
  },
  '!=': (...params: any[]) => createTemplateInsert('notEq', params),
  'notEq': (...params: any[]) => {
    return `${createTemplateInsert(`==`, params)}${createTemplateInsert(
      'flip',
    )}`;
  },
  '!': () => createTemplateInsert('not'),
  'not': () => {
    return `${createTemplateInsert('copy')}${createTemplateInsert('flip')}`;
  },
  'flip': () => {
    return `>${createTemplateInsert('true')}<[>[-]<-]>[<+>-]<`;
  },
  'boolify': () => {
    return `${createTemplateInsert('copy')}<${createTemplateInsert(
      '0',
    )}>[<+>${createTemplateInsert('0')}]<`;
  },
  'and': () => {
    return `<${createTemplateInsert('copy', [2, 3])}${createTemplateInsert(
      'boolify',
    )}<${createTemplateInsert('copy', [2, 3])}${createTemplateInsert(
      'boolify',
    )}[<+>-]<${createTemplateInsert('==', [2])}<${createTemplateInsert(
      '0',
    )}>${createTemplateInsert('move', [-1])}`;
  },
  'or': () => {
    return `<${createTemplateInsert('copy', [2, 3])}${createTemplateInsert(
      'boolify',
    )}<${createTemplateInsert('copy', [2, 3])}${createTemplateInsert(
      'boolify',
    )}[<+>-]<${createTemplateInsert('!=', [0])}<${createTemplateInsert(
      '0',
    )}>${createTemplateInsert('move', [-1])}`;
  },
};
