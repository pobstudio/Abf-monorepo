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

export const TokenParametersSelector: FC = () => {
  const { onNameChange, onSymbolChange } = useModifyProjectMetadata();
  const { name, symbol } = useRawProjectMetadata();
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['3. CONFIGURE TOKEN PARAMETERS', `SPEC`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <Text>NAME</Text>
        <TextInput
          value={name ?? ''}
          onChange={(e) => onNameChange(e.target.value)}
          style={{ textAlign: 'right' }}
          placeholder="Absolute Brain Fuck"
        />
      </InputWell>
      <InputWell>
        <Text>SYMBOL</Text>
        <TextInput
          value={symbol ?? ''}
          onChange={(e) => onSymbolChange(e.target.value)}
          style={{ textAlign: 'right' }}
          placeholder="ABF"
        />
      </InputWell>
    </InteractiveDetailRowsContainer>
  );
};
