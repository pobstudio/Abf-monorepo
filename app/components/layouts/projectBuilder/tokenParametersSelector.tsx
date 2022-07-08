import { FC } from 'react';
import {
  useModifyProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import { DetailRowsContainer, DetailTitleAnchorRow } from '../../details/rows';
import { InputWell, TextInput } from '../../inputs/input';
import { Text } from '../../texts';

export const TokenParametersSelector: FC = () => {
  const { onNameChange, onSymbolChange } = useModifyProjectMetadata();
  const { name, symbol } = useRawProjectMetadata();
  return (
    <DetailRowsContainer>
      <DetailTitleAnchorRow>
        {['CONFIGURE COLLECTION PARAMETERS', `SPEC`]}
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
    </DetailRowsContainer>
  );
};
