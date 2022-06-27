import React from 'react';
import styled from 'styled-components';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { PrimaryButton, TertiaryButton } from '../inputs/button';
import { Text, TextAnchor } from '../texts';

export const Landing: React.FC = () => {
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
        <JumbotronText style={{ fontSize: 24 }}>
          <strong>NFT GEN-ART IS TOO FUCKING EASY.</strong>{' '}
        </JumbotronText>
      </div>
      <JumbotronText>
        Enter <strong>ABF</strong>.
      </JumbotronText>
      <JumbotronText>
        ABF is a <TextAnchor>hyperstructure</TextAnchor> to deploy, mint, and
        create on-chain generative art NFTs. No fees + fully self-controlled NFT
        contracts designed to last forever.
      </JumbotronText>
      <JumbotronText>
        The catch? You need to write your generative art with{' '}
        <TextAnchor>BrainFuck</TextAnchor>.
      </JumbotronText>
      <JumbotronText>
        <strong>Wanna get your brain fucked?</strong>
      </JumbotronText>
      <PrimaryButton>JOIN THE CORP</PrimaryButton>
      <TertiaryButton>READ THE DOCS</TertiaryButton>
      <JumbotronText style={{ opacity: 0.2 }}>
        {
          '-[------->+<]>--.[->+++++<]>++.+++++++++.[----->++<]>+.+++[->++<]>+.--[--->+<]>---.++.[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.+[->+++<]>+.+.----.+++.[->+++<]>++.++[--->++<]>.++++++[->++<]>.+[--->+<]>.-.-------.-[--->+<]>--.++[--->++<]>.---.[->++++++<]>.+[->+++<]>.--[--->+<]>-.++[->+++<]>+.--.+++++++++.[----->++<]>+.+++[->++<]>+.--[--->+<]>---.++.[++>---<]>.'
        }
      </JumbotronText>
    </DetailRowsContainer>
  );
};

const ErrorTable = styled.div`
  > * + * {
    margin-top: 12px;
  }
`;

const ErrorText = styled(Text)`
  color: #f24c4c;
`;

const JumbotronText = styled(Text)`
  line-height: 20px;
`;
