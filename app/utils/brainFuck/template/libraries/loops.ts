import { BfTemplateInsertLibrary } from '../../../../types/bf';
import { createTemplateInsert } from '../constants';
import { CONDITIONAL_LIBRARY } from './conditional';

const NUM_BUFFER = 3;

export const LOOPS_LIBRARY: BfTemplateInsertLibrary = {
  while: (conditional: any, ...params: any[]) => {
    if (!(CONDITIONAL_LIBRARY as any)[conditional]) {
      return undefined;
    }
    return `>${createTemplateInsert('true')}[${createTemplateInsert(
      'false',
    )}<${createTemplateInsert(
      `${conditional}`,
      params,
    )}[>${createTemplateInsert('true')}>${'>'.repeat(NUM_BUFFER)}`;
  },
  whileEnd: () => {
    return `${'<'.repeat(NUM_BUFFER)}<<${createTemplateInsert(
      'false',
    )}]>[<${createTemplateInsert('true')}>-]<]<`;
  },
  repeat: (val: any) => {
    let prefix: string | undefined | null = undefined;
    if (val === undefined) {
      prefix = ``;
    } else {
      const safeVal = parseInt(val);
      if (isNaN(safeVal) || safeVal < 0 || safeVal > 255) {
        prefix = `${createTemplateInsert('copy')}`;
      } else {
        prefix = `>${createTemplateInsert(val)}`;
      }
    }
    if (prefix === null || prefix === undefined) {
      return undefined;
    }
    return `${prefix}[>`;
  },
  repeatEnd: () => `<-]<`,
  for: (constant: any, ...params: any[]) => {
    const safeConstant = parseInt(constant);
    let prefix: string | undefined | null = undefined;
    if (safeConstant === undefined || constant === '') {
      prefix = `${createTemplateInsert('copy')}`;
    } else {
      const safeConstant = parseInt(constant);
      if (isNaN(safeConstant) || safeConstant < 0 || safeConstant > 255) {
        prefix = null;
      } else {
        prefix = `>${createTemplateInsert(constant)}`;
      }
    }

    if (prefix === null || prefix === undefined) {
      return undefined;
    }
    return `${prefix}${createTemplateInsert('while', params)}`;
  },
  forEnd: (increment: any) => {
    const safeIncrement = parseInt(increment);
    if (isNaN(safeIncrement) || safeIncrement < 0 || safeIncrement > 255) {
      return undefined;
    }
    return `${createTemplateInsert('jump', [
      -1 * (3 + NUM_BUFFER),
    ])}${(safeIncrement > 0 ? '+' : '-').repeat(
      Math.abs(safeIncrement),
    )}${createTemplateInsert('jump', [3 + NUM_BUFFER])}${createTemplateInsert(
      'whileEnd',
    )}${createTemplateInsert('0')}<`;
  },
};
