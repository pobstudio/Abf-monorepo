import { deployments } from '@abf-monorepo/protocol';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { TUTORIALS_MAP } from '.';
import { CHAIN_ID } from '../../../constants';
import { ROUTES } from '../../../constants/routes';
import {
  TutorialMetadata,
  TutorialsProvider,
  useTutorialContext,
} from '../../../contexts/tutorial';
import { INVITE_LINKS } from '../../../data/discord';
import { DetailRowsContainer } from '../../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { PrimaryButton } from '../../inputs/button';
import { B, Label, P } from '../../texts';
import { BasicEditor } from './editor';
import { BasicRender } from './render';

const TUTORIAL_1_METADATA = (refresh?: any): Partial<TutorialMetadata> => {
  const expectedOutputHexStr =
    '0x000000000000000000000e0e0e0e0e0e0e1919191919191919191919191919272727272727273232323232323232323232323232404040404040404b4b4b4b4b4b4b4b4b4b4b4b4b4b595959595959596464646464646464646464646464727272727272727d7d7d7d7d7d7d7d7d7d7d7d7d7d8b8b8b8b8b8b8b9696969696969696969696969696a4a4a4a4a4a4a4afafafafafafafafafafafafafafbdbdbdbdbdbdbdc8c8c8c8c8c8c8c8c8c8c8c8c8c8d6d6d6d6d6d6d6e1e1e1e1e1e1e1e1e1e1e1e1e1e1efefefefefefeffafafafafafafafafafafafafafa080808080808081313131313131313131313131313212121212121212c2c2c2c2c2c2c2c';
  return useMemo(
    () => ({
      code: '',
      expectedOutputHexStr,
    }),
    [expectedOutputHexStr],
  );
};

export const Tutorial1: React.FC = () => {
  return (
    <>
      <TutorialsProvider
        renderer={deployments[CHAIN_ID].renderers.dotMatrix}
        getDefaultTutorialMetadata={TUTORIAL_1_METADATA}
        reward={`Welcome. Here is the discord: ${INVITE_LINKS[0]}. Copy the FULL URL of this page to share how you did amongst the Corps!`}
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

const TwoColumnTutorialContainer = styled(TwoColumnContentContainer)`
  > * + * {
    margin-top: 25px !important;
    width: 100%;
  }
`;

const Jumbotron: FC = () => {
  return (
    <DetailRowsContainer>
      <P>
        <B>ASSIGNMENT: {TUTORIALS_MAP[ROUTES.TRAIN[1]]}</B>
      </P>
      <P>
        <B>SUBJECT: NEW MEMBER ONBOARDING - TRAINING MATERIAL 001</B>
      </P>
      <P>
        Alright f**k faces, today we're going to learn how to control a RENDERER
        via Brainfuck code.
      </P>

      <P>
        <B>
          If this interests you, please complete the following Brainfuck
          challenge for entry.
        </B>
      </P>

      <Label>CHALLENGE</Label>
      <P>
        Change the dots in all 4 corners to have a radius of 10. All other dots
        should have a radius of 1.
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
