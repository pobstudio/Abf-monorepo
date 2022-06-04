import {
  BrainFuckFactory__factory,
  BrainFuck__factory,
  deployments,
  IRenderer__factory,
} from '@abf-monorepo/protocol';
import { useMemo } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { usePriorityAccount } from '../connectors/priority';
import { getProviderOrSigner } from '../clients/provider';
import { useProvider } from './useProvider';
import { CHAIN_ID } from '../constants';

export const useRendererContract = (
  address: string | undefined,
  shouldUseFallback: boolean = false,
) => {
  const account = usePriorityAccount();
  const provider = useProvider(shouldUseFallback);

  return useMemo(() => {
    if (!account && !provider) {
      return;
    }

    if (!address) {
      return;
    }
    return IRenderer__factory.connect(
      address,
      getProviderOrSigner(provider as JsonRpcProvider, account as string),
    );
  }, [account, address, provider]);
};

export const useBrainFuckFactoryContract = (
  shouldUseFallback: boolean = false,
) => {
  const account = usePriorityAccount();
  const provider = useProvider(shouldUseFallback);

  return useMemo(() => {
    if (!account && !provider) {
      return;
    }

    return BrainFuckFactory__factory.connect(
      deployments[CHAIN_ID].core.factory,
      getProviderOrSigner(provider as JsonRpcProvider, account as string),
    );
  }, [account, provider]);
};
