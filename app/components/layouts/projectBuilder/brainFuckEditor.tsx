import { FC, useEffect } from 'react';
import {
  useModifyProjectMetadata,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import {
  findAllTemplateInserts,
  transpileTemplatedBf,
} from '../../../utils/brainFuck/template';
import {
  DetailRow,
  DetailRowsContainer,
  DetailTitleAnchorRow,
} from '../../details/rows';
import { ExpandoContentContainer, ExpandoGroup } from '../../expando';
import { Flex } from '../../flexs';
import { InputWell, TextArea, TextInput } from '../../inputs/input';
import { Code, P, Text } from '../../texts';
import { Tooltip } from '../../tooltip';

export const BrainFuckEditor: FC = () => {
  const { onCodeChange, onInputConstantsChange } = useModifyProjectMetadata();
  const { code, inputConstants: validInputConstants } = useProjectMetadata();
  const { inputConstants } = useRawProjectMetadata();

  useEffect(() => {
    if (!code) {
      return;
    }
    const inserts = findAllTemplateInserts(code);
    console.log(inserts);
    const transpiledCode = transpileTemplatedBf(code);
    console.log(transpiledCode);
  }, [code]);

  return (
    <>
      <DetailRowsContainer>
        <DetailTitleAnchorRow>
          {['WRITE BRAINFUCK', `DOCS`]}
        </DetailTitleAnchorRow>
        <InputWell>
          <TextArea
            value={code ?? ''}
            onChange={(e) => onCodeChange(e.target.value)}
            style={{ minHeight: 240 }}
            placeholder="-[--->+<]>-.[---->+++++<]>-.+.++++++++++.+[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.-------------.[--->+<]>---..+++++.-[---->+<]>++.+[->+++<]>.++++++++++++..---.[-->+<]>--------."
          />
        </InputWell>
        <Flex style={{ paddingTop: 82 }}>
          <Text style={{ marginRight: 6 }}>INPUT TO BF CODE</Text>
          <Tooltip direction={'left'}>
            <P>
              Input in Brainfuck is read via the <Code>,</Code> operator.
              Provide up to 32 bytes; another 32 pseudo-random bytes will be
              appended for a total of 64 bytes.
            </P>
          </Tooltip>
        </Flex>
        <InputWell>
          <TextArea
            value={inputConstants ?? ''}
            onChange={(e) => onInputConstantsChange(e.target.value)}
            style={{ minHeight: 40 }}
            placeholder="0xabcd...decd"
          />
        </InputWell>
        <DetailRow>
          {['VALID INPUT CONSTANTS', !!validInputConstants ? 'TRUE' : 'FALSE']}
        </DetailRow>
      </DetailRowsContainer>
      <DetailRowsContainer>
        <AdvancedControls />
      </DetailRowsContainer>
    </>
  );
};

const AdvancedControls: FC = () => {
  const { onSeedChange } = useModifyProjectMetadata();
  const { seed } = useRawProjectMetadata();
  const { seed: validSeed } = useProjectMetadata();
  return (
    <ExpandoGroup title={'ADVANCED SETTINGS'}>
      <ExpandoContentContainer>
        <DetailRowsContainer>
          <InputWell>
            <Flex>
              <Text style={{ marginRight: 6 }}>SEED</Text>
              <Tooltip direction={'left'}>
                <P>
                  Seed provides a determinstic source of random for generating
                  the last 32 bytes provide to Brainfuck code.
                </P>
              </Tooltip>
            </Flex>
            <TextInput
              value={seed ?? ''}
              onChange={(e) => onSeedChange(e.target.value)}
              style={{ textAlign: 'right' }}
              placeholder="0xabcd...decd"
            />
          </InputWell>
          <DetailRow>
            {['VALID SEED', !!validSeed ? 'TRUE' : 'FALSE']}
          </DetailRow>
        </DetailRowsContainer>
      </ExpandoContentContainer>
    </ExpandoGroup>
  );
};
