import { createTemplateInsert } from '../constants';

export const MEMORY_LIBRARY = {
  copy: () => `${createTemplateInsert('copyr')}`,
  copyR: () => `[>+>+<<-]>>[<<+>>-]<<`,
  copyL: () => `[<+<+>>-]<<[>>+<<-]>>`,
};
