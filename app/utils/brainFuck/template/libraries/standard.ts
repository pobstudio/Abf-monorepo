import { BfTemplateInsertLibrary } from '../../../../types/bf';
import { CONDITIONAL_LIBRARY } from './conditional';
import { CONTROL_LIBRARY } from './control';
import { DEBUG_LIBRARY } from './debug';
import { LOOPS_LIBRARY } from './loops';
import { MATH_LIBRARY } from './math';
import { MEMORY_LIBRARY } from './memory';
import { NUMBERS_LIBRARY } from './numbers';
import { SAMPLE_LIBRARY } from './sample';
import { STORAGE_LIBRARY } from './storage';

export const STANDARD_TEMPLATE_LIBRARY: BfTemplateInsertLibrary = {
  ...NUMBERS_LIBRARY,
  ...MEMORY_LIBRARY,
  ...MATH_LIBRARY,
  ...CONTROL_LIBRARY,
  ...CONDITIONAL_LIBRARY,
  ...LOOPS_LIBRARY,
  ...DEBUG_LIBRARY,
  ...STORAGE_LIBRARY,
  ...SAMPLE_LIBRARY,
};
