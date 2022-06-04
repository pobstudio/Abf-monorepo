import { FC } from 'react';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
import { useENSorHex } from '../../../hooks/useENS';
import { getIPFSUrl } from '../../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
} from '../../details/rows';
import { FlexEnds } from '../../flexs';
import { Render } from '../../renders';
import { Label, MultiLineText, Text } from '../../texts';

export const TokenPreview: FC = () => {
  const { currentSampleTokenRenderState } =
    useProjectBuilderContext();
  const { rendererMetadataStub, inputConstants: validInputConstants } =
    useProjectMetadata();
  const name = useENSorHex(rendererMetadataStub?.address);
  return (
    <DetailRowsContainer>
      <FlexEnds>
        <Text>
          <strong>PREVIEW</strong>
        </Text>
      </FlexEnds>
      <Label>INPUT</Label>
      <Text>{currentSampleTokenRenderState.tokenSeed ?? '-'}</Text>
      <FlexEnds>
        <Label>OUTPUT (AS BYTES)</Label>
      </FlexEnds>
      <MultiLineText
        style={{
          lineHeight: '22px',
          lineBreak: 'anywhere',
          color:
          currentSampleTokenRenderState.codeOutput?.[1] === 'error' ? '#FF5D5D' : 'black',
        }}
      >
        {(
          <>
            {currentSampleTokenRenderState.codeOutput?.[0]}{' '}
            <span style={{ opacity: 0.2 }}>
              {currentSampleTokenRenderState.codeOutput?.[1] === 'success'
                ? `${(currentSampleTokenRenderState.codeOutput?.[0].length - 2) / 2} BYTES`
                : '-'}
            </span>
          </>
        ) ?? '-'}
      </MultiLineText>
      <FlexEnds>
        <Label>OUTPUT (AS RENDERED OUTPUT)</Label>
        <Label>{name}</Label>
      </FlexEnds>
      <Render
        output={currentSampleTokenRenderState.codeOutput}
        rendererMetadata={rendererMetadataStub}
      />
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
          {['RENDERER DOCUMENTATION', 'IPFS']}
        </DetailAnchorRow>
      )}
    </DetailRowsContainer>
  );
};
