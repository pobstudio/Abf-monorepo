import { FC } from 'react';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
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
      <MultiLineText style={{ lineHeight: '22px', lineBreak: 'anywhere' }}>
        {currentSampleTokenRenderState.tokenSeed ?? '-'}
      </MultiLineText>
      <FlexEnds>
        <Label>OUTPUT (BYTES)</Label>
        <Tooltip direction={'right'}>
          <MultiLineText>
            Bytes produced by BrainFuck code is inputted to a renderer which
            interprets as a SVG or HTML.
          </MultiLineText>
        </Tooltip>
      </FlexEnds>
      <MultiLineText
        style={{
          lineHeight: '22px',
          lineBreak: 'anywhere',
          color:
            currentSampleTokenRenderState.codeOutput?.[1] === 'error'
              ? '#FF5D5D'
              : 'black',
        }}
      >
        {(
          <>
            {currentSampleTokenRenderState.codeOutput?.[0]}{' '}
            <span style={{ opacity: 0.2 }}>
              {currentSampleTokenRenderState.codeOutput?.[1] === 'success'
                ? `${
                    (currentSampleTokenRenderState.codeOutput?.[0].length - 2) /
                    2
                  } BYTES`
                : '-'}
            </span>
          </>
        ) ?? '-'}
      </MultiLineText>
      <FlexEnds>
        <Label>OUTPUT (IMAGE)</Label>
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
        <Text>{`${
          rendererMetadataStub?.outSize.toString() ?? '-'
        } BYTES`}</Text>
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
