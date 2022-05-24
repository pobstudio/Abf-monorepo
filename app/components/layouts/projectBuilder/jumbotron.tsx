import { FC } from 'react';
import { DetailRowsContainer } from '../../details/rows';
import { MultiLineText, TextAnchor } from '../../texts';

export const Jumbotron: FC = () => {
  return (
    <DetailRowsContainer>
      <MultiLineText>
        <strong>SUBJECT: NFT GEN-ART IS TOO FUCKING EASY.</strong>
      </MultiLineText>
      <MultiLineText>Enter ABF.</MultiLineText>
      <MultiLineText>
        ABF is a hyperstructure to deploy, mint, and create on-chain generative
        art NFTs. No fees + fully self-controlled NFT contracts designed to last
        forever.
      </MultiLineText>
      <MultiLineText>
        The catch? You need to write your generative art with{' '}
        <TextAnchor>BrainFuck</TextAnchor>.
      </MultiLineText>
    </DetailRowsContainer>
  );
};
