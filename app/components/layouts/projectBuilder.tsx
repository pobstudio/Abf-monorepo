import { FC } from 'react';
import styled from 'styled-components';
import { ProjectBuilderProvider } from '../../contexts/projectBuilder';
import {
  DetailAnchorRow,
  DetailRow,
  InteractiveDetailRowsContainer,
  DetailTitleAnchorRow,
} from '../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../divs/twoColumn';
import { FlexCenterColumn } from '../flexs';
import { PrimaryButton } from '../inputs/button';
import { InputWell, NumberInput, TextArea, TextInput } from '../inputs/input';
import { PlaceholderRender } from '../renders';
import { Text } from '../texts';

export const ProjectBuilder: FC = () => {
  return (
    <ProjectBuilderProvider>
      <TwoColumnContainer>
        <FlexCenterColumn>
          <TwoColumnContentContainer>
            <Jumbotron />
            <SelectRenderer />
            <WriteBrainFuck />
            <SelectTokenParameters />
            <SelectMintingParameters />
            <SelectAdvancedTokenParameters />
            <SubmitAndCreateContract />
          </TwoColumnContentContainer>
        </FlexCenterColumn>
        <FlexCenterColumn>
          <TwoColumnContentContainer>
            <PlaceholderRender />
          </TwoColumnContentContainer>
        </FlexCenterColumn>
      </TwoColumnContainer>
    </ProjectBuilderProvider>
  );
};

const Jumbotron: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <Text>
        <strong>SUBJECT: NFT GEN-ART IS TOO FUCKING EASY.</strong>
      </Text>
      <Text>Enter ABF.</Text>
      <Text style={{ lineHeight: '16px' }}>
        ABF is a hyperstructure to deploy, mint, and create on-chain generative
        art NFTs. No fees + fully self-controlled NFT contracts designed to last
        forever.
      </Text>
      <Text>
        The catch? You need to write your generative art with BrainFuck.
      </Text>
    </InteractiveDetailRowsContainer>
  );
};

const SelectRenderer: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['1. SELECT RENDERER', `REGISTRY`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <TextInput placeholder="0xabcd...1234" />
      </InputWell>
      <DetailRow>{['VALID CONTRACT', `TRUE`]}</DetailRow>
      <DetailRow>{['REQUIRED INPUT BYTE STRING SIZE', `256 BYTES`]}</DetailRow>
      <DetailAnchorRow>{['DOCUMENTATION', `IPFS`]}</DetailAnchorRow>
    </InteractiveDetailRowsContainer>
  );
};

const WriteBrainFuck: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['2. WRITE BRAINFUCK', `DOCS`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <TextArea
          style={{ minHeight: 240 }}
          placeholder="-[--->+<]>-.[---->+++++<]>-.+.++++++++++.+[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.-------------.[--->+<]>---..+++++.-[---->+<]>++.+[->+++<]>.++++++++++++..---.[-->+<]>--------."
        />
      </InputWell>
    </InteractiveDetailRowsContainer>
  );
};

const SelectTokenParameters: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['3. CONFIGURE TOKEN PARAMETERS', `SPEC`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <Text>NAME</Text>
        <TextInput
          style={{ textAlign: 'right' }}
          placeholder="Absolute Brain Fuck"
        />
      </InputWell>
      <InputWell>
        <Text>SYMBOL</Text>
        <TextInput style={{ textAlign: 'right' }} placeholder="ABF" />
      </InputWell>
    </InteractiveDetailRowsContainer>
  );
};

const SelectAdvancedTokenParameters: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['5. CONFIGURE ADVANCED PARAMETERS (OPTIONAL)', `SPEC`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <Text>SEED</Text>
        <TextInput style={{ textAlign: 'right' }} placeholder="0xabcd...decd" />
      </InputWell>
      <InputWell>
        <Text>INPUT CONSTANTS</Text>
        <TextInput style={{ textAlign: 'right' }} placeholder="0xabcd...decd" />
      </InputWell>
      <DetailRow>{['VALID SEED', `TRUE`]}</DetailRow>
      <DetailRow>{['VALID INPUT CONSTANTS', `TRUE`]}</DetailRow>
    </InteractiveDetailRowsContainer>
  );
};

const SelectMintingParameters: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['4. CONFIGURE MINTING PARAMETERS', `SPEC`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <Text>SUPPLY</Text>
        <NumberInput style={{ textAlign: 'right' }} placeholder="0" />
      </InputWell>
      <InputWell>
        <Text>PRICE</Text>
        <NumberInput style={{ textAlign: 'right' }} placeholder="0.1" />
        <Text style={{ paddingLeft: 8 }}>
          <strong>ETH</strong>
        </Text>
      </InputWell>
      <InputWell>
        <Text>SECONDARY MARKET ROYALTY (0-100)</Text>
        <NumberInput style={{ textAlign: 'right' }} placeholder="0" />
        <Text style={{ paddingLeft: 8 }}>
          <strong>%</strong>
        </Text>
      </InputWell>
    </InteractiveDetailRowsContainer>
  );
};

const SubmitAndCreateContract: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <PrimaryButton>CREATE COLLECTION</PrimaryButton>
    </InteractiveDetailRowsContainer>
  );
};
