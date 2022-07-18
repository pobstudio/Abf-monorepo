import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import { TUTORIALS_MAP } from '.';
import { ROUTES } from '../../../constants/routes';
import {
  TutorialMetadata,
  TutorialsProvider,
  useTutorialContext,
} from '../../../contexts/tutorial';
import { INVITE_LINKS } from '../../../data/discord';
import { useDefaultSeed } from '../../../hooks/useDefaults';
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

export const Tutorial1: React.FC = () => {
  return (
    <>
      <TwoColumnContainer>
        <div>
          <TwoColumnContentContainer>
            <Jumbotron />
            {/* <BrainFuckEditor /> */}
            <TutorialsProvider
              getDefaultTutorialMetadata={defaultTutorialMetadata}
              reward={`Welcome. Here is the discord: ${INVITE_LINKS[0]}. Copy the FULL URL of this page to share how you did amongst the Corps!`}
            >
              <Tutorial />
            </TutorialsProvider>
          </TwoColumnContentContainer>
        </div>
        <div>
          <TwoColumnContentContainer
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            {/* <TokenPreview /> */}
            wiggle
          </TwoColumnContentContainer>
        </div>
      </TwoColumnContainer>
    </>
  );
};

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
        The task is simple: change the dots in all 4 corners to have a radius of
        10. All other dots should have a radius of 1.
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
      <div>
        <P>
          <B>
            If this interests you, please complete the following Brainfuck
            challenge for entry.
          </B>
        </P>
      </div>
      <Label>CHALLENGE</Label>
      <P>
        Write a Brainfuck algorithm that outputs every integer between{' '}
        {tutorialMetadata?.parameters?.[0]} and{' '}
        {tutorialMetadata?.parameters?.[1] + ' '}
        (inclusive).
      </P>
      <FlexEnds>
        <Label>ANSWER</Label>
        <Link href={ROUTES.DOCS.BRAINFUCK} passHref>
          <LabelAnchor>BRAINFUCK DOCS</LabelAnchor>
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

const defaultTutorialMetadata = (refresh?: any): Partial<TutorialMetadata> => {
  const [start, end] = useMemo(() => {
    const delta = Math.round((0.5 + Math.random() * 0.5) * 25);
    const start = Math.round(Math.random() * 25);
    return [start, start + delta];
  }, []);
  const seed = useDefaultSeed();
  return useMemo(() => {
    return {
      parameters: [start, end],
      code: '',
      seed,
    };
  }, [seed, start, end]);
};
