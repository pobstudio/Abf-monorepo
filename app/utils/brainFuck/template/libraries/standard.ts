import { CONDITIONAL_LIBRARY } from './conditional';
import { CONTROL_LIBRARY } from './control';
import { DEBUG_LIBRARY } from './debug';
import { LOOPS_LIBRARY } from './loops';
import { MATH_LIBRARY } from './math';
import { MEMORY_LIBRARY } from './memory';
import { NUMBERS_LIBRARY } from './numbers';
import { STORAGE_LIBRARY } from './storage';

export const STANDARD_TEMPLATE_LIBRARY = {
  ...NUMBERS_LIBRARY,
  ...MEMORY_LIBRARY,
  ...MATH_LIBRARY,
  ...CONTROL_LIBRARY,
  ...CONDITIONAL_LIBRARY,
  ...LOOPS_LIBRARY,
  ...DEBUG_LIBRARY,
  ...STORAGE_LIBRARY,
};
