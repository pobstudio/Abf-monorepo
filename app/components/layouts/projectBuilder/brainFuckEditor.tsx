import { FC } from 'react';
import {
  useModifyProjectMetadata,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import { getIPFSUrl } from '../../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  DetailTitleAnchorRow,
  InteractiveDetailRowsContainer,
} from '../../details/rows';
import { InputWell, TextArea, TextInput } from '../../inputs/input';
import { TextAnchor } from '../../texts';

export const BrainFuckEditor: FC = () => {
  const { onCodeChange } = useModifyProjectMetadata();
  const { code } = useRawProjectMetadata();

  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['2. WRITE BRAINFUCK', `DOCS`]}
      </DetailTitleAnchorRow>
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
