import { deployments } from '@abf-monorepo/protocol';
import { gql, useQuery } from '@apollo/client';
import { BigNumber, utils } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { CHAIN_ID } from '../constants';
import {
  RendererAdditionalMetadata,
  RendererMetadata,
  RendererMetadataStub,
} from '../types';
import { useRendererContract } from './useContracts';
import { useIPFSJson } from './useIPFS';
import { useLastTruthyValue } from './useLastTruthyValue';

export const RENDERER_PAGE_SIZE = 100;

const GET_RENDERER_METADATAS = gql`
  query GetAllRendererMetadatas($skip: Int!) {
    renderers(first: ${RENDERER_PAGE_SIZE}, skip: $skip) {
      id
      name
      address
      propsSize
      additionalMetadataURI
      registeredAt
      owner
    }
  }
`;

const GET_RENDERER_METADATA_BY_ADDRESS = gql`
  query GetAllRendererMetadatas($address: String!) {
    renderers(where: { address: $address }) {
      id
      name
      address
      propsSize
      additionalMetadataURI
      registeredAt
      owner
    }
  }
`;

export const useAdditionalMetadata = (
  renderer: string | undefined,
  additionalMetadataURI: string | undefined,
) => {
  const cid = useMemo(() => {
    if (additionalMetadataURI?.startsWith('ipfs://')) {
      return additionalMetadataURI.slice('ipfs://'.length);
    }
    if (
      additionalMetadataURI?.startsWith('baf') ||
      additionalMetadataURI?.startsWith('Qm')
    ) {
      return additionalMetadataURI;
    }
    return undefined;
  }, [additionalMetadataURI]);
  const obj = useIPFSJson(cid);
  return useMemo(() => {
    if (!obj?.description) {
      return undefined;
    }
    return obj as RendererAdditionalMetadata;
  }, [obj]);
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
          propsSize: BigNumber.from(r.propsSize),
          additionalMetadataURI: r.additionalMetadataURI,
          registeredAt: parseInt(r.registeredAt),
          owner: r.owner,
          name: !!r.name ? r.name : undefined,
        } as RendererMetadata),
    );
  }, [data]);
};

export const useRendererMetadata = (address: string | undefined) => {
  const results = useQuery(GET_RENDERER_METADATA_BY_ADDRESS, {
    variables: { address },
  });

  const data = useLastTruthyValue(results.data);

  const additionalMetadata = useAdditionalMetadata(
    address,
    data?.renderers?.[0]?.additionalMetadataURI,
  );
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
      propsSize: BigNumber.from(r.propsSize),
      additionalMetadataURI: r.additionalMetadataURI,
      registeredAt: parseInt(r.registeredAt),
      additionalMetadata,
      name: !!data.name ? data.name : undefined,
      owner: r.owner,
    } as RendererMetadata;
  }, [data, additionalMetadata]);
};

export const useRendererMetadataStubByProvider = (
  address: string | undefined,
) => {
  const renderer = useRendererContract(address);

  const [rendererMetadataStub, setRendererMetadataStub] = useState<
    Partial<RendererMetadataStub> | undefined
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
        const propsSize = await renderer.propsSize();
        const owner = await renderer.owner();
        const name = await renderer.name();
        setRendererMetadataStub({
          address,
          additionalMetadataURI,
          propsSize,
          name: !!name ? name : undefined,
          owner,
        });
      } catch (e) {
        return;
      }
    };

    getRendererMetadataStub();
  }, [address, renderer]);

  const additionalMetadata = useAdditionalMetadata(
    address,
    rendererMetadataStub?.additionalMetadataURI,
  );

  return useMemo(
    () =>
      !!rendererMetadataStub
        ? ({
            ...rendererMetadataStub,
            additionalMetadata,
          } as RendererMetadataStub)
        : undefined,
    [rendererMetadataStub, additionalMetadata],
  );
};
