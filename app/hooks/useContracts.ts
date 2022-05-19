import { IRenderer__factory } from '@abf-monorepo/protocol';
import { useMemo } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { usePriorityAccount } from '../connectors/priority';
import { getProviderOrSigner } from '../clients/provider';
import { useProvider } from './useProvider';

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
