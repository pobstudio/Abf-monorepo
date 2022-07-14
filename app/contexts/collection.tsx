import { BigNumber } from 'ethers';
import React, { useMemo, useState } from 'react';
import { useCollection } from '../hooks/useCollections';
import {
  useRendererLabel,
  useRendererMetadataStubByProvider,
} from '../hooks/useRenderer';
import {
  CollectionMetadata,
  RenderCodeOutputState,
  RendererMetadataStub,
} from '../types';
import {
  convertHexStrToAscii,
  getTokenSeed,
  runBrainFuckCode,
  tokenSeedToInputTape,
} from '../utils/brainFuck';

export interface CollectionProviderContext {
  collectionMetadata: CollectionMetadata | undefined;
  rendererMetadata: RendererMetadataStub | undefined;
  currentSampleTokenRenderState: RenderCodeOutputState | undefined;
  rendererLabel: string;
  brainfuckCode: string;
  setCurrentSampleTokenId: React.Dispatch<React.SetStateAction<number>>;
}

export type CollectionProviderState = CollectionProviderContext;

const initialState: CollectionProviderState = {
  currentSampleTokenRenderState: {
    status: 'error',
    message: 'error',
  },
  collectionMetadata: undefined,
  rendererMetadata: undefined,
  rendererLabel: '',
  brainfuckCode: '',
  setCurrentSampleTokenId: () => new Error('func is not set'),
};

const CollectionContext =
  React.createContext<CollectionProviderState>(initialState);

export const CollectionProvider: React.FC<{
  address: string | undefined;
  children: React.ReactNode;
}> = ({ address, children }) => {
  const [currentSampleTokenId, setCurrentSampleTokenId] = useState(0);
  const collectionMetadata = useCollection(address);
  const rendererAddress = collectionMetadata?.renderer ?? '';
  const brainfuckCodeInHex = collectionMetadata?.code ?? '';
  const constants = collectionMetadata?.constants ?? '';
  const seed = collectionMetadata?.seed ?? '0x00';
  const rendererLabel = useRendererLabel(rendererAddress);
  const rendererMetadata = useRendererMetadataStubByProvider(rendererAddress);
  const brainfuckCode = convertHexStrToAscii(brainfuckCodeInHex);
  const tokenSeed = useMemo(
    () =>
      constants && seed
        ? getTokenSeed(seed, BigNumber.from(currentSampleTokenId), constants)
        : undefined,
    [constants, seed, currentSampleTokenId],
  );

  const currentSampleTokenRenderState = useMemo(():
    | RenderCodeOutputState
    | undefined => {
    if (!brainfuckCode || !tokenSeed) {
      return undefined;
    }
    try {
      const output = runBrainFuckCode(
        brainfuckCode,
        tokenSeedToInputTape(tokenSeed),
      );
      return {
        output,
        status: 'success',
        warnings: [],
      };
    } catch (e: any) {
      return {
        message: e.message,
        status: 'error',
      };
    }
  }, [brainfuckCode, tokenSeed]);

  const stateObject = useMemo(() => {
    return {
      collectionMetadata,
      rendererMetadata,
      rendererLabel,
      brainfuckCode,
      currentSampleTokenRenderState,
      currentSampleTokenId,
      setCurrentSampleTokenId,
    };
  }, [
    currentSampleTokenRenderState,
    currentSampleTokenId,
    setCurrentSampleTokenId,
    collectionMetadata,
    rendererMetadata,
    rendererLabel,
    brainfuckCode,
  ]);

  return (
    <CollectionContext.Provider value={stateObject}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionContext = (): CollectionProviderState => {
  return React.useContext(CollectionContext);
};

export const useCollectionMetadata = () => {
  const { collectionMetadata } = useCollectionContext();
  return collectionMetadata;
};

export const useRendererMetadataFromCollection = () => {
  const { rendererMetadata } = useCollectionContext();
  return rendererMetadata;
};
