export const TEMPLATE_INSERT_OPCODE_START = '{{';
export const TEMPLATE_INSERT_OPCODE_END = '}}';

export const TEMPLATE_INSERT_SEPERATOR = ':';

export const TEMPLATE_MATCH_REGEX = new RegExp(
  `${TEMPLATE_INSERT_OPCODE_START}([^${TEMPLATE_INSERT_OPCODE_END}]+)${TEMPLATE_INSERT_OPCODE_END}`,
  'g',
);

export const createTemplateInsert = (identifier: string, params: any[] = []) =>
  `${TEMPLATE_INSERT_OPCODE_START}${identifier}${TEMPLATE_INSERT_SEPERATOR}${params.join(
    TEMPLATE_INSERT_SEPERATOR,
  )}${TEMPLATE_INSERT_OPCODE_END}`;
