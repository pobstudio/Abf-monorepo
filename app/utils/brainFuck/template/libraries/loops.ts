import { createTemplateInsert, TEMPLATE_INSERT_SEPERATOR } from '../constants';
import { CONDITIONAL_LIBRARY } from './conditional';
export const LOOPS_LIBRARY = {
  while: (conditional: any, ...params: any[]) => {
    if (!(CONDITIONAL_LIBRARY as any)[conditional]) {
      return undefined;
    }
    return `>${createTemplateInsert('true')}[${createTemplateInsert(
      'false',
    )}<${createTemplateInsert(
      `${conditional}:${params.join(TEMPLATE_INSERT_SEPERATOR)}`,
    )}[>${createTemplateInsert('true')}>`;
  },
  whileEnd: () => {
    return `<<${createTemplateInsert('false')}]>[<${createTemplateInsert(
      'true',
    )}>-]<]<`;
  },
  repeat: (val: any) => {
    let prefix: string | undefined | null = undefined;
    if (val === undefined) {
      prefix = ``;
    } else {
      const safeVal = parseInt(val);
      if (isNaN(safeVal) || safeVal < 0 || safeVal > 255) {
        prefix = null;
      } else {
        prefix = `${createTemplateInsert(val)}`;
      }
    }
    if (prefix === null || prefix === undefined) {
      return undefined;
    }
    return `${prefix}[>`;
  },
  repeatEnd: () => `<-]`,
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
    return `<<<${(safeIncrement > 0 ? '+' : '-').repeat(
      Math.abs(safeIncrement),
    )}>>>${createTemplateInsert('whileEnd')}${createTemplateInsert('0')}<`;
  },
};
