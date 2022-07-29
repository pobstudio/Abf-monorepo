import { deployments } from '@abf-monorepo/protocol';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { CHAIN_ID, PROD_LINK } from '../../../constants';
import { ROUTES } from '../../../constants/routes';
import { useMinimizedProjectMetadata } from '../../../hooks/useDefaults';
import { useEncodedObject } from '../../../hooks/useHydrateSave';
import { useModalStore } from '../../../stores/modal';
import { ProjectMetadata } from '../../../types';
import { createTemplateInsert } from '../../../utils/brainFuck/template/constants';
import { DetailRowsContainer } from '../../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../../divs/oneColumn';
import { Flex, FlexEnds } from '../../flexs';
import { ArrowIcon } from '../../icons/arrow';
import { PrimaryButton, TertiaryButton } from '../../inputs/button';
import { FileInput, InputWell } from '../../inputs/input';
import { BasicModal } from '../../modal';
import { H1, Label, Text } from '../../texts';

const MAX_IMAGE_SIZE = 4_000;

const HiddenCanvas = styled.canvas`
  visibility: hidden;
  width: 0;
  height: 0;
`;
export const PixelArtTool: React.FC = () => {
  const [files, setFiles] = useState<FileList | undefined | null>(undefined);

  const [code, setCode] = useState<string | undefined>(undefined);

  const [size, setSize] = useState<8 | 16 | 24>(8);

  const projectMetadata = useMemo(() => {
    if (!code) {
      return {};
    }
    return {
      code,
      renderer: deployments[CHAIN_ID].renderers[`pixelGrid${size}`],
    } as Partial<ProjectMetadata>;
  }, [code, size]);

  const encodedProjectMetadata = useEncodedObject(
    useMinimizedProjectMetadata(projectMetadata),
  );
  const setIsGenericModalOpen = useModalStore((s) => s.setIsGenericModalOpen);
  useEffect(() => {
    if (!encodedProjectMetadata) {
      return;
    }
    setIsGenericModalOpen(true);
  }, [encodedProjectMetadata]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isValidFile = useMemo(() => {
    console.log(files);
    if (!files) {
      return false;
    }
    if (files.length !== 1) {
      return false;
    }
    if (files[0].type !== 'image/png') {
      return false;
    }
    if (files[0].size > MAX_IMAGE_SIZE) {
      return false;
    }
    return true;
  }, [files]);

  const onGetImageData = useCallback(() => {
    if (files?.length !== 1) {
      return;
    }

    if (!canvasRef.current) {
      return;
    }
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      if (!canvasRef.current) {
        return;
      }
      const context = canvasRef.current.getContext('2d');
      if (!context) {
        return;
      }
      context.drawImage(img, 0, 0);
      const { data } = context.getImageData(0, 0, size, size);
      let hexStr = '';
      for (let i = 0; i < data.length; i += 4) {
        hexStr += data[i].toString(16).padStart(2, '0');
        hexStr += data[i + 1].toString(16).padStart(2, '0');
        hexStr += data[i + 2].toString(16).padStart(2, '0');
      }
      setCode(createTemplateInsert('logValue', [hexStr]));
    };
    const fr = new FileReader();
    fr.onload = () => {
      img.src = fr.result as string;
    };
    fr.readAsDataURL(files[0]);
  }, [canvasRef, files, size]);

  return (
    <>
      <OneColumnContainer>
        <OneColumnContentContainer>
          <DetailRowsContainer>
            <H1>PIXEL ART TO BF</H1>
            <Label>CONVERT ANY PIXEL ART TO A VALID PIECE OF BRAINFUCK!</Label>
            <InputWell>
              <FileInput onChange={(e) => setFiles(e.target.files)} />
            </InputWell>
            <Label>SELECT PIXEL ART SIZE (???x???)</Label>
            <Flex>
              <TertiaryButton
                onClick={() => setSize(8)}
                style={{ background: size === 8 ? '#e0e0e0' : '' }}
              >
                {'8x8'}
              </TertiaryButton>
              <TertiaryButton
                onClick={() => setSize(16)}
                style={{
                  background: size === 16 ? '#e0e0e0' : '',
                  margin: '0 12px',
                }}
              >
                {'16x16'}
              </TertiaryButton>
              <TertiaryButton
                onClick={() => setSize(24)}
                style={{ background: size === 24 ? '#e0e0e0' : '' }}
              >
                {'24x24'}
              </TertiaryButton>
            </Flex>
            <PrimaryButton onClick={onGetImageData} disabled={!isValidFile}>
              GET BUILD LINK FOR NFT
            </PrimaryButton>
            <HiddenCanvas ref={canvasRef} />
          </DetailRowsContainer>
        </OneColumnContentContainer>
      </OneColumnContainer>
      <SuccessModal encodedProjectMetadata={encodedProjectMetadata} />
    </>
  );
};

const SuccessModal: React.FC<{ encodedProjectMetadata?: string | null }> = ({
  encodedProjectMetadata,
}) => {
  const router = useRouter();
  const setIsGenericModalOpen = useModalStore((s) => s.setIsGenericModalOpen);
  return (
    <>
      <BasicModal>
        <Label>
          {`+[----->+++<]>++.++++CREATED+.++++++.-----.[--->+<]>-----.---[->++++<]SOMETHING>.------------.---.--[--->+<]>-.[->+++<]>++.[--->+<]>----.-------NEW--.--.+.++++++++++++.[---->+<]>+++.++[--->++<]>.---.--.+.++++++++++++.`}
        </Label>
        <FlexEnds style={{ marginTop: 24 }}>
          <Label>BUILD LINK</Label>
          <Text>
            {PROD_LINK}?save={encodedProjectMetadata?.slice(0, 10)}...
          </Text>
        </FlexEnds>
        <TertiaryButton
          style={{ marginTop: 24 }}
          onClick={() => {
            router.push(`${ROUTES.BUILDER}?save=${encodedProjectMetadata}`);
            setIsGenericModalOpen(false);
          }}
        >
          VIEW BUILD{' '}
          <ArrowIcon
            style={{
              marginLeft: 4,
              transform: 'rotate(180deg) translateY(-1px)',
            }}
          />
        </TertiaryButton>
      </BasicModal>
    </>
  );
};
