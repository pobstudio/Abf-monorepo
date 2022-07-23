import { FC, useMemo, useState } from 'react';
import { useBeforeUnload } from 'react-use';
import styled from 'styled-components';
import {
  useModifyProjectMetadata,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import { unicodeToChar } from '../../../utils/hex';
import { DetailRow, DetailRowsContainer } from '../../details/rows';
import { ExpandoContentContainer, ExpandoGroup } from '../../expando';
import { Flex, FlexEnds } from '../../flexs';
import { BaseButton } from '../../inputs/button';
import { InputWell, TextArea, TextInput } from '../../inputs/input';
import { B, Code, Label, P, Text } from '../../texts';
import { Tooltip } from '../../tooltip';

type BrainFuckEditorViewState = 'raw' | 'postProcessed';

export const BrainFuckEditor: FC = () => {
  const { onCodeChange, onInputConstantsChange } = useModifyProjectMetadata();
  const {
    code,
    inputConstants: validInputConstants,
    postProcessedCode,
  } = useProjectMetadata();
  const { inputConstants } = useRawProjectMetadata();

  const [brainFuckEditorViewState, setBrainFuckEditorViewState] =
    useState<BrainFuckEditorViewState>('raw');

  useBeforeUnload(true, 'Are you sure you want to close?');

  const utf8Code = useMemo(
    () => (!!code ? unicodeToChar(code) : undefined),
    [code],
  );
  const utf8PostProcessedCode = useMemo(
    () => (!!postProcessedCode ? unicodeToChar(postProcessedCode) : undefined),
    [postProcessedCode],
  );
  return (
    <>
      <DetailRowsContainer>
        <FlexEnds>
          <Text>
            <B>WRITE BRAINFUCK!</B>
          </Text>
          <Flex>
            <ToggleButton
              onClick={() => setBrainFuckEditorViewState('raw')}
              isActive={brainFuckEditorViewState === 'raw'}
            >
              WRITTEN
            </ToggleButton>
            <Label style={{ margin: '0 4px' }}>/</Label>
            <ToggleButton
              onClick={() => setBrainFuckEditorViewState('postProcessed')}
              isActive={brainFuckEditorViewState === 'postProcessed'}
            >
              TRANSPILED
            </ToggleButton>
          </Flex>
        </FlexEnds>
        <InputWell>
          <TextArea
            disabled={brainFuckEditorViewState === 'postProcessed'}
            value={
              brainFuckEditorViewState === 'postProcessed'
                ? utf8PostProcessedCode ?? ''
                : utf8Code ?? ''
            }
            onChange={(e) => onCodeChange(e.target.value)}
            style={{ minHeight: 240 }}
            placeholder="-[--->+<]>-.[---->+++++<]>-.+.++++++++++.+[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.-------------.[--->+<]>---..+++++.-[---->+<]>++.+[->+++<]>.++++++++++++..---.[-->+<]>--------."
          />
        </InputWell>
        <Flex style={{ paddingTop: 82 }}>
          <Text style={{ marginRight: 6 }}>INPUT TO BF! CODE</Text>
          <Tooltip direction={'left'}>
            <P>
              Input in Brainfuck! is read via the <Code>,</Code> operator.
              Provide up to 32 bytes; another 32 pseudo-random bytes will be
              appended for a total of 64 bytes.
            </P>
          </Tooltip>
        </Flex>
        <InputWell>
          <TextArea
            value={inputConstants ?? ''}
            onChange={(e) => onInputConstantsChange(e.target.value)}
            style={{ minHeight: 40 }}
            placeholder="0xabcd...decd"
          />
        </InputWell>
        <DetailRow>
          {['VALID INPUT CONSTANTS', !!validInputConstants ? 'TRUE' : 'FALSE']}
        </DetailRow>
      </DetailRowsContainer>
      <DetailRowsContainer>
        <AdvancedControls />
      </DetailRowsContainer>
    </>
  );
};

const AdvancedControls: FC = () => {
  const { onSeedChange } = useModifyProjectMetadata();
  const { seed } = useRawProjectMetadata();
  const { seed: validSeed } = useProjectMetadata();
  return (
    <ExpandoGroup title={'ADVANCED SETTINGS'}>
      <ExpandoContentContainer>
        <DetailRowsContainer>
          <InputWell>
            <Flex>
              <Text style={{ marginRight: 6 }}>SEED</Text>
              <Tooltip direction={'left'}>
                <P>
                  Seed provides a deterministic source of random for generating
                  the last 32 bytes provide to Brainfuck! code.
                </P>
              </Tooltip>
            </Flex>
            <TextInput
              value={seed ?? ''}
              onChange={(e) => onSeedChange(e.target.value)}
              style={{ textAlign: 'right' }}
              placeholder="0xabcd...decd"
            />
          </InputWell>
          <DetailRow>
            {['VALID SEED', !!validSeed ? 'TRUE' : 'FALSE']}
          </DetailRow>
        </DetailRowsContainer>
      </ExpandoContentContainer>
    </ExpandoGroup>
  );
};

const ToggleButton = styled(BaseButton)<{ isActive?: boolean }>`
  opacity: ${(p) => (p.isActive ? 1 : 0.4)};
  :hover {
    opacity: ${(p) => (p.isActive ? 1 : 0.6)};
  }
`;
