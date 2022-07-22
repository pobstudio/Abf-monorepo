import { gql, useQuery } from '@apollo/client';
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
    // console.log(data, 'GET_COLLECTIONS');
    if (!data) {
      return undefined;
    }
    if (!data.collections) {
      return undefined;
    }
    return data.collections
      .map(
        (r: any) =>
          ({
            address: r.id,
            code: r.code,
            mintingSupply: r.mintingSupply,
            name: r.name,
            owner: r.owner,
            price: r.price,
            renderer: r.renderer,
            symbol: r.symbol,
          } as any),
      )
      .reverse();
  }, [data, data?.collections]);
};

export const useCollection = (
  address: string | undefined,
): CollectionMetadata | undefined => {
  const results = useQuery(GET_COLLECTION, {
    variables: { address: address?.toLowerCase() },
  });

  const data = useLastTruthyValue(results.data);

  return useMemo(() => {
    // console.log(data, 'GET_COLLECTION');
    if (!data) {
      return undefined;
    }
    if (!data.collections) {
      return undefined;
    }
    const r = data.collections[0];
    if (!r) {
      return undefined;
    }
    return {
      address: r.id,
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
  }, [address, data, data?.collection]);
};

export const useCollectionsByOwner = (
  address: string | undefined,
): CollectionMetadataStub[] | undefined => {
  const results = useQuery(GET_COLLECTIONS_BY_OWNER, {
    variables: { address: address?.toLowerCase() },
  });

  const data = useLastTruthyValue(results.data);

  return useMemo(() => {
    console.log(data, 'GET_COLLECTIONS_BY_OWNER');
    if (!data) {
      return undefined;
    }
    if (!data.collections) {
      return undefined;
    }
    return data.collections
      .map(
        (r: any) =>
          ({
            address: r.id,
            code: r.code,
            mintingSupply: r.mintingSupply,
            name: r.name,
            owner: r.owner,
            price: r.price,
            renderer: r.renderer,
            symbol: r.symbol,
          } as any),
      )
      .reverse();
  }, [data, data?.collections]);
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
    collections(where: { id: $address }) {
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

export const GET_COLLECTIONS_BY_OWNER = gql`
  query GetCollection($address: String!) {
    collections(where: { owner: $address }) {
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
