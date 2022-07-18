import { createTemplateInsert, TEMPLATE_INSERT_SEPERATOR } from '../constants';
import { CONDITIONAL_LIBRARY } from './conditional';
export const CONTROL_LIBRARY = {
  if: (conditional: any, ...params: any[]) => {
    if (!(CONDITIONAL_LIBRARY as any)[conditional]) {
      return undefined;
    }
    return `${createTemplateInsert(
      `${conditional}:${params.join(TEMPLATE_INSERT_SEPERATOR)}`,
    )}[>`;
  },
  ifEnd: () => {
    return `<${createTemplateInsert('false')}]<`;
  },
};
