import { FC, useMemo } from 'react';
import { HUNDRED_PERCENT_BPS } from '../../../constants';
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
import {
  CheckboxInput,
  InputWell,
  NumberInput,
  TextInput,
} from '../../inputs/input';
import { Text } from '../../texts';

export const RendererParametersSelector: FC = () => {
  const { onInputConstantsChange, onSeedChange } = useModifyProjectMetadata();
  const { inputConstants, seed } = useRawProjectMetadata();
  const { inputConstants: validInputConstants } = useProjectMetadata();
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['5. CONFIGURE RENDERING PARAMETERS', `SPEC`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <Text>SEED</Text>
        <TextInput
          value={seed ?? ''}
          onChange={(e) => onSeedChange(e.target.value)}
          style={{ textAlign: 'right' }}
          placeholder="0xabcd...decd"
        />
      </InputWell>
      <InputWell>
        <Text>INPUT CONSTANTS</Text>
        <TextInput
          value={inputConstants ?? ''}
          onChange={(e) => onInputConstantsChange(e.target.value)}
          style={{ textAlign: 'right' }}
          placeholder="0xabcd...decd"
        />
      </InputWell>
      <DetailRow>
        {['VALID INPUT CONSTANTS', !!validInputConstants ? 'TRUE' : 'FALSE']}
      </DetailRow>
    </InteractiveDetailRowsContainer>
  );
};
