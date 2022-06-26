import { FC, useMemo, useState } from 'react';
import {
  useRendererMetadata,
  useRendererMetadataStubByProvider,
} from '../../hooks/useRenderer';
import { RendererMetadata } from '../../types';
import { getIPFSUrl } from '../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
  DetailTitleRow,
} from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { Flex } from '../flexs';
import { Render } from '../renders';
import { Label, MultiLineText } from '../texts';
import { GroupedBytes } from './projectBuilder/tokenPreview';

export const RendererDetails: FC<{ address?: string }> = ({ address }) => {
  console.log(address);
  const rendererMetadataFromGraph = useRendererMetadata(address);
  const rendererMetadataStubFromProvider =
    useRendererMetadataStubByProvider(address);
  const rendererMetadataStub = useMemo(
    () =>
      ({
        ...rendererMetadataFromGraph,
        ...rendererMetadataStubFromProvider,
      } as RendererMetadata),
    [rendererMetadataFromGraph, rendererMetadataStubFromProvider],
  );
  console.log(rendererMetadataStub);
  const [focusedByteGroupingIndex, setFocusedByteGroupingIndex] = useState<
    null | number
  >(null);
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <DetailTitleRow>
            {[
              `RENDERER DOCUMENTATION FOR R-${
                rendererMetadataStub?.id?.toString().padStart(3, '0') ?? '???'
              } "${rendererMetadataStub?.label}"`,
              '',
            ]}
          </DetailTitleRow>
          <Flex>
            <Label>DESCRIPTION</Label>
          </Flex>
          <MultiLineText>
            {rendererMetadataStub.additionalMetadata?.description ?? '-'}
          </MultiLineText>
          <Label>SAMPLE OUTPUT</Label>
          <Render
            output={
              !!rendererMetadataStub.additionalMetadata?.sampleOptions?.input
                ? {
                    status: 'success',
                    output:
                      rendererMetadataStub.additionalMetadata?.sampleOptions
                        ?.input,
                  }
                : undefined
            }
            rendererMetadata={rendererMetadataStub}
          />
          <Flex>
            <Label>SAMPLE BYTE INPUT</Label>
          </Flex>
          {!!rendererMetadataStub.additionalMetadata?.sampleOptions?.input && (
            <GroupedBytes
              output={
                rendererMetadataStub.additionalMetadata?.sampleOptions?.input
              }
              byteGroups={
                rendererMetadataStub.additionalMetadata?.previewOptions
                  ?.byteGroups
              }
              showBytesLength={true}
              focusedByteGroupingIndex={focusedByteGroupingIndex}
              setFocusedByteGroupingIndex={setFocusedByteGroupingIndex}
            />
          )}
          <DetailAnchorRow
            href={
              !!rendererMetadataStub.additionalMetadataURI
                ? getIPFSUrl(rendererMetadataStub.additionalMetadataURI)
                : '#'
            }
          >
            {['RAW FILE SOURCE', 'IPFS']}
          </DetailAnchorRow>
          <DetailRow>{['DOCUMENTATION VERSION', '0.1.0']}</DetailRow>
          <MultiLineText style={{ opacity: 0.2 }}>
            USE RENDERERS AT YOUR OWN RISK. PLEASE CONSULT DOCUMENTATION BEFORE
            DEPLOYMENT.
          </MultiLineText>
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};
