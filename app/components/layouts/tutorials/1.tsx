import { deployments } from '@abf-monorepo/protocol';
import Link from 'next/link';
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
import { useRendererMetadataStubByProvider } from '../../../hooks/useRenderer';
import { GroupedBytesWithHoverState } from '../../bytes/groupedBytes';
import { DetailRowsContainer } from '../../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { FlexEnds } from '../../flexs';
import { PrimaryButton } from '../../inputs/button';
import { InputWell, TextArea } from '../../inputs/input';
import { B, Label, LabelAnchor, P } from '../../texts';
import { BasicRender } from './renderTutorial';

const TUTORIAL_1_METADATA = (refresh?: any): Partial<TutorialMetadata> => {
  const expectedOutputHexStr = useMemo(() => {
    let hexStr = '0x';
    for (let i = 0; i <= 20; ++i) {
      hexStr += i.toString(16).padStart(2, '0');
    }
    return hexStr;
  }, []);
  return useMemo(
    () => ({
      code: '',
      expectedOutputHexStr,
    }),
    [expectedOutputHexStr],
  );
};

export const Tutorial1: React.FC = () => {
  const { output } = useTutorialContext();
  const rendererMetadata = useRendererMetadataStubByProvider(
    deployments[CHAIN_ID].renderers.dotMatrix,
  );
  return (
    <>
      <TwoColumnContainer>
        <div>
          <TwoColumnTutorialContainer>
            <Jumbotron />
            <TutorialsProvider
              getDefaultTutorialMetadata={TUTORIAL_1_METADATA}
              reward={`Welcome. Here is the discord: ${INVITE_LINKS[0]}. Copy the FULL URL of this page to share how you did amongst the Corps!`}
            >
              <Tutorial />
            </TutorialsProvider>
          </TwoColumnTutorialContainer>
        </div>
        <div>
          <TwoColumnContentContainer
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <BasicRender
              output={output}
              rendererMetadataStub={rendererMetadata}
            />
          </TwoColumnContentContainer>
        </div>
      </TwoColumnContainer>
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

const Tutorial: FC = () => {
  const {
    tutorialMetadata,
    code,
    setCode,
    output,
    expectedOutputHexStr,
    onSubmit,
    isButtonDisabled,
  } = useTutorialContext();
  return (
    <>
      <FlexEnds>
        <Label>EDITOR</Label>
        <Link href={ROUTES.DOCS.BRAINFUCK} passHref>
          <LabelAnchor target="_blank" rel="noopener noreferrer">
            BRAINFUCK DOCS
          </LabelAnchor>
        </Link>
      </FlexEnds>
      <InputWell>
        <TextArea
          value={code ?? ''}
          onChange={(e) => setCode(e.target.value)}
          style={{ minHeight: 240 }}
          placeholder="-[--->+<]>-.[---->+++++<]>-.+.++++++++++.+[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.-------------.[--->+<]>---..+++++.-[---->+<]>++.+[->+++<]>.++++++++++++..---.[-->+<]>--------."
        />
      </InputWell>
      <Label>OUTPUT</Label>
      {(() => {
        if (output?.status === 'error') {
          return <P style={{ color: '#FF5D5D' }}>{output.message}</P>;
        }
        return (
          <GroupedBytesWithHoverState
            output={output?.output}
            byteGroups={[
              { numGroups: 'infinity', groupBytesIn: 1, label: 'Integer' },
            ]}
            showBytesLength
          />
        );
      })()}
      <Label>EXPECTED OUTPUT</Label>
      <GroupedBytesWithHoverState
        output={expectedOutputHexStr}
        byteGroups={[
          { numGroups: 'infinity', groupBytesIn: 1, label: 'Integer' },
        ]}
        showBytesLength
      />
      <PrimaryButton onClick={onSubmit} disabled={isButtonDisabled}>
        SUBMIT ANSWER
      </PrimaryButton>
    </>
  );
};
