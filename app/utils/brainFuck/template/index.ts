import { BfTemplateInsertLibrary } from '../../../types/bf';
import {
  TEMPLATE_INSERT_OPCODE_END,
  TEMPLATE_INSERT_OPCODE_START,
  TEMPLATE_INSERT_SEPERATOR,
  TEMPLATE_MATCH_REGEX,
} from './constants';
import { STANDARD_TEMPLATE_LIBRARY } from './libraries/standard';

export const findAllTemplateInserts = (code: string): [string, number][] => {
  const templateInserts: [string, number][] = [];
  for (const match of code.matchAll(TEMPLATE_MATCH_REGEX)) {
    templateInserts.push([match[0], match.index ?? -1]);
  }
  return templateInserts;
};

export const constructTemplateLibrary = (
  libraries: BfTemplateInsertLibrary[] = [STANDARD_TEMPLATE_LIBRARY],
) => {
  return libraries.reduce(
    (a, c) => ({ ...a, ...c }),
    {},
  ) as BfTemplateInsertLibrary;
};

export const transpileTemplatedBf = (
  code: string,
  libraries: BfTemplateInsertLibrary[] = [STANDARD_TEMPLATE_LIBRARY],
) => {
  const library = constructTemplateLibrary(libraries);

  const transpile = (code: string): string => {
    const inserts = findAllTemplateInserts(code);
    const insertIdentifierAndParams: [string, string, any[]][] = inserts.map(
      (i) => {
        const [identifier, ...params] = i[0]
          .slice(
            TEMPLATE_INSERT_OPCODE_START.length,
            -TEMPLATE_INSERT_OPCODE_END.length,
          )
          .split(TEMPLATE_INSERT_SEPERATOR);
        return [i[0], identifier, params];
      },
    );
    const validInsertIdentifierAndParams = insertIdentifierAndParams.filter(
      (i) => {
        return !!library[i[1]];
      },
    );
    if (validInsertIdentifierAndParams.length === 0) {
      return code;
    }
    return transpileTemplatedBf(
      validInsertIdentifierAndParams.reduce((a, c) => {
        const [rawString, identifier, params] = c;
        // no identifier found
        if (!library[identifier]) {
          return a;
        }
        const replacementString = library[identifier](...params);

        return a.replaceAll(rawString, replacementString);
      }, code),
    );
  };
  return transpile(code);
};
