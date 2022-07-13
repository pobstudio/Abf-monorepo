import { gql, useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { CollectionMetadata, CollectionMetadataStub } from '../types';
import { useLastTruthyValue } from './useLastTruthyValue';

// TODO: make it page query based.
export const useCollections = (): CollectionMetadataStub[] | undefined => {
  const results = useQuery(GET_COLLECTIONS, {
    variables: { skip: 0 },
  });

  const data = useLastTruthyValue(results.data);

  return useMemo(() => {
    console.log(data, 'GET_COLLECTIONS');
    if (!data) {
      return undefined;
    }
    if (!data.collections) {
      return undefined;
    }
    return data.collections.map(
      (r: any) =>
        ({
          address: BigNumber.from(r.id),
          code: r.code,
          mintingSupply: r.mintingSupply,
          name: r.name,
          owner: r.owner,
          price: r.price,
          renderer: r.renderer,
          symbol: r.symbol,
        } as any),
    );
  }, [data]);
};

export const useCollection = (
  address: string | undefined,
): CollectionMetadata | undefined => {
  if (!address) {
    return undefined;
  }

  const results = useQuery(GET_COLLECTION, {
    variables: { address },
  });

  const data = useLastTruthyValue(results.data);

  return useMemo(() => {
    console.log(data, 'GET_COLLECTIONS');
    if (!data) {
      return undefined;
    }
    if (!data.collection) {
      return undefined;
    }
    const r = data.collection;
    return {
      address: BigNumber.from(r.id),
      code: r.code,
      constants: r.constants,
      mintingSupply: r.mintingSupply,
      name: r.name,
      owner: r.owner,
      price: r.price,
      renderer: r.renderer,
      rendererRoyaltyFraction: r.rendererRoyaltyFraction,
      seed: r.seed,
      symbol: r.symbol,
      whitelistToken: r.whitelistToken,
    };
  }, [data]);
};

export const EXPLORE_PAGE_SIZE = 100;

export const GET_COLLECTIONS = gql`
  query GetCollections($skip: Int!) {
    collections(first: ${EXPLORE_PAGE_SIZE}, skip: $skip) {
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

export const GET_COLLECTION = gql`
  query GetCollection($address: String!) {
    collection(where: { id: $address }) {
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
