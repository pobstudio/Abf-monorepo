import { FC } from 'react';
import styled from 'styled-components';
import { ProjectBuilderProvider } from '../../contexts/projectBuilder';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
  DetailTitleAnchorRow,
  DetailTitleRow,
} from '../details/rows';
import { DetailRowTablesContainer } from '../details/tables';
import { Box, PaddedBox } from '../divs';
import { PrimaryButton } from '../inputs/button';
import { InputWell, NumberInput, TextArea, TextInput } from '../inputs/input';
import { Text } from '../texts';
import { TwoRowContainer } from './common';

const ProjectBuilderContainer = styled(TwoRowContainer)`
  > :first-child {
    border-right: none;
  }
  margin: 256px 0;
`;

const InteractiveDetailRowsContainer = styled(DetailRowsContainer)<{
  disabled?: boolean;
}>`
  position: relative;
  *::after {
    content: '';
    position: absolute;
    display: ${(p) => (p.disabled ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.25);
  }
`;

export const ProjectBuilder: FC = () => {
  return (
    <ProjectBuilderProvider>
      <ProjectBuilderContainer>
        <PaddedBox>
          <DetailRowTablesContainer>
            <Jumbotron />
            <SelectRenderer />
            <WriteBrainFuck />
            <SelectTokenParameters />
            <SelectMintingParameters />
            <SubmitAndCreateContract />
          </DetailRowTablesContainer>
        </PaddedBox>
        <PaddedBox>
          <DetailRow>{['Supply', `${0}/1000`]}</DetailRow>
        </PaddedBox>
      </ProjectBuilderContainer>
    </ProjectBuilderProvider>
  );
};

const Jumbotron: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <Text>
        <strong>NFT Gen-art is too fucking easy.</strong>
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
      <InputWell>
        <Text>SEED</Text>
        <TextInput style={{ textAlign: 'right' }} placeholder="0xabcd...decd" />
      </InputWell>
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
        <Text>MINTING RELEASE (UNIX)</Text>
        <NumberInput style={{ textAlign: 'right' }} placeholder="1651794229" />
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
