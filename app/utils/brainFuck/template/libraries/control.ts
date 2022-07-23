import { createTemplateInsert } from '../constants';
import { CONDITIONAL_LIBRARY } from './conditional';
export const CONTROL_LIBRARY = {
  if: (conditional: any, ...params: any[]) => {
    if (!(CONDITIONAL_LIBRARY as any)[conditional]) {
      return undefined;
    }
    return `${createTemplateInsert(`${conditional}`, params)}[>`;
  },
  ifEnd: () => {
    return `<${createTemplateInsert('false')}]<`;
  },
};
