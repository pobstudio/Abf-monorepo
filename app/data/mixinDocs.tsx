import { B, Code, I, P } from '../components/texts';
import { MixinDoc } from '../types/docs';
import { createTemplateInsert } from '../utils/brainFuck/template/constants';
import { STORAGE_NUM_REGISTERS } from '../utils/brainFuck/template/libraries/storage';

export const MEMORY_DOCS: { [key: string]: MixinDoc } = {
  constants: {
    description: () => (
      <P>
        starting from the current <I>data pointer</I>, sets the bytes provided
        (byteString) into the data tape, shifting to the right for each byte
        provided.
      </P>
    ),
    params: [
      {
        label: 'byteString',
        description: 'hex string of bytes',
      },
    ],
    examples: [
      {
        code: createTemplateInsert('constants', ['0xFF00FF33']),
        label: 'Example',
        tapeLogLength: 5,
      },
    ],
    dataPointerLocationDescription:
      'leaves you on the right most cell with the last byte from the byteString',
  },
  jump: {
    description: () => (
      <P>
        jumps the current <I>data pointer</I> to the right or left based on the
        provided delta value.
      </P>
    ),
    params: [
      {
        label: 'delta',
        description: 'a positive or negative integer',
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('jump', ['5'])}+${createTemplateInsert(
          'jump',
          ['-4'],
        )}++`,
        label: 'Example',
        tapeLogLength: 6,
      },
    ],
    dataPointerLocationDescription: 'data pointer + delta',
  },
  move: {
    description: () => (
      <P>
        moves the value at the current <I>data pointer</I> by delta value to a
        new data cell.
      </P>
    ),
    params: [
      {
        label: 'delta',
        description: 'a positive or negative integer',
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('move', [
          '2',
        ])}`,
        label: 'Example',
        tapeLogLength: 4,
      },
    ],
    dataPointerLocationDescription: 'data pointer + delta',
  },
  copy: {
    description: () => (
      <P>
        copies the value at the current <I>data pointer</I> by delta value to a
        new data cell.
      </P>
    ),
    params: [
      {
        label: 'delta',
        description: 'a positive or negative integer. Defaults to 1',
        isOptional: true,
      },
      {
        label: 'temporaryDelta',
        description:
          'a positive or negative integer; references a temporary data cell that is used during copy but cleaned up (set to zero) afterwards. Defaults to 2.',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('copy')}`,
        label: 'Example',
        tapeLogLength: 4,
      },
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('copy', [
          2,
        ])}`,
        label: 'Example with delta',
        tapeLogLength: 4,
      },
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert(
          'copy',
          [3, 1],
        )}`,
        label: 'Example with delta + temporaryDelta',
        tapeLogLength: 4,
      },
    ],
    dataPointerLocationDescription: 'data pointer + delta',
  },
  skipInputs: {
    description: () => <P>skips the first X amount of bytes provided.</P>,
    params: [
      {
        label: 'value',
        description: 'positive integer (0-255)',
      },
    ],
    examples: [],
    dataPointerLocationDescription: 'unchanged',
  },
};

export const MATH_DOCS: { [key: string]: MixinDoc } = {
  add: {
    description: () => (
      <P>
        sums the current value at <I>data pointer</I> with provided constant or
        the value to the left of the <I>data pointer</I>.
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('add', [
          '5',
        ])}`,
        label: 'Example with constant',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('3')}>${createTemplateInsert(
          '5',
        )}${createTemplateInsert('add')}`,
        label: 'Example without constant',
        tapeLogLength: 4,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right one data cell',
  },
  sub: {
    description: () => (
      <P>
        subtracts the current value at <I>data pointer</I> with provided
        constant. If no parameter is provided, gives the result of (current data
        cell - left shift data cell)
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('sub', [
          '2',
        ])}`,
        label: 'Example with constant',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('3')}>${createTemplateInsert(
          '4',
        )}${createTemplateInsert('sub')}`,
        label: 'Example without constant',
        tapeLogLength: 4,
      },
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('sub', [
          '4',
        ])}`,
        label: 'Example with underflow',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  absSub: {
    description: () => (
      <P>
        gets the absolute value difference between two values. If parameter is
        provided, finds the abs(data cell - value). If no parameter provided,
        finds the abs(data cell - left data cell).
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('absSub', [
          '2',
        ])}`,
        label: 'Example with constant',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('3')}>${createTemplateInsert(
          '4',
        )}${createTemplateInsert('sub')}`,
        label: 'Example without constant',
        tapeLogLength: 4,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  flippedSub: {
    description: () => (
      <P>
        behaves just like <Code>{createTemplateInsert('sub')}</Code> but flips
        the values, i.e (instead of A - B, it is B - A). Subtracts the provided
        constant by value at <I>data pointer</I>. If no parameter is provided,
        gives the result of (left shift data cell - current data cell)
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert(
          'flippedSub',
          ['5'],
        )}`,
        label: 'Example with constant',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('3')}>${createTemplateInsert(
          '2',
        )}${createTemplateInsert('flippedSub')}`,
        label: 'Example without constant',
        tapeLogLength: 4,
      },
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert(
          'flippedSub',
          ['2'],
        )}`,
        label: 'Example with underflow',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
};

export const STORAGE_DOCS: { [key: string]: MixinDoc } = {
  jumpToStorageSlots: {
    description: () => (
      <P>
        jumps the current <I>data pointer</I> to the start of the storage data
        cells.
      </P>
    ),
    params: [],
    examples: [
      {
        code: `${createTemplateInsert('jumpToStorageSlots')},
        `,
        label: 'Example',
        tapeLogLength: 1,
      },
    ],
    dataPointerLocationDescription: `data cell index ${
      STORAGE_NUM_REGISTERS + 1
    }`,
  },
  store: {
    description: () => (
      <P>stores the value at writeFromIndex into data slotIndex.</P>
    ),
    params: [
      {
        label: 'writeFromIndex',
        description: `positive integer, index value between 0-${
          STORAGE_NUM_REGISTERS - 1
        }`,
      },
      {
        label: 'slotIndex',
        description: `positive integer, index value for the data slot to store the value in writeFromIndex`,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert(
          'store',
          [0, 0],
        )}
        `,
        label: 'Example',
        tapeLogLength: 34,
      },
    ],
    dataPointerLocationDescription: `writeFromIndex`,
  },
  read: {
    description: () => (
      <P>reads the value at data slotIndex into readIntoIndex.</P>
    ),
    params: [
      {
        label: 'readIntoIndex',
        description: `positive integer, index value between 0-${
          STORAGE_NUM_REGISTERS - 1
        }`,
      },
      {
        label: 'slotIndex',
        description: `positive integer, index value for the data slot to read`,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert(
          'store',
          [0, 0],
        )}${createTemplateInsert('read', [2, 0])}
        `,
        label: 'Example',
        tapeLogLength: 34,
      },
    ],
    dataPointerLocationDescription: `readIntoIndex`,
  },
  logStorage: {
    description: () => (
      <P>outputs the stored values fromSlotIndex - toSlotIndex.</P>
    ),
    params: [
      {
        label: 'fromSlotIndex',
        description: `positive integer, index value for the data slot to start output from`,
      },
      {
        label: 'toSlotIndex',
        description: `positive integer, index value for the data slot to end outputting (inclusive)`,
      },
    ],
    examples: [],
    dataPointerLocationDescription: `readIntoIndex`,
  },
};

export const LOOP_DOCS: { [key: string]: MixinDoc } = {
  repeat: {
    description: () => (
      <>
        <P>
          repeats the code block between {createTemplateInsert('repeat')} and{' '}
          {createTemplateInsert('repeatEnd')} num times. If no parameter
          provided, loops the value in current data cell times.
        </P>
        <P>
          <Code>{createTemplateInsert('repeat')}</Code> reserves a data cell to
          track stateful logic; the <I>data pointer</I> is shifted two times
          from where it was before the mixin was executed.
        </P>
        <P>
          <B>NOTE:</B> At the end of the code block, the <I>data pointer</I>{' '}
          must be unchanged (i.e return it to where it was before).
        </P>
      </>
    ),
    params: [
      {
        label: 'num',
        description:
          'positive integer, number of times to repeat the code between repeat and closure mixin',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('repeat', ['4'])}++${createTemplateInsert(
          'repeatEnd',
        )}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('4')}${createTemplateInsert('repeat', [
          '4',
        ])}++${createTemplateInsert('repeatEnd')}`,
        label: 'Example with no params',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription:
      'shifted to the right by 2 (requires a extra data cell to monitor the conditional state)',
  },
  repeatEnd: {
    description: () => <P>closes the repeat logic that is executed.</P>,
    params: [],
    examples: [],
    dataPointerLocationDescription:
      'unchanged (data pointer is put back to where it was before if statement)',
  },
  while: {
    description: () => (
      <>
        <P>
          repeats the code between {createTemplateInsert('while')} and{' '}
          {createTemplateInsert('whileEnd')} if{' '}
          <Code>{createTemplateInsert('conditionalMixin')}</Code> is met.
        </P>
        <P>
          <Code>{createTemplateInsert('while')}</Code> reserves 5 data cells to
          track stateful logic; the <I>data pointer</I> is is shifted six times
          from where it was before the mixin was executed.
        </P>
        <P>
          <B>NOTE:</B> At the end of the code block, the <I>data pointer</I>{' '}
          must be unchanged (i.e return it to where it was before).
        </P>
      </>
    ),
    params: [
      {
        label: 'conditionalMixin',
        description: 'the label of a mixin in the conditional library',
      },
      {
        label: '...params',
        description: 'parameters passed to the conditionalMixin',
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('while', [
          'lessThan',
          '4',
        ])}+++${createTemplateInsert('jump', ['-6'])}+${createTemplateInsert(
          'jump',
          ['6'],
        )}${createTemplateInsert('whileEnd')}`,
        label: 'Example',
        tapeLogLength: 8,
      },
    ],
    dataPointerLocationDescription:
      'shifted to the right by 6 (requires 5 data cells to monitor the conditional state)',
  },
  whileEnd: {
    description: () => <P>closes the logic that is executed in while loop.</P>,
    params: [],
    examples: [],
    dataPointerLocationDescription:
      'unchanged (data pointer is put back to where it was before if statement)',
  },
  for: {
    description: () => (
      <>
        <P>
          instantiates a "looped value" and repeats the code between{' '}
          {createTemplateInsert('for')} and {createTemplateInsert('forEnd')} if{' '}
          <Code>{createTemplateInsert('conditionalMixin')}</Code> is met.
        </P>
        <P>
          <Code>{createTemplateInsert('for')}</Code> reserves 5 data cells to
          track stateful logic; the <I>data pointer</I> is is shifted six times
          from where it was before the mixin was executed.
        </P>
        <P>
          <Code>{createTemplateInsert('forEnd')}</Code> takes a parameter that
          changes the looped value.
        </P>

        <P>
          <B>NOTE:</B> At the end of the code block, the <I>data pointer</I>{' '}
          must be unchanged (i.e return it to where it was before).
        </P>
      </>
    ),
    params: [
      {
        label: 'constant',
        description:
          'what the looped value is initialized with. Set to "" to initialize with value in current data cell.',
      },
      {
        label: 'conditionalMixin',
        description: 'the label of a mixin in the conditional library',
      },
      {
        label: '...params',
        description: 'parameters passed to the conditionalMixin',
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('for', [
          '1',
          'lessThan',
          '4',
        ])}+++${createTemplateInsert('forEnd', ['1'])}`,
        label: 'Example',
        tapeLogLength: 8,
      },
      {
        code: `${createTemplateInsert('1')}${createTemplateInsert('for', [
          '',
          'lessThan',
          '4',
        ])}+++${createTemplateInsert('forEnd', ['1'])}`,
        label: 'Example with no constant',
        tapeLogLength: 8,
      },
    ],
    dataPointerLocationDescription:
      'shifted to the right by 6 (requires 5 data cells to monitor the conditional state)',
  },
  forEnd: {
    description: () => (
      <P>closes the for logic and changes looped value after each iteration.</P>
    ),
    params: [
      {
        label: 'delta',
        description:
          'positive or negative integer, after each iteration looped value is added the delta value.',
      },
    ],
    examples: [],
    dataPointerLocationDescription:
      'unchanged (data pointer is put back to where it was before if statement)',
  },
};

