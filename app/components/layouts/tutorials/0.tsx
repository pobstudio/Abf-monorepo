import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import { RewardModal, TUTORIALS_MAP } from '.';
import { DISCORD_LINK } from '../../../constants';
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
  OneColumnContainer,
  OneColumnContentContainer,
} from '../../divs/oneColumn';
import { FlexEnds } from '../../flexs';
import { PrimaryButton } from '../../inputs/button';
import { InputWell, TextArea } from '../../inputs/input';
import { B, Label, LabelAnchor, P } from '../../texts';

const TUTORIAL_0_METADATA = (refresh?: any): Partial<TutorialMetadata> => {
  const [start, end] = useMemo(() => {
    const delta = Math.round((0.5 + Math.random() * 0.5) * 25);
    const start = Math.round(Math.random() * 25);
    return [start, start + delta];
  }, []);
  const seed = useDefaultSeed();
  const expectedOutputHexStr = useMemo(() => {
    if (!start || !end) {
      return undefined;
    }
    let hexStr = '0x';
    for (let i = start; i <= end; ++i) {
      hexStr += i.toString(16).padStart(2, '0');
    }
    return hexStr;
  }, [start, end]);
  return useMemo(() => {
    return {
      parameters: [start, end],
      code: '',
      seed,
      expectedOutputHexStr,
    };
  }, [seed, start, end]);
};

export const Recruitment: React.FC = () => {
  return (
    <>
      <RewardModal reward={DISCORD_LINK} />
      <OneColumnContainer>
        <OneColumnContentContainer>
          <DetailRowsContainer>
            <div>
              <P>
                <B>ASSIGNMENT: {TUTORIALS_MAP[ROUTES.TRAIN[0]]}</B>
              </P>
              <P>
                <B>SUBJECT: ABF CORPS RECRUITMENT OF NEW MEMBERS</B>
              </P>
            </div>
            <div>
              <P>
                In its current infancy, ABF is not revealed to the mass public,
                but the protocol is <B>alive and humming.</B> We are in need of
                new Corps members.
              </P>
            </div>
            <div>
              <P>
                The ABF Corps is the steward of the <B>ABF protocol</B>, but do
                not be confused. The Corps is NOT a DAO. We are not the owners
                of the protocol (fuck fee extractors), simply its primary users,
                artists, and researchers.
              </P>
            </div>
            <div>
              <P>Our goal is to make ABF flourish.</P>
            </div>
            <div>
              <P>
                <B>Joining the Corps grants:</B> the ABF Discord, the latest
                developments around ABF, and the opportunity to shape ABF's
                future.
              </P>
            </div>
            <div
              style={{
                margin: '50px 0',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            ></div>
            <TutorialsProvider
              getDefaultTutorialMetadata={TUTORIAL_0_METADATA}
              reward={`Welcome. Here is the discord: ${INVITE_LINKS[0]}. Copy the FULL URL of this page to share how you did amongst the Corps!`}
            >
              <Tutorial />
            </TutorialsProvider>
          </DetailRowsContainer>
        </OneColumnContentContainer>
      </OneColumnContainer>
    </>
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
            If this interests you, please complete the following Brainfuck!
            challenge for entry.
          </B>
        </P>
      </div>
      <Label>CHALLENGE</Label>
      <P>
        Write a Brainfuck! algorithm that outputs every integer between{' '}
        {tutorialMetadata?.parameters?.[0]} and{' '}
        {tutorialMetadata?.parameters?.[1] + ' '}
        (inclusive).
      </P>
      <FlexEnds>
        <Label>ANSWER</Label>
        <Link href={ROUTES.DOCS.BRAINFUCK} passHref>
          <LabelAnchor target="_blank" rel="noopener noreferrer">
            BRAINFUCK! DOCS
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
