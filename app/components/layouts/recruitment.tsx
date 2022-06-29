import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { INVITE_LINKS } from '../../data/discord';
import { useDefaultSeed } from '../../hooks/useDefaults';
import { useHydrateSave } from '../../hooks/useHydrateSave';
import { RenderCodeOutputState } from '../../types';
import { runBrainFuckCode } from '../../utils/brainFuck';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { FlexEnds } from '../flexs';
import { PrimaryButton } from '../inputs/button';
import { InputWell, TextArea } from '../inputs/input';
import { Label, LabelAnchor, MultiLineText, Text } from '../texts';
import { GroupedBytes } from './projectBuilder/tokenPreview';

export const Recruitment: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <Jumbotron />
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

const Jumbotron: React.FC = () => {
  return (
    <DetailRowsContainer>
      <div>
        <JumbotronText>
          <strong>FROM: 001 (BOARD MEMBER)</strong>
        </JumbotronText>
        {/* <JumbotronText>
          <strong>TO: XXX</strong>
        </JumbotronText> */}
        <JumbotronText>
          <strong>SUBJECT: ABF CORP RECRUIMENT OF NEW MEMBERS</strong>
        </JumbotronText>
      </div>
      <div>
        <JumbotronText>
          In its current infancy, ABF is not revealed to the mass public, but
          the protocol is <strong>alive and humming.</strong> We are in need of
          new corp members.
        </JumbotronText>
      </div>
      <div>
        <JumbotronText>
          The ABF Corp is the steward of the <strong>ABF protocol</strong>, but
          do not be confused. The corp is NOT a DAO. We are not the owners of
          the protocol (fuck fee extractors), simply its primary users, artists,
          and researchers.
        </JumbotronText>
      </div>
      <div>
        <JumbotronText>Our goal is to make ABF flourish.</JumbotronText>
      </div>
      <div>
        <JumbotronText>
          <strong>Joining the corp grants:</strong> access to the early ABF
          protocol build, the Corp's discord, and the opportunity to shape ABF's
          future.
        </JumbotronText>
      </div>
      <div
        style={{ margin: '82px 0', borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
      ></div>
      <Challenge />
    </DetailRowsContainer>
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
  const [focusedByteGroupingIndex, setFocusedByteGroupingIndex] = useState<
    null | number
  >(null);
  const [
    focusedExpectedOutputByteGroupingIndex,
    setFocusedExpectedOutputByteGroupingIndex,
  ] = useState<null | number>(null);

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
      `Welcome. Here is the discord: ${INVITE_LINKS[0]}. Copy the FULL URL of this page. You will need it for verification in discord.`,
    );
  }, [isButtonDisabled]);
  return (
    <>
      <div>
        <JumbotronText>
          <strong>
            If this interests you, please complete the following BrainFuck
            challenge for entry.
          </strong>
        </JumbotronText>
      </div>
      <Label>CHALLENGE</Label>
      <MultiLineText>
        Write a BrainFuck algorithmn that outputs every integer between{' '}
        {parameters?.[0]} and {parameters?.[1] + ' '}
        (inclusive).
      </MultiLineText>
      <FlexEnds>
        <Label>ANSWER</Label>
        <LabelAnchor>BRAINFUCK DOCS</LabelAnchor>
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
        if (!output) {
          return <Text>-</Text>;
        }
        if (output.status === 'error') {
          return <Text style={{ color: '#FF5D5D' }}>{output.message}</Text>;
        }
        return (
          <GroupedBytes
            output={output.output}
            byteGroups={[
              { numGroups: 'infinity', groupBytesIn: 1, label: 'Integer' },
            ]}
            showBytesLength
            focusedByteGroupingIndex={focusedByteGroupingIndex}
            setFocusedByteGroupingIndex={setFocusedByteGroupingIndex}
          />
        );
      })()}
      <Label>EXPECTED OUTPUT</Label>
      {!!expectedOutputHexStr ? (
        <GroupedBytes
          output={expectedOutputHexStr}
          byteGroups={[
            { numGroups: 'infinity', groupBytesIn: 1, label: 'Integer' },
          ]}
          showBytesLength
          focusedByteGroupingIndex={focusedExpectedOutputByteGroupingIndex}
          setFocusedByteGroupingIndex={
            setFocusedExpectedOutputByteGroupingIndex
          }
        />
      ) : (
        <Text>-</Text>
      )}
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

const JumbotronText = styled(Text)`
  line-height: 20px;
`;