export const DEBUG_DOCS: { [key: string]: MixinDoc } = {
  log: {
    description: () => (
      <P>outputs the data cells between startIndex and endIndex (inclusive).</P>
    ),
    params: [
      {
        label: 'startIndex',
        description: 'positive integer',
      },
      {
        label: 'endIndex',
        description: 'positive integer (endIndex > startIndex)',
      },
    ],
    examples: [],
    dataPointerLocationDescription: 'at endIndex',
  },
  logValue: {
    description: () => <P>logs the provided hex string.</P>,
    params: [
      {
        label: 'hexStr',
        description: 'byte string',
      },
    ],
    examples: [],
    dataPointerLocationDescription: 'unchanged',
  },
};

export const CONTROL_DOCS: { [key: string]: MixinDoc } = {
  if: {
    description: () => (
      <>
        <P>
          If <Code>{createTemplateInsert('conditionalMixin')}</Code> is true,
          proceed with code block between this mixin and{' '}
          <Code>{createTemplateInsert('ifEnd')}</Code>, if false, ignore logic
          and jump to <Code>{createTemplateInsert('ifEnd')}</Code>.
        </P>
        <P>
          <Code>{createTemplateInsert('if')}</Code> reserves a data cell to
          track stateful logic; if condition is true, the <I>data pointer</I> is
          shifted two times to the right from where it was before the mixin was
          executed.
        </P>
        <P>
          <B>NOTE:</B> If the code block between {createTemplateInsert('if')}{' '}
          and {createTemplateInsert('ifEnd')} is executed, at the end of the
          code block, the <I>data pointer</I> must be unchanged (i.e return it
          to where it was before).
        </P>
      </>
    ),
    params: [
      {
        label: 'conditionalMixin',
        description: 'the label of a mixin in the conditional library',
      },
      {
        label: '...params',
        description: 'parameters passed to the conditionalMixin',
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('if', [
          '==',
          '3',
        ])}+<<++>>${createTemplateInsert('ifEnd')}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert('if', [
          '==',
          '4',
        ])}+<<++>>${createTemplateInsert('ifEnd')}`,
        label: 'Example with condition not met',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('5')}>${createTemplateInsert(
          '4',
        )}}${createTemplateInsert('if', ['=='])}+<<++>>${createTemplateInsert(
          'ifEnd',
        )}`,
        label: 'Example with eq (2 dynamic values)',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription:
      'shifted to the right by 2 (requires an extra data cell to monitor the conditional state)',
  },
  ifEnd: {
    description: () => (
      <P>closes the code block that is executed if the conditions are met.</P>
    ),
    params: [],
    examples: [],
    dataPointerLocationDescription:
      'unchanged (data pointer is put back to where it was before if statement)',
  },
};

