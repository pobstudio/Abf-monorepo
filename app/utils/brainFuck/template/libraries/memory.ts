import { createTemplateInsert } from '../constants';

export const MEMORY_LIBRARY = {
  copy: () => `${createTemplateInsert('copyr')}`,
  copyR: () => `[>+>+<<-]>>[<<+>>-]<<`,
  copyL: () => `[<+<+>>-]<<[>>+<<-]>>`,
  move: (delta: any) => {
    const safeDelta = parseInt(delta);
    if (isNaN(safeDelta) || safeDelta === 0) {
      return '';
    }
    return `${(safeDelta > 0 ? '>' : '<').repeat(Math.abs(safeDelta))}`;
  },
};
