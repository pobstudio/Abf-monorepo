import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRendererContract } from '../../hooks/useContracts';
import { RendererMetadataStub } from '../../types';

export const PlaceholderRender = styled.div`
  background: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 0;
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
`;

const RenderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: rgba(0, 0, 0, 0.05);
`;

export const Render: FC<{
  output: [string, 'error' | 'success'] | undefined;
  rendererMetadata: RendererMetadataStub | undefined;
}> = ({ output, rendererMetadata }) => {
  const renderer = useRendererContract(rendererMetadata?.address);
  const [rawSvgSrc, setRawSvgSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (output?.[1] !== 'success') {
      return;
    }
    if (!renderer) {
      return;
    }
    const getRawSvgSrc = async () => {
      try {
        const renderRaw = await renderer.renderRaw(output[0]);
        setRawSvgSrc(renderRaw);
      } catch (e) {
        return;
      }
    };

    getRawSvgSrc();
  }, [output, renderer]);
  const imgSrc = useMemo(() => {
    if (!rawSvgSrc)
      return `data:image/svg+xml;utf8,${encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" style="background:#F1F1F1"></svg>',
      )}`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(rawSvgSrc)}`;
  }, [rawSvgSrc]);
  console.log('rawSvgSrc', rawSvgSrc, imgSrc);
  return (
    <RenderContainer>
      <RenderImage width={'100%'} height={'100%'} src={imgSrc} />
    </RenderContainer>
  );
};
