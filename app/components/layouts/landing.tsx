import React from 'react';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { PrimaryButton, TertiaryButton } from '../inputs/button';
import { A, B, H1, P } from '../texts';

export const Landing: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <div>
            <H1 style={{ fontSize: 24 }}>NFT GEN-ART IS TOO FUCKING EASY.</H1>
          </div>
          <P>
            Enter <strong>ABF</strong>.
          </P>
          <P>
            ABF is a <B>protocol</B> to deploy, mint, and create on-chain
            generative art NFTs. No fees + fully self-controlled NFT contracts
            designed to last forever.
          </P>
          <P>
            The catch? You need to write your generative art with{' '}
            <A>BrainFuck</A>.
          </P>
          <P>
            <strong>Wanna get your brain fucked?</strong>
          </P>
          <PrimaryButton>JOIN THE CORP</PrimaryButton>
          <TertiaryButton>READ THE DOCS</TertiaryButton>
          <P style={{ opacity: 0.2 }}>
            {
              '-[------->+<]>--.[->+++++<]>++.+++++++++.[----->++<]>+.+++[->++<]>+.--[--->+<]>---.++.[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.+[->+++<]>+.+.----.+++.[->+++<]>++.++[--->++<]>.++++++[->++<]>.+[--->+<]>.-.-------.-[--->+<]>--.++[--->++<]>.---.[->++++++<]>.+[->+++<]>.--[--->+<]>-.++[->+++<]>+.--.+++++++++.[----->++<]>+.+++[->++<]>+.--[--->+<]>---.++.[++>---<]>.'
            }
          </P>
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};
