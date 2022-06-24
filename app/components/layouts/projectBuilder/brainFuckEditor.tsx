import { FC } from 'react';
import {
  useModifyProjectMetadata,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import {
  DetailRow,
  DetailTitleAnchorRow,
  InteractiveDetailRowsContainer,
} from '../../details/rows';
import { ExpandoContentContainer, ExpandoGroup } from '../../expando';
import { Flex, FlexEnds } from '../../flexs';
import { InputWell, TextArea, TextInput } from '../../inputs/input';
import { Code, MultiLineText, Text } from '../../texts';
import { Tooltip } from '../../tooltip';

export const BrainFuckEditor: FC = () => {
  const { onCodeChange, onInputConstantsChange } = useModifyProjectMetadata();
  const { code, inputConstants: validInputConstants } = useProjectMetadata();
  const { inputConstants } = useRawProjectMetadata();
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>{['WRITE BRAINFUCK', `DOCS`]}</DetailTitleAnchorRow>
      <InputWell>
        <TextArea
          value={code ?? ''}
          onChange={(e) => onCodeChange(e.target.value)}
          style={{ minHeight: 240 }}
          placeholder="-[--->+<]>-.[---->+++++<]>-.+.++++++++++.+[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.-------------.[--->+<]>---..+++++.-[---->+<]>++.+[->+++<]>.++++++++++++..---.[-->+<]>--------."
        />
      </InputWell>
      <FlexEnds style={{ paddingTop: 82 }}>
        <Text>INPUT TO BF CODE</Text>
        <Tooltip direction={'right'}>
          <MultiLineText>
            Input in Brainfuck is read via the <Code>,</Code> operator. Provide
            up to 32 bytes; another 32 pseudo-random bytes will be appended for
            a total of 64 bytes.
          </MultiLineText>
        </Tooltip>
      </FlexEnds>
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
      <div style={{ paddingTop: 82 }}>
        <AdvancedControls />
      </div>
    </InteractiveDetailRowsContainer>
  );
};

const AdvancedControls: FC = () => {
  const { onSeedChange } = useModifyProjectMetadata();
  const { seed } = useRawProjectMetadata();
  const { seed: validSeed } = useProjectMetadata();
  return (
    <ExpandoGroup title={'ADVANCED SETTINGS'}>
      <ExpandoContentContainer>
        <InteractiveDetailRowsContainer>
          <InputWell>
            <Flex>
              <Text style={{ marginRight: 6 }}>SEED</Text>
              <Tooltip direction={'left'}>
                <MultiLineText>
                  Seed provides a determinstic source of random for generating
                  the last 32 bytes provide to Brainfuck code.
                </MultiLineText>
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
        </InteractiveDetailRowsContainer>
      </ExpandoContentContainer>
    </ExpandoGroup>
  );
};
