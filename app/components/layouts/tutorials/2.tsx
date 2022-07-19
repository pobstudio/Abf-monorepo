import { deployments } from '@abf-monorepo/protocol';
import React, { FC, useMemo } from 'react';
import { TUTORIALS_MAP, TwoColumnTutorialContainer } from '.';
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
import { BasicModal } from '../../modal';
import { B, Label, P } from '../../texts';
import { BasicEditor } from './editor';
import { BasicRender } from './render';

const TUTORIAL_2_REWARD = `(pin.abf.dev) /ipfs/QmWofFdyhjKhzkYEU7LA26AnGv8Ww1qqqgRHMpEptqHQ63`;

const TUTORIAL_2_METADATA = (refresh?: any): Partial<TutorialMetadata> => {
  const expectedOutputHexStr = `0x
    000102030405060708090a0b0c0d0e0f
    101112131415161718191a1b1c1d1e1f
    202122232425262728292a2b2c2d2e2f
    303132333435363738393a3b3c3d3e3f
    404142434445464748494a4b4c4d4e4f
    505152535455565758595a5b5c5d5e5f
    606162636465666768696a6b6c6d6e6f
    707172737475767778797a7b7c7d7e7f
    808182838485868788898a8b8c8d8e8f
    909192939495969798999a9b9c9d9e9f
    a0a1a2a3a4a5a6a7a8a9aaabacadaeaf
    b0b1b2b3b4b5b6b7b8b9babbbcbdbebf
    c0c1c2c3c4c5c6c7c8c9cacbcccdcecf
    d0d1d2d3d4d5d6d7d8d9dadbdcdddedf
    e0e1e2e3e4e5e6e7e8e9eaebecedeeef
    f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff`;
  return useMemo(
    () => ({
      code: '',
      expectedOutputHexStr,
    }),
    [expectedOutputHexStr],
  );
};

export const Tutorial2: React.FC = () => {
  return (
    <>
      <BasicModal>
        <Label>
          {`--[----->+<]>---.++++++++++++.-.-------.+++++++++++.+++[->+++<]>++.SUCCESS--[--->+<]>-.+.---------.-----------.--[--->+<]>-.-----------.++++++.-.+++++.`}
        </Label>
        <P style={{ marginTop: 25 }}>{TUTORIAL_2_REWARD}</P>
      </BasicModal>
      <TutorialsProvider
        renderer={deployments[CHAIN_ID].renderers.monoPixelGrid16}
        getDefaultTutorialMetadata={TUTORIAL_2_METADATA}
        reward={TUTORIAL_2_REWARD}
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
        <B>ASSIGNMENT: {TUTORIALS_MAP[ROUTES.TRAIN[2]]}</B>
      </P>
      <P>
        <B>SUBJECT: ABFC NEW PERSONNEL TRAINING - MATERIAL 002</B>
      </P>
      <P>
        I bet you had a good time with the last assignment huh? I bet that
        really f**king tickled you. Time to step your shit up.
      </P>
      <P>
        The purpose of this exercise is to understand how to LOOP. Figure out
        how to count upwards. It's a real pain in the ass.
      </P>

      <Label>CHALLENGE</Label>
      <P>
        <B>
          Create a perfect gradient every pixel where: NEXT_VALUE = PREV_VALUE +
          1. Start at BLACK [0x00] and end at WHITE [0xFF].
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
