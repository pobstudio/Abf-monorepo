import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
import { RendererAdditionalMetadataByteGroup } from '../../../types';
import { prettifyCountableNumber } from '../../../utils/hex';
import { getEtherscanAddressUrl, getIPFSUrl } from '../../../utils/urls';
import { DetailAnchorRow, DetailRowsContainer } from '../../details/rows';
import { Flex, FlexEnds } from '../../flexs';
import { Render } from '../../renders';
import { Code, Label, LabelAnchor, MultiLineText, Text } from '../../texts';
import { Tooltip } from '../../tooltip';

export const TokenPreview: FC = () => {
  const { currentSampleTokenRenderState } = useProjectBuilderContext();
  const { rendererMetadataStub, inputConstants: validInputConstants } =
    useProjectMetadata();
  const [focusedByteGroupingIndex, setFocusedByteGroupingIndex] = useState<
    null | number
  >(null);
  return (
    <DetailRowsContainer>
      <FlexEnds>
        <Text>
          <strong>PREVIEW</strong>
        </Text>
      </FlexEnds>
      <FlexEnds>
        <Label style={{ marginRight: 6 }}>BF CODE INPUT</Label>
        <Tooltip direction={'right'}>
          <MultiLineText>
            Bytes specific to{' '}
            <strong>token id {currentSampleTokenRenderState.tokenId}</strong>{' '}
            provided to the BrainFuck code readable via the <Code>,</Code>{' '}
            opcode.
          </MultiLineText>
        </Tooltip>
      </FlexEnds>
      {!!currentSampleTokenRenderState.tokenSeed ? (
        <GroupedBytes
          byteGroups={[{ numGroups: 64, groupBytesIn: 1 }]}
          showBytesLength={false}
          output={currentSampleTokenRenderState.tokenSeed}
          focusedByteGroupingIndex={focusedByteGroupingIndex}
          setFocusedByteGroupingIndex={setFocusedByteGroupingIndex}
        />
      ) : (
        <MultiLineText>{'-'}</MultiLineText>
      )}
      <FlexEnds>
        <Label>BF CODE OUTPUT</Label>
        <Tooltip direction={'right'}>
          <MultiLineText>
            Bytes produced by BrainFuck code is inputted to a renderer which
            interprets as a SVG or HTML.
          </MultiLineText>
        </Tooltip>
      </FlexEnds>
      <RawOutput />
      <FlexEnds>
        <Label>BF CODE OUTPUT (RENDERED)</Label>
        <LabelAnchor
          target={'_blank'}
          href={
            rendererMetadataStub?.address
              ? getEtherscanAddressUrl(rendererMetadataStub?.address)
              : '#'
          }
        >
          {rendererMetadataStub?.label}
        </LabelAnchor>
      </FlexEnds>
      <Render
        output={currentSampleTokenRenderState.codeOutput}
        rendererMetadata={rendererMetadataStub}
      />
      {!!rendererMetadataStub?.additionalMetadata && (
        <>
          <Label>RENDERER DESCRIPTION</Label>
          <MultiLineText>
            {rendererMetadataStub.additionalMetadata.description}
          </MultiLineText>
        </>
      )}
      <FlexEnds>
        <Flex>
          <Label style={{ marginRight: 6 }}>REQUIRED OUTPUT LENGTH</Label>
          <Tooltip direction={'left'}>
            <MultiLineText>
              Renderers typically expect an exact amount of output bytes from
              BrainFuck to correctly render a SVG or HTML; ensure your code
              output provides the required output length.
            </MultiLineText>
          </Tooltip>
        </Flex>
        <Text>{`${(() => {
          if (!rendererMetadataStub?.outSize) return '-';
          return prettifyCountableNumber(rendererMetadataStub.outSize);
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
    return <MultiLineText style={{ lineHeight: '22px' }}>{'-'}</MultiLineText>;
  }

  if (currentSampleTokenRenderState.codeOutput.status === 'error') {
    return (
      <MultiLineText style={{ lineHeight: '22px', color: '#FF5D5D' }}>
        {currentSampleTokenRenderState.codeOutput?.message}
      </MultiLineText>
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
          <MultiLineText style={{ color: '#FFC54D' }} key={`warning-row-${i}`}>
            {w}
          </MultiLineText>
        );
      })}
    </>
  );
};

const GroupedBytes: FC<{
  output: string;
  byteGroups?: RendererAdditionalMetadataByteGroup[];
  showBytesLength?: boolean;
  focusedByteGroupingIndex?: number | null;
  setFocusedByteGroupingIndex?: (index: number | null) => void;
}> = ({
  output,
  byteGroups,
  showBytesLength = true,
  focusedByteGroupingIndex,
  setFocusedByteGroupingIndex,
}) => {
  const groupedOutputBytesAndLabels = useMemo((): [
    string,
    string | undefined,
  ][] => {
    const groupedBytesAndLabels: [string, string | undefined][] = [];
    if (!!byteGroups && byteGroups.length !== 0) {
      for (const { numGroups, groupBytesIn, label } of byteGroups) {
        for (
          let x = 0, i = 2;
          i < output.length &&
          x < (numGroups === 'infinity' ? Infinity : numGroups);
          ++x
        ) {
          groupedBytesAndLabels.push([
            output.slice(i, i + groupBytesIn * 2),
            label,
          ]);
          i += groupBytesIn * 2;
        }
      }
    } else {
      groupedBytesAndLabels.push([output.slice(2), undefined]);
    }
    return groupedBytesAndLabels;
  }, [output, byteGroups]);

  return (
    <MultiLineText
      onMouseLeave={() => setFocusedByteGroupingIndex?.(null)}
      style={{
        position: 'relative',
        lineHeight: '22px',
        lineBreak:
          groupedOutputBytesAndLabels?.length === 1 ? 'anywhere' : undefined,
      }}
    >
      {(
        <>
          <HexStringHeaderHanger>0x</HexStringHeaderHanger>
          <GroupedBytesContainer>
            {groupedOutputBytesAndLabels.map((b, i) => {
              return (
                <GroupedBytesSpan
                  onMouseEnter={() => setFocusedByteGroupingIndex?.(i)}
                  key={`grouped-bytes-${i}`}
                >
                  {b[0]}{' '}
                </GroupedBytesSpan>
              );
            })}
          </GroupedBytesContainer>
          <span style={{ opacity: 0.2 }}>
            {showBytesLength ? `${(output.length - 2) / 2} BYTES` : ''}
            <strong>
              {focusedByteGroupingIndex !== null &&
              focusedByteGroupingIndex !== undefined
                ? ` • ${focusedByteGroupingIndex + 1} ${
                    groupedOutputBytesAndLabels[focusedByteGroupingIndex][1]
                      ? `(${groupedOutputBytesAndLabels[focusedByteGroupingIndex][1]})`
                      : ''
                  }`
                : undefined}
            </strong>
          </span>
        </>
      ) ?? '-'}
    </MultiLineText>
  );
};

const GroupedBytesSpan = styled.span``;

const GroupedBytesContainer = styled.span`
  > ${GroupedBytesSpan} + ${GroupedBytesSpan} {
    // margin-left: 4px;
  }
`;

const HexStringHeaderHanger = styled.span`
  position: absolute;
  padding-right: 8px;
  // top: 0;
  right: 100%;
  line-break: strict;
  color: rgba(0, 0, 0, 0.1);
`;
