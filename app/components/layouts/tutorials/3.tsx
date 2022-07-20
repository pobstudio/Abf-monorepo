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
  const expectedOutputHexStr = `0xff0000ff0000ff0000ff0000ff0000ff0000ff0000ff0000ff00000000ff0000ff0000ff0000ff0000ff0000ffff0000ff00000000ff0000ff0000ff0000ff0000ff0000ffff0000ff00000000ff0000ff00ff0000ff000000ff0000ffff0000ff00000000ff0000ff00ff0000ff000000ff0000ffff0000ff00000000ff0000ff0000ff0000ff0000ff0000ffff0000ff00000000ff0000ff0000ff0000ff0000ff0000ffff0000ff0000ff0000ff0000ff0000ff0000ff0000ff0000ff0000`;
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
