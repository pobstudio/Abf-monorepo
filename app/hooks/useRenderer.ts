import { deployments } from '@abf-monorepo/protocol';
import { gql, useQuery } from '@apollo/client';
import { BigNumber, utils } from 'ethers';
import findKey from 'lodash/findKey';
import { useEffect, useMemo, useState } from 'react';
import { CHAIN_ID } from '../constants';
import { RendererMetadata, RendererMetadataStub } from '../types';
import { useAddress } from './useAddress';
import { useRendererContract } from './useContracts';
import { useENSorHex } from './useENS';
import { useLastTruthyValue } from './useLastTruthyValue';

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

export const useRendererLabel = (address: string | undefined) => {
  const normalizedRendererAddress = useAddress(address);
  const rendererKey = useMemo(() => {
    if (!address) {
      return undefined;
    }
    return findKey(
      deployments[CHAIN_ID].renderers,
      (r) => r === normalizedRendererAddress,
    );
  }, [address]);
  const ensOrHex = useENSorHex(address);
  return useMemo(() => rendererKey ?? ensOrHex, [ensOrHex, rendererKey]);
};

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
  const label = useRendererLabel(address);

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
      label,
    } as RendererMetadata;
  }, [data, label]);
};

export const useRendererMetadataStubByProvider = (
  address: string | undefined,
) => {
  const renderer = useRendererContract(address);

  const [rendererMetadataStub, setRendererMetadataStub] = useState<
    RendererMetadataStub | undefined
  >(undefined);

  const label = useRendererLabel(address);

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
          label,
        });
      } catch (e) {
        return;
      }
    };

    getRendererMetadataStub();
  }, [address, label, renderer]);

  return rendererMetadataStub;
};
