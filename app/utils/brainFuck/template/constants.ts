export const TEMPLATE_INSERT_OPCODE_START = '{{';
export const TEMPLATE_INSERT_OPCODE_END = '}}';

export const TEMPLATE_INSERT_SEPARATOR = ':';

export const TEMPLATE_MATCH_REGEX = new RegExp(
  `${TEMPLATE_INSERT_OPCODE_START}([^${TEMPLATE_INSERT_OPCODE_END}]+)${TEMPLATE_INSERT_OPCODE_END}`,
  'g',
);

export const createTemplateInsert = (identifier: string, params: any[] = []) =>
  `${TEMPLATE_INSERT_OPCODE_START}${identifier}${
    params.length === 0 ? '' : TEMPLATE_INSERT_SEPARATOR
  }${params.join(TEMPLATE_INSERT_SEPARATOR)}${TEMPLATE_INSERT_OPCODE_END}`;
