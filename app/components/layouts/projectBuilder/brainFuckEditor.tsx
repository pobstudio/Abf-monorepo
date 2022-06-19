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
import { FlexEnds } from '../../flexs';
import { InputWell, TextArea } from '../../inputs/input';
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
    </InteractiveDetailRowsContainer>
  );
};
