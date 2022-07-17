import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TUTORIALS_MAP } from '.';
import { ROUTES } from '../../../constants/routes';
import { INVITE_LINKS } from '../../../data/discord';
import { useDefaultSeed } from '../../../hooks/useDefaults';
import { useHydrateSave } from '../../../hooks/useHydrateSave';
import { RenderCodeOutputState } from '../../../types';
import { runBrainFuckCode } from '../../../utils/brainFuck';
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

export const Tutorial1: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <div>
            <P>
              <B>ASSIGNMENT: {TUTORIALS_MAP[ROUTES.TRAIN[1]]}</B>
            </P>
            <P>
              <B>SUBJECT: ABF CORPS RECRUITMENT OF NEW MEMBERS</B>
            </P>
          </div>
          <div>
            <P>
              Alright f**k faces, today we're going to learn how to control a
              RENDERER via Brainfuck code. Every RENDERER is different and
              should have instructions on which bytes manipulate which part.
              Additionally, every RENDERER defines it's own input size.
            </P>
          </div>
          <div
            style={{
              margin: '50px 0',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          ></div>
          <Challenge />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

interface ChallengeMetadata {
  parameters: number[];
  code: string;
  seed: string;
}

const Challenge: FC = () => {
  const { parameters } = useSavedOrDefaultChallenge();
  const [code, setCode] = useState<string | undefined>(undefined);
  const output = useMemo((): RenderCodeOutputState | undefined => {
    if (!code) {
      return undefined;
    }
    try {
      const output = runBrainFuckCode(code, []);
      return {
        output,
        status: 'success',
        warnings: [],
      };
    } catch (e: any) {
      return {
        message: e.message,
        status: 'error',
      };
    }
  }, [code]);

  const challengeMetadata = useMemo((): Partial<ChallengeMetadata> => {
    return {
      parameters,
      code,
    };
  }, [parameters, code]);
  useHydrateSave(challengeMetadata);

  const expectedOutputHexStr = useMemo(() => {
    if (!parameters) {
      return undefined;
    }
    let hexStr = '0x';
    for (let i = parameters[0]; i <= parameters[1]; ++i) {
      hexStr += i.toString(16).padStart(2, '0');
    }
    return hexStr;
  }, [parameters]);
  const isButtonDisabled = useMemo(() => {
    if (output?.status !== 'success') {
      return true;
    }
    if (!expectedOutputHexStr) {
      return true;
    }
    return expectedOutputHexStr !== output.output;
  }, [expectedOutputHexStr, output]);

  const onSubmit = useCallback(() => {
    if (isButtonDisabled) {
      confirm('Answer is not correct.');
      return;
    }
    confirm(
      `Welcome. Here is the discord: ${INVITE_LINKS[0]}. Copy the FULL URL of this page to share how you did amongst the Corps!`,
    );
  }, [isButtonDisabled]);
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
        Write a Brainfuck algorithmn that outputs every integer between{' '}
        {parameters?.[0]} and {parameters?.[1] + ' '}
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

const useDefaultChallengeMetadata = (
  refresh?: any,
): Partial<ChallengeMetadata> => {
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

const useSavedOrDefaultChallenge = (): Partial<ChallengeMetadata> => {
  const defaultChallengeMetadata = useDefaultChallengeMetadata();

  const router = useRouter();

  const [hasHydrated, setHasHydrated] = useState(false);

  const [savedChallengeMetadata, setSavedChallengeMetadata] = useState<
    Partial<ChallengeMetadata>
  >({});
  useEffect(() => {
    if (hasHydrated) {
      return;
    }
    if (typeof router.query.save !== 'string') {
      return;
    }
    try {
      const save = router.query.save;
      const obj = JSON.parse(atob(save));
      if (Object.keys(obj).length !== 0) {
        setHasHydrated(true);
        setSavedChallengeMetadata({
          ...defaultChallengeMetadata,
          ...(obj as Partial<ChallengeMetadata>),
        });
        return;
      }
    } catch (e) {}
    setHasHydrated(true);
    setSavedChallengeMetadata(defaultChallengeMetadata);
  }, [router]);

  return useMemo(() => savedChallengeMetadata, [savedChallengeMetadata]);
};
