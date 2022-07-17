import Link from 'next/link';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { TUTORIALS_MAP } from '.';
import { ROUTES } from '../../../constants/routes';
import { TutorialMetadata } from '../../../contexts/tutorial';
import { INVITE_LINKS } from '../../../data/discord';
import {
  useDefaultSeed,
  useSavedOrDefaultTutorialMetadata,
} from '../../../hooks/useDefaults';
import { useHydrateSave } from '../../../hooks/useHydrateSave';
import { RenderCodeOutputState } from '../../../types';
import { runBrainFuckCode } from '../../../utils/brainFuck';
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
            <Challenge />
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

const Challenge: FC = () => {
  const { parameters } = useSavedOrDefaultTutorialMetadata(
    useDefaultTutorialMetadata,
  );
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

  const challengeMetadata = useMemo((): Partial<TutorialMetadata> => {
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
        Write a Brainfuck algorithm that outputs every integer between{' '}
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

const useDefaultTutorialMetadata = (
  refresh?: any,
): Partial<TutorialMetadata> => {
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
