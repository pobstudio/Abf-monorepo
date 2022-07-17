import { CONDITIONAL_LIBRARY } from './conditional';
import { CONTROL_LIBRARY } from './control';
import { DEBUG_LIBRARY } from './debug';
import { MATH_LIBRARY } from './math';
import { MEMORY_LIBRARY } from './memory';
import { NUMBERS_LIBRARY } from './numbers';

export const STANDARD_TEMPLATE_LIBRARY = {
  ...NUMBERS_LIBRARY,
  ...MEMORY_LIBRARY,
  ...MATH_LIBRARY,
  ...CONTROL_LIBRARY,
  ...CONDITIONAL_LIBRARY,
  ...DEBUG_LIBRARY,
};
