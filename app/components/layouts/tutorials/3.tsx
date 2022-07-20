import { deployments } from '@abf-monorepo/protocol';
import React, { FC, useMemo } from 'react';
import { RewardModal, TUTORIALS_MAP, TwoColumnTutorialContainer } from '.';
import { CHAIN_ID } from '../../../constants';
import { ROUTES } from '../../../constants/routes';
import {
  TutorialMetadata,
  TutorialsProvider,
  useTutorialContext,
} from '../../../contexts/tutorial';
import { DetailRowsContainer } from '../../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { PrimaryButton } from '../../inputs/button';
import { B, Label, P } from '../../texts';
import { BasicEditor } from './editor';
import { BasicRender } from './render';

const TUTORIAL_REWARD = `https://pin.abf.dev/ipfs/QmWofFdyhjKhzkYEU7LA26AnGv8Ww1qqqgRHMpEptqHQ63`;

const TUTORIAL_METADATA = (refresh?: any): Partial<TutorialMetadata> => {
  const expectedOutputHexStr = `0xbfbebdbcbbbab9b8b7b6b5b4b3b2b1b0afaeadacabaaa9a8a7a6a5a4a3a2a1a09f9e9d9c9b9a999897969594939291908f8e8d8c8b8a898887868584838281807f7e7d7c7b7a797877767574737271706f6e6d6c6b6a696867666564636261605f5e5d5c5b5a595857565554535251504f4e4d4c4b4a494847464544434241403f3e3d3c3b3a393837363534333231302f2e2d2c2b2a292827262524232221201f1e1d1c1b1a191817161514131211100f0e0d0c0b0a09080706050403020100`;
  return useMemo(
    () => ({
      code: '',
      expectedOutputHexStr,
    }),
    [expectedOutputHexStr],
  );
};

export const Tutorial3: React.FC = () => {
  return (
    <>
      <RewardModal reward={TUTORIAL_REWARD} />
      <TutorialsProvider
        renderer={deployments[CHAIN_ID].renderers.pixelGrid8}
        getDefaultTutorialMetadata={TUTORIAL_METADATA}
        reward={TUTORIAL_REWARD}
      >
        <TwoColumnContainer>
          <div>
            <TwoColumnTutorialContainer>
              <Jumbotron />

              <Editor />
            </TwoColumnTutorialContainer>
          </div>
          <div>
            <TwoColumnContentContainer
              style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
            >
              <BasicRender />
            </TwoColumnContentContainer>
          </div>
        </TwoColumnContainer>
      </TutorialsProvider>
    </>
  );
};

const Jumbotron: FC = () => {
  return (
    <DetailRowsContainer>
      <P>
        <B>ASSIGNMENT: {TUTORIALS_MAP[ROUTES.TRAIN[3]]}</B>
      </P>
      <P>
        <B>SUBJECT: ABFC NEW PERSONNEL TRAINING - MATERIAL 003</B>
      </P>
      <P>
        Beep.boop.bop you guys are scrubs {`<__>`}. Ready to learn some basic
        b*tch color theory?
      </P>
      <P>
        The f**kers who designed the RGB model are rolling in their graves. Use
        Brainfuck to construct 3 byte sequences where each byte corresponds to
        RED, GREEN, and BLUE respectively.
      </P>

      <Label>CHALLENGE</Label>
      <P>
        <B>
          Create an image where the borders of the pixelGrid are RED [#FF0000],
          the center is a GREEN square [#00FF00, 2x2], and the remaining area is
          BLUE [#0000FF].
        </B>
      </P>
    </DetailRowsContainer>
  );
};

const Editor: FC = () => {
  const { onSubmit, isButtonDisabled } = useTutorialContext();
  return (
    <>
      <BasicEditor />
      <PrimaryButton onClick={onSubmit} disabled={isButtonDisabled}>
        SUBMIT ANSWER
      </PrimaryButton>
    </>
  );
};
