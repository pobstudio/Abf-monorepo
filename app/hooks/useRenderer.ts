import { gql, useQuery } from '@apollo/client';
import { useLastTruthyValue } from './useLastTruthyValue';
import { BigNumber, utils } from 'ethers';
import { useBlockchainStore } from '../stores/blockchain';
import { useEffect, useMemo, useState } from 'react';
import { RendererMetadata, RendererMetadataStub } from '../types';
import { useProvider } from './useProvider';
import { useRendererContract } from './useContracts';
import { deployments } from '@abf-monorepo/protocol';
import { CHAIN_ID } from '../constants';

export const RENDERER_PAGE_SIZE = 100;

const GET_RENDERER_METADATAS = gql`
  query GetAllRendererMetadatas($skip: Int!) {
    renderers(first: ${RENDERER_PAGE_SIZE}, skip: $skip) {
      id
      address
      outSize
      additionalMetadataURI
      registeredAt
    }
  }
`;

const GET_RENDERER_METADATA_BY_ADDRESS = gql`
  query GetAllRendererMetadatas($address: String!) {
    renderers(where: { address: $address }) {
      id
      address
      outSize
      additionalMetadataURI
      registeredAt
    }
  }
`;

// TODO: make it page query based.
export const useAllRendererMetadata = (): RendererMetadata[] => {
  const results = useQuery(GET_RENDERER_METADATAS, {
    variables: { skip: 0 },
  });

  const data = useLastTruthyValue(results.data);

  return useMemo(() => {
    if (!data) {
      return undefined;
    }
    if (!data.renderers) {
      return undefined;
    }
    return data.renderers.map(
      (r: any) =>
        ({
          address: r.address,
          id: BigNumber.from(r.id),
          outSize: BigNumber.from(r.outSize),
          additionalMetadataURI: r.additionalMetadataURI,
          registeredAt: parseInt(r.registeredAt),
        } as RendererMetadata),
    );
  }, [data]);
};

export const useRendererMetadata = (address: string | undefined) => {
  const results = useQuery(GET_RENDERER_METADATA_BY_ADDRESS, {
    variables: { address },
  });

  const data = useLastTruthyValue(results.data);

  return useMemo(() => {
    if (!data) {
      return undefined;
    }
    if (!data.renderers[0]) {
      return undefined;
    }
    const r = data.renderers[0];
    if (!address || utils.getAddress(address) !== utils.getAddress(r.address)) {
      return undefined;
    }
    return {
      address: r.address,
      id: BigNumber.from(r.id),
      outSize: BigNumber.from(r.outSize),
      additionalMetadataURI: r.additionalMetadataURI,
      registeredAt: parseInt(r.registeredAt),
    } as RendererMetadata;
  }, [data]);
};

export const useRendererMetadataStubByProvider = (
  address: string | undefined,
) => {
  const renderer = useRendererContract(address);

  const [rendererMetadataStub, setRendererMetadataStub] = useState<
    RendererMetadataStub | undefined
  >(undefined);

  useEffect(() => {
    if (!address) {
      return;
    }

    if (rendererMetadataStub?.address !== address) {
      setRendererMetadataStub(undefined);
    }
  }, [address, rendererMetadataStub]);

  useEffect(() => {
    if (!address || !renderer) {
      return;
    }

    const getRendererMetadataStub = async () => {
      try {
        const isValid = await renderer.supportsInterface(
          deployments[CHAIN_ID].interfaceID.renderer,
        );
        if (!isValid) {
          return;
        }
        const additionalMetadataURI = await renderer.additionalMetadataURI();
        const outSize = await renderer.outSize();
        setRendererMetadataStub({
          address,
          additionalMetadataURI,
          outSize,
        });
      } catch (e) {
        return;
      }
    };

    getRendererMetadataStub();
  }, [address, renderer]);

  return rendererMetadataStub;
};
