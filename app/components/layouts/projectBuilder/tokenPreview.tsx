import { FC } from 'react';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
import { prettifyCountableNumber } from '../../../utils/hex';
import { getEtherscanAddressUrl, getIPFSUrl } from '../../../utils/urls';
import {
  GroupedBytes,
  GroupedBytesWithHoverState,
} from '../../bytes/groupedBytes';
import { DetailAnchorRow, DetailRowsContainer } from '../../details/rows';
import { Flex, FlexEnds } from '../../flexs';
import { Render } from '../../renders';
import { Code, Label, LabelAnchor, P, Text } from '../../texts';
import { Tooltip } from '../../tooltip';
import { TokenIdSwitcher } from './tokenIdSwitcher';

export const TokenPreview: FC = () => {
  const { currentSampleTokenRenderState } = useProjectBuilderContext();
  const { rendererMetadataStub, inputConstants: validInputConstants } =
    useProjectMetadata();
  return (
    <DetailRowsContainer>
      <FlexEnds>
        <Text>
          <strong>OUTPUT PREVIEW</strong>
        </Text>
        <TokenIdSwitcher />
      </FlexEnds>
      <Flex>
        <Label style={{ marginRight: 6 }}>BF! CODE INPUT</Label>
        <Tooltip direction={'left'}>
          <P>
            Bytes specific to{' '}
            <strong>token id {currentSampleTokenRenderState.tokenId}</strong>{' '}
            provided to the Brainfuck! code readable via the <Code>,</Code>{' '}
            opcode.
          </P>
        </Tooltip>
      </Flex>
      <GroupedBytesWithHoverState
        byteGroups={[{ numGroups: 64, groupBytesIn: 1 }]}
        showBytesLength={false}
        output={currentSampleTokenRenderState.tokenSeed}
      />
      <Flex>
        <Label style={{ marginRight: 6 }}>BF! CODE OUTPUT</Label>
        <Tooltip direction={'left'}>
          <P>
            Bytes produced by Brainfuck! code is inputted to a renderer which
            interprets as a SVG or HTML.
          </P>
        </Tooltip>
      </Flex>
      <RawOutput />
      <FlexEnds>
        <Label>BF! CODE OUTPUT (RENDERED)</Label>
        <LabelAnchor
          target={'_blank'}
          href={
            rendererMetadataStub?.address
              ? getEtherscanAddressUrl(rendererMetadataStub?.address)
              : '#'
          }
        >
          {rendererMetadataStub?.name}
        </LabelAnchor>
      </FlexEnds>
      <Render
        output={currentSampleTokenRenderState.codeOutput}
        rendererMetadata={rendererMetadataStub}
      />
      {!!rendererMetadataStub?.additionalMetadata && (
        <>
          <Label>RENDERER DESCRIPTION</Label>
          <P>{rendererMetadataStub.additionalMetadata.description}</P>
        </>
      )}
      <FlexEnds>
        <Flex>
          <Label style={{ marginRight: 6 }}>REQUIRED OUTPUT LENGTH</Label>
          <Tooltip direction={'left'}>
            <P>
              Renderers typically expect an exact amount of output bytes from
              Brainfuck! to correctly render a SVG or HTML; ensure your code
              output provides the required output length.
            </P>
          </Tooltip>
        </Flex>
        <Text>{`${(() => {
          if (!rendererMetadataStub?.propsSize) return '-';
          return prettifyCountableNumber(rendererMetadataStub.propsSize);
        })()} BYTES`}</Text>
      </FlexEnds>
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

const RawOutput: FC = () => {
  const { currentSampleTokenRenderState } = useProjectBuilderContext();
  const { rendererMetadataStub } = useProjectMetadata();
  const { currentSampleTokenDebugState, setCurrentSampleTokenDebugState } =
    useProjectBuilderContext();

  if (!currentSampleTokenRenderState.codeOutput) {
    return <P>{'-'}</P>;
  }

  if (currentSampleTokenRenderState.codeOutput.status === 'error') {
    return (
      <P style={{ color: '#FF5D5D' }}>
        {currentSampleTokenRenderState.codeOutput?.message}
      </P>
    );
  }

  return (
    <>
      <GroupedBytes
        output={currentSampleTokenRenderState.codeOutput.output}
        byteGroups={
          rendererMetadataStub?.additionalMetadata?.previewOptions?.byteGroups
        }
        focusedByteGroupingIndex={
          currentSampleTokenDebugState?.focusedByteGroupingIndex
        }
        setFocusedByteGroupingIndex={(i) =>
          setCurrentSampleTokenDebugState((s) => ({
            ...s,
            focusedByteGroupingIndex: i,
          }))
        }
      />
      {currentSampleTokenRenderState.codeOutput?.warnings?.map((w, i) => {
        return (
          <P style={{ color: '#FFC54D' }} key={`warning-row-${i}`}>
            {w}
          </P>
        );
      })}
    </>
  );
};
