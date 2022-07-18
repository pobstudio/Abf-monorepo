import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { BREAKPTS } from '../../constants/styles';
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
          <AbfLogo>
            <img src="/assets/logo-round.svg" />
          </AbfLogo>
          <div>
            <H1>NFT GEN-ART IS TOO F**KING EASY.</H1>
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
            <Link passHref href={ROUTES.DOCS.BRAINFUCK}>
              <A>Brainfuck!</A>
            </Link>
          </P>
          <P>
            <strong>Ready to get your brain f**ked?</strong>
          </P>
          <br />
          <br />
          <Link passHref href={ROUTES.RECRUIT}>
            <a>
              <PrimaryButton>JOIN THE CORPS</PrimaryButton>
            </a>
          </Link>
          <br />
          <br />
          <Link passHref href={ROUTES.DOCS.INDEX}>
            <a>
              <TertiaryButton>READ THE DOCS</TertiaryButton>
            </a>
          </Link>
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

const AbfLogo = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: center;
  align-items: center;
  margin: -50px auto 50px;
  img {
    width: 100px;
  }
  @media (max-width: ${BREAKPTS.LG}px) {
    margin: 0 auto 40px;
    img {
      width: 75px;
    }
  }
`;
