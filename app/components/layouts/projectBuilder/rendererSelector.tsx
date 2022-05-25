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
import { InputWell, TextInput } from '../../inputs/input';

export const RendererSelector: FC = () => {
  const { onRendererChange } = useModifyProjectMetadata();
  const { rendererMetadataStub } = useProjectMetadata();
  const { renderer } = useRawProjectMetadata();

  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow href={'/renderers'}>
        {['SELECT RENDERER', `REGISTRY`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <TextInput
          value={renderer ?? ''}
          onChange={(e) => onRendererChange(e.target.value)}
          placeholder="0xabcd...1234"
        />
      </InputWell>
      <DetailRow>
        {['VALID CONTRACT', !!rendererMetadataStub ? 'TRUE' : 'FALSE']}
      </DetailRow>
      <DetailRow>
        {[
          'REQUIRED OUTPUT LENGTH',
          `${rendererMetadataStub?.outSize.toString() ?? '-'} BYTES`,
        ]}
      </DetailRow>
      {!!rendererMetadataStub?.additionalMetadataURI && (
        <DetailAnchorRow
          href={getIPFSUrl(rendererMetadataStub.additionalMetadataURI)}
        >
          {['DOCUMENTATION', 'IPFS']}
        </DetailAnchorRow>
      )}
    </InteractiveDetailRowsContainer>
  );
};
