import { FC } from 'react';
import { useTutorialContext } from '../../../contexts/tutorial';
import { prettifyCountableNumber } from '../../../utils/hex';
import { getEtherscanAddressUrl, getIPFSUrl } from '../../../utils/urls';
import { GroupedBytes } from '../../bytes/groupedBytes';
import { DetailAnchorRow, DetailRowsContainer } from '../../details/rows';
import { Flex, FlexEnds } from '../../flexs';
import { Render } from '../../renders';
import { Label, LabelAnchor, P, Text } from '../../texts';
import { Tooltip } from '../../tooltip';

export const BasicRender: FC = () => {
  const { output, rendererMetadata } = useTutorialContext();
  return (
    <DetailRowsContainer>
      <FlexEnds>
        <Text>
          <strong>OUTPUT PREVIEW</strong>
        </Text>
      </FlexEnds>
      <Flex>
        <Label style={{ marginRight: 6 }}>BF CODE OUTPUT</Label>
        <Tooltip direction={'left'}>
          <P>
            Bytes produced by Brainfuck code is inputted to a renderer which
            interprets as a SVG or HTML.
          </P>
        </Tooltip>
      </Flex>
      <RawOutput />
      <FlexEnds>
        <Label>BF CODE OUTPUT (RENDERED)</Label>
        <LabelAnchor
          target={'_blank'}
          href={
            rendererMetadata?.address
              ? getEtherscanAddressUrl(rendererMetadata?.address)
              : '#'
          }
        >
          {rendererMetadata?.label}
        </LabelAnchor>
      </FlexEnds>
      <Render output={output} rendererMetadata={rendererMetadata} />
      {!!rendererMetadata?.additionalMetadata && (
        <>
          <Label>RENDERER DESCRIPTION</Label>
          <P>{rendererMetadata.additionalMetadata.description}</P>
        </>
      )}
      <FlexEnds>
        <Flex>
          <Label style={{ marginRight: 6 }}>REQUIRED OUTPUT LENGTH</Label>
          <Tooltip direction={'left'}>
            <P>
              Renderers typically expect an exact amount of output bytes from
              Brainfuck to correctly render a SVG or HTML; ensure your code
              output provides the required output length.
            </P>
          </Tooltip>
        </Flex>
        <Text>{`${(() => {
          if (!rendererMetadata?.propsSize) return '-';
          return prettifyCountableNumber(rendererMetadata.propsSize);
        })()} BYTES`}</Text>
      </FlexEnds>
      {!!rendererMetadata?.additionalMetadataURI && (
        <DetailAnchorRow
          href={getIPFSUrl(rendererMetadata.additionalMetadataURI)}
        >
          {['RENDERER DOCUMENTATION', 'IPFS']}
        </DetailAnchorRow>
      )}
    </DetailRowsContainer>
  );
};

const RawOutput: FC = () => {
  const {
    output,
    currentSampleTokenDebugState,
    setCurrentSampleTokenDebugState,
    rendererMetadata,
  } = useTutorialContext();

  console.log(output, 'raw output');

  if (!output) {
    return <P>{'-'}</P>;
  }

  if (output.status === 'error') {
    return <P style={{ color: '#FF5D5D' }}>{output.message}</P>;
  }

  return (
    <>
      <GroupedBytes
        output={output.output}
        byteGroups={
          rendererMetadata?.additionalMetadata?.previewOptions?.byteGroups
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
      {output?.warnings?.map((w, i) => {
        return (
          <P style={{ color: '#FFC54D' }} key={`warning-row-${i}`}>
            {w}
          </P>
        );
      })}
    </>
  );
};