export const CONDITIONAL_DOCS: { [key: string]: MixinDoc } = {
  true: {
    description: () => <P>sets the current data cell to the value 1.</P>,
    params: [],
    examples: [
      {
        code: `${createTemplateInsert('true')}`,
        label: 'Example',
        tapeLogLength: 2,
      },
    ],
    dataPointerLocationDescription: 'no change',
  },
  false: {
    description: () => <P>sets the current data cell to the value 0.</P>,
    params: [],
    examples: [
      {
        code: `${createTemplateInsert('false')}`,
        label: 'Example',
        tapeLogLength: 2,
      },
    ],
    dataPointerLocationDescription: 'no change',
  },
  flip: {
    description: () => <P>flips the boolean state of the current data cell.</P>,
    params: [],
    examples: [
      {
        code: `${createTemplateInsert('false')}${createTemplateInsert('flip')}`,
        label: 'Example',
        tapeLogLength: 2,
      },
    ],
    dataPointerLocationDescription: 'no change',
  },
  not: {
    alias: ['!'],
    description: () => (
      <P>
        behaves just like <Code>{createTemplateInsert('flip')}</Code>, but
        leaves current data cell unchanged
      </P>
    ),
    params: [],
    examples: [
      {
        code: `${createTemplateInsert('false')}${createTemplateInsert('not')}`,
        label: 'Example',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  boolify: {
    description: () => (
      <P>
        if current data cell is non zero, set it to{' '}
        <Code>{createTemplateInsert('true')}</Code>, otherwise set it to{' '}
        <Code>{createTemplateInsert('false')}</Code>.
      </P>
    ),
    params: [],
    examples: [
      {
        code: `${createTemplateInsert('5')}${createTemplateInsert('boolify')}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('0')}${createTemplateInsert('boolify')}`,
        label: 'Example with zero',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'no change',
  },
  and: {
    description: () => (
      <P>
        AND boolean logic with the current data cell and the data cell to the
        left.
      </P>
    ),
    params: [],
    examples: [
      {
        code: `${createTemplateInsert('true')}>${createTemplateInsert(
          'true',
        )}${createTemplateInsert('and')}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('true')}>${createTemplateInsert(
          'false',
        )}${createTemplateInsert('and')}`,
        label: 'Example with true and false',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  or: {
    description: () => (
      <P>
        OR boolean logic with the current data cell and the data cell to the
        left.
      </P>
    ),
    params: [],
    examples: [
      {
        code: `${createTemplateInsert('true')}>${createTemplateInsert(
          'false',
        )}${createTemplateInsert('or')}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('false')}>${createTemplateInsert(
          'false',
        )}${createTemplateInsert('or')}`,
        label: 'Example with false and false',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  eq: {
    alias: ['=='],
    description: () => (
      <P>
        equality operator. Checks if current data cell is equal to provided
        parameter. If no parameters provided, checks equality with data cell to
        the left.
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer between 0-255',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('5')}${createTemplateInsert('==', [
          '5',
        ])}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('5')}>${createTemplateInsert(
          '5',
        )}${createTemplateInsert('eq')}`,
        label: 'Example with no parameters',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  notEq: {
    alias: ['!='],
    description: () => (
      <P>
        inequality operator. Checks if current data cell is not equal to
        provided parameter. If no parameters provided, checks inequality with
        data cell to the left.
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer between 0-255',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('5')}${createTemplateInsert('!=', [
          '6',
        ])}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('5')}>${createTemplateInsert(
          '6',
        )}${createTemplateInsert('notEq')}`,
        label: 'Example with no parameters',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  lessThan: {
    description: () => (
      <P>
        less than operator. Checks if current data cell is less than provided
        parameter. If no parameters provided, checks if less than data cell to
        the left.
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer between 0-255',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('5')}${createTemplateInsert('lessThan', [
          '6',
        ])}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('5')}>${createTemplateInsert(
          '6',
        )}${createTemplateInsert('lessThan')}`,
        label: 'Example with no parameters',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  greaterThan: {
    description: () => (
      <P>
        greater than operator. Checks if current data cell is greater than
        provided parameter. If no parameters provided, checks if greater than
        data cell to the left.
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer between 0-255',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('5')}${createTemplateInsert(
          'greaterThan',
          ['4'],
        )}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('5')}>${createTemplateInsert(
          '4',
        )}${createTemplateInsert('greaterThan')}`,
        label: 'Example with no parameters',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  greaterThanOrEq: {
    description: () => (
      <P>
        greater than or equal operator. Checks if current data cell is greater
        than or equal provided parameter. If no parameters provided, checks if
        greater than or equal data cell to the left.
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer between 0-255',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('5')}${createTemplateInsert(
          'greaterThanOrEq',
          ['4'],
        )}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('4')}>${createTemplateInsert(
          '4',
        )}${createTemplateInsert('greaterThanOrEq')}`,
        label: 'Example with no parameters',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
  lessThanOrEq: {
    description: () => (
      <P>
        less than or equal operator. Checks if current data cell is less than or
        equal provided parameter. If no parameters provided, checks if less than
        or equal data cell to the left.
      </P>
    ),
    params: [
      {
        label: 'value',
        description: 'positive integer between 0-255',
        isOptional: true,
      },
    ],
    examples: [
      {
        code: `${createTemplateInsert('3')}${createTemplateInsert(
          'lessThanOrEq',
          ['4'],
        )}`,
        label: 'Example',
        tapeLogLength: 3,
      },
      {
        code: `${createTemplateInsert('4')}>${createTemplateInsert(
          '4',
        )}${createTemplateInsert('lessThanOrEq')}`,
        label: 'Example with no parameters',
        tapeLogLength: 3,
      },
    ],
    dataPointerLocationDescription: 'Shifts to the right by one data cell',
  },
};
