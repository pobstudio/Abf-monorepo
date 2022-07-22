import { FC, useMemo } from 'react';
import { useENSorHex } from '../../hooks/useENS';
import {
  useRendererMetadata,
  useRendererMetadataStubByProvider,
} from '../../hooks/useRenderer';
import { RendererMetadata } from '../../types';
import { shortenHexString } from '../../utils/hex';
import { getEtherscanAddressUrl, getIPFSUrl } from '../../utils/urls';
import { GroupedBytesWithHoverState } from '../bytes/groupedBytes';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
} from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { Render } from '../renders';
import { H1, Label, P } from '../texts';

export const RendererDetails: FC<{ address?: string }> = ({ address }) => {
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
  const name = useENSorHex(rendererMetadataStub?.owner);
  const rendererName = useENSorHex(address);
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <H1>
            {`SR-${
              rendererMetadataStub?.id?.toString().padStart(3, '0') ?? '???'
            } "${rendererMetadataStub?.name ?? ''}"`}
          </H1>

          <DetailAnchorRow
            href={!!address ? getEtherscanAddressUrl(address) : '#'}
          >
            {['CONTRACT', address ? shortenHexString(address) : '-']}
          </DetailAnchorRow>
          <DetailAnchorRow
            href={
              !!rendererMetadataStub?.owner
                ? getEtherscanAddressUrl(rendererMetadataStub?.owner)
                : '#'
            }
          >
            {['CREATED BY', name]}
          </DetailAnchorRow>
          <DetailAnchorRow
            href={
              !!rendererMetadataStub.additionalMetadataURI
                ? getIPFSUrl(rendererMetadataStub.additionalMetadataURI)
                : '#'
            }
          >
            {['RAW FILE SOURCE', 'IPFS']}
          </DetailAnchorRow>
          <Label>DESCRIPTION</Label>
          <P>{rendererMetadataStub.additionalMetadata?.description ?? '-'}</P>

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
          <Label>SAMPLE BYTE INPUT</Label>
          <GroupedBytesWithHoverState
            output={
              rendererMetadataStub.additionalMetadata?.sampleOptions?.input
            }
            byteGroups={
              rendererMetadataStub.additionalMetadata?.previewOptions
                ?.byteGroups
            }
            showBytesLength={true}
          />

          <DetailRow>{['DOCUMENTATION VERSION', '0.1.0']}</DetailRow>
          <P style={{ opacity: 0.2 }}>
            USE RENDERERS AT YOUR OWN RISK. PLEASE CONSULT DOCUMENTATION BEFORE
            DEPLOYMENT.
          </P>
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};
