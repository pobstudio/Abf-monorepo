import { deployments, RENDERER_LOCAL_IPFS_CID } from '@abf-monorepo/protocol';
import { gql, useQuery } from '@apollo/client';
import { BigNumber, utils } from 'ethers';
import findKey from 'lodash/findKey';
import { useEffect, useMemo, useState } from 'react';
import { CHAIN_ID } from '../constants';
import {
  RendererAdditionalMetadata,
  RendererMetadata,
  RendererMetadataStub,
} from '../types';
import { useAddress } from './useAddress';
import { useRendererContract } from './useContracts';
import { useENSorHex } from './useENS';
import { useIPFSJson } from './useIPFS';
import { useLastTruthyValue } from './useLastTruthyValue';

export const RENDERER_PAGE_SIZE = 100;

const GET_RENDERER_METADATAS = gql`
  query GetAllRendererMetadatas($skip: Int!) {
    renderers(first: ${RENDERER_PAGE_SIZE}, skip: $skip) {
      id
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
  const label = useRendererLabel(renderer);
  const cid = useMemo(() => {
    if (!!RENDERER_LOCAL_IPFS_CID[label]) {
      return RENDERER_LOCAL_IPFS_CID[label];
    }
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
  }, [additionalMetadataURI, label]);
  const obj = useIPFSJson(cid);
  return useMemo(() => {
    if (!obj?.description) {
      return undefined;
    }
    return obj as RendererAdditionalMetadata;
  }, [obj]);
};

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
          propsSize: BigNumber.from(r.propsSize),
          additionalMetadataURI: r.additionalMetadataURI,
          registeredAt: parseInt(r.registeredAt),
          owner: r.owner,
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
      label,
      owner: r.owner,
    } as RendererMetadata;
  }, [data, label, additionalMetadata]);
};

export const useRendererMetadataStubByProvider = (
  address: string | undefined,
) => {
  const renderer = useRendererContract(address);

  const [rendererMetadataStub, setRendererMetadataStub] = useState<
    Partial<RendererMetadataStub> | undefined
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
        const propsSize = await renderer.propsSize();
        const owner = await renderer.owner();
        setRendererMetadataStub({
          address,
          additionalMetadataURI,
          propsSize,
          label,
          owner,
        });
      } catch (e) {
        return;
      }
    };

    getRendererMetadataStub();
  }, [address, label, renderer]);

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
