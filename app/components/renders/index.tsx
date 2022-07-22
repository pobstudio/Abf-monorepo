import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  usePriorityAccount,
  usePriorityChainId,
} from '../../connectors/priority';
import { CHAIN_ID, MAX_UINT } from '../../constants';
import {
  INCORRECT_CHAIN_ID,
  NO_CONNECTED_WALLET,
  PROPSSIZE_MISMATCH_ERROR_MESSAGE,
  RENDERER_NOT_FOUND,
} from '../../constants/errors';
import { useRendererContract } from '../../hooks/useContracts';
import { RenderCodeOutputState, RendererMetadataStub } from '../../types';
import { getHexStringNumBytes } from '../../utils/hex';
import { OFFLINE_RENDERERS } from '../../utils/renderers';
import { MultiLineText } from '../texts';

export const PlaceholderRender = styled.div`
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  position: relative;
`;

const RenderImage = styled.img`
  border: none;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  shape-rendering: crispEdges;
  image-rendering: pixelated;
`;

const RenderImageCover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  text-align: center;
  left: 0;
  right: 0;
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: center;
`;

const RenderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: rgba(0, 0, 0, 0.05);
  img,
  svg {
    width: 100%;
    height: 100%;
  }
`;

const RenderHtmlContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  shape-rendering: crispEdges;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export const Render: FC<{
  output: RenderCodeOutputState | undefined;
  rendererMetadata: RendererMetadataStub | undefined;
}> = ({ output, rendererMetadata }) => {
  const account = usePriorityAccount();
  const chainId = usePriorityChainId();
  const renderer = useRendererContract(rendererMetadata?.address);

  const [renderOutput, setRenderOutput] = useState<string | undefined>(
    undefined,
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  const [renderedBy, setRenderedBy] = useState<
    'local' | 'on-chain' | undefined
  >();
  const [renderAttributeKey, setRenderAttributeKey] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    if (output?.status !== 'success') {
      return;
    }
    const getRawSvgSrc = async () => {
      setErrorMessage(undefined);
      setRenderedBy(undefined);
      try {
        if (
          !!rendererMetadata?.name &&
          !!OFFLINE_RENDERERS[rendererMetadata.name]
        ) {
          setIsRenderLoading(false);
          const renderRaw = OFFLINE_RENDERERS[rendererMetadata.name].renderRaw(
            output.output,
          );
          setRenderOutput(
            `data:image/svg+xml;utf8,${encodeURIComponent(renderRaw)}`,
          );
          setRenderedBy('local');
          setRenderAttributeKey('image');
        } else if (!chainId) {
          throw new Error(NO_CONNECTED_WALLET);
        } else if (chainId !== CHAIN_ID) {
          throw new Error(INCORRECT_CHAIN_ID);
        } else if (
          !!renderer &&
          !!rendererMetadata?.propsSize &&
          !rendererMetadata?.propsSize.eq(MAX_UINT) &&
          rendererMetadata.propsSize.gt(getHexStringNumBytes(output.output))
        ) {
          throw new Error(PROPSSIZE_MISMATCH_ERROR_MESSAGE);
        } else if (!!renderer) {
          console.log('node render', renderer.address);
          setIsRenderLoading(true);
          const render = await renderer.render(output.output);
          const renderAttribute = await renderer.renderAttributeKey();
          setRenderOutput(render);
          setIsRenderLoading(false);
          setRenderedBy('on-chain');
          setRenderAttributeKey(renderAttribute);
        } else {
          throw new Error(RENDERER_NOT_FOUND);
        }
      } catch (e: any) {
        console.log(e.message);
        if (e.message.indexOf(PROPSSIZE_MISMATCH_ERROR_MESSAGE) !== -1) {
          setErrorMessage('OUTPUT BYTES NOT AT REQUIRED SIZE.');
        } else if (e.message.indexOf(INCORRECT_CHAIN_ID) !== -1) {
          setErrorMessage('INCORRECT CHAIN CONNECTED.');
          setRenderOutput(undefined);
        } else if (e.message.indexOf(NO_CONNECTED_WALLET) !== -1) {
          setErrorMessage('NO WALLET CONNECTED. CONNECT TO SEE PREVIEW.');
          setRenderOutput(undefined);
        } else if (e.message.indexOf(RENDERER_NOT_FOUND) !== -1) {
          setErrorMessage('RENDERER NOT FOUND ON-CHAIN.');
          setRenderOutput(undefined);
        } else {
          setErrorMessage(
            'RENDERER ERROR. CHECK CONSOLE LOGS FOR MORE DETAILS.',
          );
        }
      }
      setIsRenderLoading(false);
    };

    getRawSvgSrc();
  }, [account, output, rendererMetadata, renderer, chainId]);
  const isCoverOpened = useMemo(() => {
    return isRenderLoading || !!errorMessage;
  }, [isRenderLoading, errorMessage]);

  const imgSrc = useMemo(() => {
    if (!renderOutput) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" style="background:#F1F1F1"></svg>',
      )}`;
    }
    return renderOutput;
  }, [renderOutput, renderAttributeKey]);

  useEffect(() => {
    console.log('renderedBy', renderedBy);
    console.log('renderAttributeKey', renderAttributeKey);
  }, [renderedBy, renderAttributeKey]);

  if (renderAttributeKey === 'image') {
    return (
      <>
        <RenderContainer>
          <RenderImage src={imgSrc} />
          {isCoverOpened && (
            <RenderImageCover
              style={{
                background: !!renderOutput
                  ? 'rgba(255, 255, 255, 0.75)'
                  : 'rgba(0, 0, 0, 0)',
              }}
            >
              {errorMessage && <MultiLineText>{errorMessage}</MultiLineText>}
            </RenderImageCover>
          )}
        </RenderContainer>
      </>
    );
  }

  if (renderAttributeKey === 'animation_url') {
    return (
      <>
        <RenderContainer>
          <RenderHtmlContainer>
            <iframe
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts"
              frameBorder={0}
              srcDoc={imgSrc || 'data:text/html;utf-8,'}
            />
          </RenderHtmlContainer>
          {isCoverOpened && (
            <RenderImageCover
              style={{
                background: !!renderOutput
                  ? 'rgba(255, 255, 255, 0.75)'
                  : 'rgba(0, 0, 0, 0)',
              }}
            >
              {errorMessage && <MultiLineText>{errorMessage}</MultiLineText>}
            </RenderImageCover>
          )}
        </RenderContainer>
      </>
    );
  }

  return (
    <>
      <RenderContainer>
        <RenderImageCover
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          {!!renderAttributeKey && (
            <MultiLineText>{`"${renderAttributeKey}" is not recognized.`}</MultiLineText>
          )}
          {errorMessage && <MultiLineText>{errorMessage}</MultiLineText>}
        </RenderImageCover>
      </RenderContainer>
    </>
  );
};
