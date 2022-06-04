import { FC } from 'react';
import {
  useModifyProjectMetadata,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import {
  DetailTitleAnchorRow,
  InteractiveDetailRowsContainer,
} from '../../details/rows';
import { InputWell, TextArea } from '../../inputs/input';

export const BrainFuckEditor: FC = () => {
  const { onCodeChange } = useModifyProjectMetadata();
  const { code } = useProjectMetadata();

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
    </InteractiveDetailRowsContainer>
  );
};
