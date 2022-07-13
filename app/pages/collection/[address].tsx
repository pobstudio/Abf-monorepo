import { ADDRESS_REGEX } from '@abf-monorepo/types';
import { gql } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { PageDiv } from '../../components/divs';
import { Collection } from '../../components/layouts/collection';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const EXPLORE_PAGE_SIZE = 100;

const GET_BRAINFUCK_NFTS = gql`
  query GetBrainFuckNFTs($skip: Int!) {
    brainFuckNFTs(first: ${EXPLORE_PAGE_SIZE}, skip: $skip) {
      id
      code
      constants
      mintingSupply
      name
      owner
      price
      renderer
      rendererRoyaltyFraction
      seed
      symbol
      whitelistToken
    }
  }
`;

const GET_BRAINFUCK_NFT_BY_ADDRESS = gql`
  query GetBrainFuckNFT($address: String!) {
    brainFuckNFT(where: { id: $address }) {
      id
      code
      constants
      mintingSupply
      name
      owner
      price
      renderer
      rendererRoyaltyFraction
      seed
      symbol
      whitelistToken
    }
  }
`;

const CollectionIndexPage: NextPage = () => {
  const router = useRouter();
  const address = useMemo(() => {
    if (!router.query.address) {
      return undefined;
    }
    if (
      typeof router.query.address !== 'string' ||
      !ADDRESS_REGEX.test(router.query.address)
    ) {
      return undefined;
    }
    return router.query.address as string;
  }, [router]);
  return (
    <PageDiv>
      <Header />
      <Collection address={address} />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(CollectionIndexPage);
