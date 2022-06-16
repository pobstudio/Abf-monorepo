import { utils } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { usePriorityAccount } from '../connectors/priority';
import { NULL_ADDRESS } from '../constants';
import { useProjectBuilderContext } from '../contexts/projectBuilder';
import { useTransactionsStore } from '../stores/transaction';
import { TransactionStatus } from '../types/transaction';
import { convertStrToHexStr } from '../utils/hex';
import { useBrainFuckFactoryContract } from './useContracts';
import { useTxn } from './useTxn';

export const useCreateCollection = () => {
  const addTransaction = useTransactionsStore((s) => s.addTransaction);
  const factory = useBrainFuckFactoryContract();
  const account = usePriorityAccount();
  const [error, setError] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { hashedProjectMetadata, projectMetadata } = useProjectBuilderContext();
  const tx = useTxn(
    useMemo(
      () => ({
        hashedProjectMetadata: hashedProjectMetadata ?? '',
        type: 'create-collection',
      }),
      [hashedProjectMetadata],
    ),
  );

  const txStatus: TransactionStatus | undefined = useMemo(
    () => tx?.status,
    [tx],
  );

  const create = useCallback(async () => {
    if (!hashedProjectMetadata) {
      return;
    }
    if (!projectMetadata) {
      return;
    }
    if (!factory) {
      return;
    }
    try {
      setIsLoading(true);
      const config = {
        name: projectMetadata.name ?? '',
        symbol: projectMetadata.symbol ?? '',
        additionalMetadataURI: projectMetadata.additionalMetadataURI ?? '',
        seed: projectMetadata.seed ?? '0x00',
        constants: projectMetadata.constants ?? '0x00',
        code: convertStrToHexStr(projectMetadata.code ?? ''),
        renderer: projectMetadata.renderer ?? NULL_ADDRESS,
        mintingSupply: projectMetadata.mintingSupply ?? 0,
        price: utils.parseEther(projectMetadata.priceInEth?.toString() ?? '0'),
        royaltyFraction: projectMetadata.royaltyFractionInBps ?? 0,
        isActive: projectMetadata.isActive ?? false,
        rendererRoyaltyFraction: projectMetadata.rendererRoyaltyFraction ?? 0,
      };

      const res = await factory.createNFT(config);

      if (!!res) {
        addTransaction(res.hash, {
          type: 'create-collection',
          hashedProjectMetadata,
        });
        setError(undefined);
      }
    } catch (e) {
      console.error(e);
      setError(e);
    }
    setIsLoading(false);
  }, [factory, setIsLoading, hashedProjectMetadata, projectMetadata, account]);

  return useMemo(() => {
    return {
      error,
      tx,
      txStatus,
      create,
      isLoading,
    };
  }, [isLoading, error, tx, txStatus, create]);
};
