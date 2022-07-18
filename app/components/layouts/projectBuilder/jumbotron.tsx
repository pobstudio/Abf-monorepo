import Link from 'next/link';
import { FC } from 'react';
import { ROUTES } from '../../../constants/routes';
import { DetailRowsContainer } from '../../details/rows';
import { A, B, P } from '../../texts';

export const Jumbotron: FC = () => {
  return (
    <DetailRowsContainer>
      <P>
        <B>SUBJECT: NFT GEN-ART IS TOO FUCKING EASY.</B>
      </P>
      <P>Enter ABF.</P>
      <P>
        ABF is a hyperstructure to deploy, mint, and create on-chain generative
        art NFTs. No fees + fully self-controlled NFT contracts designed to last
        forever.
      </P>
      <P>
        The catch? You need to write your generative art with{' '}
        <Link href={ROUTES.DOCS.BRAINFUCK}>
          <A>Brainfuck!</A>
        </Link>
        .
      </P>
    </DetailRowsContainer>
  );
};
