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
  const { onRendererChange, onInputConstantsChange, onSeedChange } =
    useModifyProjectMetadata();
  const { renderer, inputConstants, seed } = useRawProjectMetadata();
  const { rendererMetadataStub, inputConstants: validInputConstants } =
    useProjectMetadata();
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['CONFIGURE RENDERING PARAMETERS', `SPEC`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <Text>RENDERER</Text>
        <TextInput
          style={{ textAlign: 'right' }}
          value={renderer ?? ''}
          onChange={(e) => onRendererChange(e.target.value)}
          placeholder="0xabcd...1234"
        />
      </InputWell>
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
        {['VALID RENDERER', !!rendererMetadataStub ? 'TRUE' : 'FALSE']}
      </DetailRow>
      <DetailRow>
        {['VALID INPUT CONSTANTS', !!validInputConstants ? 'TRUE' : 'FALSE']}
      </DetailRow>
    </InteractiveDetailRowsContainer>
  );
};
