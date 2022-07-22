import { BigNumber } from 'ethers';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePriorityAccount } from '../connectors/priority';
import { useCollection } from '../hooks/useCollections';
import { useBrainFuckContract } from '../hooks/useContracts';
import {
  useRendererMetadataStubByProvider,
} from '../hooks/useRenderer';
import { useTransactionsStore } from '../stores/transaction';
import {
  CollectionMetadata,
  RenderCodeOutputState,
  RendererMetadataStub,
} from '../types';
import {
  getTokenSeed,
  runBrainFuckCode,
  tokenSeedToInputTape,
} from '../utils/brainFuck';
import { convertHexStrToUtf8 } from '../utils/hex';

export interface CollectionProviderContext {
  collectionMetadata: CollectionMetadata | undefined;
  rendererMetadata: RendererMetadataStub | undefined;
  currentSampleTokenRenderState: RenderCodeOutputState | undefined;
  collectionAddress: string | undefined;
  brainfuckCode: string;
  currentTokenId: number;
  currentSampleTokenId: number;
  setCurrentSampleTokenId: React.Dispatch<React.SetStateAction<number>>;
  activateCollection: () => void;
  isActive: boolean;
  isOwner: boolean;
  amountToMint: number;
  setAmountToMint: React.Dispatch<React.SetStateAction<number>>;
  incrementAmountToMint: () => void;
  decrementAmountToMint: () => void;
}

export type CollectionProviderState = CollectionProviderContext;

const initialState: CollectionProviderState = {
  currentSampleTokenRenderState: {
    status: 'error',
    message: 'error',
  },
  collectionMetadata: undefined,
  rendererMetadata: undefined,
  brainfuckCode: '',
  collectionAddress: '',
  currentTokenId: 0,
  currentSampleTokenId: 0,
  setCurrentSampleTokenId: () => new Error('func is not set'),
  activateCollection: () => new Error('func is not set'),
  isActive: false,
  isOwner: false,
  amountToMint: 1,
  setAmountToMint: () => new Error('func is not set'),
  incrementAmountToMint: () => new Error('func is not set'),
  decrementAmountToMint: () => new Error('func is not set'),
};

const CollectionContext =
  React.createContext<CollectionProviderState>(initialState);

export const CollectionProvider: React.FC<{
  address: string | undefined;
  children: React.ReactNode;
}> = ({ address, children }) => {
  const [amountToMint, setAmountToMint] = useState(1);
  const [currentTokenId, setCurrentTokenId] = useState(0);
  const [currentSampleTokenId, setCurrentSampleTokenId] = useState(0);
  const collectionMetadata = useCollection(address);
  const rendererAddress = collectionMetadata?.renderer ?? '';
  const brainfuckCodeInHex = collectionMetadata?.code ?? '';
  const constants = collectionMetadata?.constants ?? '';
  const seed = collectionMetadata?.seed ?? '0x00';
  const rendererMetadata = useRendererMetadataStubByProvider(rendererAddress);
  const brainfuckCode = convertHexStrToUtf8(brainfuckCodeInHex);
  const tokenSeed = useMemo(
    () =>
      constants && seed
        ? getTokenSeed(seed, BigNumber.from(currentSampleTokenId), constants)
        : undefined,
    [constants, seed, currentSampleTokenId],
  );

  const addTransaction = useTransactionsStore((s) => s.addTransaction);
  const [isOwner, setIsOwner] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const brainFuckContract = useBrainFuckContract(address);
  const account = usePriorityAccount();
  const [error, setError] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const connect = async () => {
      if (!account || !address || !brainFuckContract) {
        return;
      }
      try {
        const isActiveRes = await brainFuckContract.isActive();

        if (!!isActiveRes) {
          setIsActive(isActiveRes);
          setError(undefined);
        }
      } catch (e) {
        console.error(e);
        setError(e);
      }
    };
    connect().catch((error) => {
      console.error(error);
    });
  }, [address, account, brainFuckContract]);

  useEffect(() => {
    if (address && account && collectionMetadata?.owner) {
      setIsOwner(
        account.toLowerCase() == collectionMetadata.owner.toLowerCase(),
      );
    }
  }, [address, account, collectionMetadata?.owner]);

  const activateCollection = useCallback(async () => {
    if (!account || !address || !brainFuckContract) {
      return;
    }
    try {
      const res = await brainFuckContract.setIsActive(true);
      if (!!res) {
        addTransaction(res.hash, {
          type: 'toggle-activation',
        });
        setError(undefined);
      }
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }, []);

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

  const incrementAmountToMint = useCallback(() => {
    setAmountToMint(amountToMint + 1);
  }, [amountToMint, setAmountToMint]);
  const decrementAmountToMint = useCallback(() => {
    if (amountToMint == 1) {
      return;
    }
    setAmountToMint(amountToMint - 1);
  }, [amountToMint, setAmountToMint]);

  const stateObject = useMemo(() => {
    return {
      collectionMetadata,
      rendererMetadata,
      brainfuckCode,
      currentSampleTokenRenderState,
      currentTokenId,
      currentSampleTokenId,
      setCurrentSampleTokenId,
      collectionAddress: address,
      activateCollection,
      isActive,
      isOwner,
      amountToMint,
      setAmountToMint,
      incrementAmountToMint,
      decrementAmountToMint,
    };
  }, [
    currentSampleTokenRenderState,
    currentTokenId,
    currentSampleTokenId,
    setCurrentSampleTokenId,
    collectionMetadata,
    rendererMetadata,
    brainfuckCode,
    address,
    activateCollection,
    isActive,
    isOwner,
    amountToMint,
    setAmountToMint,
    incrementAmountToMint,
    decrementAmountToMint,
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
