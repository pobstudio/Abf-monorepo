import { BigNumber } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { usePriorityAccount } from '../connectors/priority';
import { useTransactionsStore } from '../stores/transaction';
import { TransactionStatus } from '../types/transaction';
import { useBrainFuckContract } from './useContracts';
import { useTxn } from './useTxn';

export const useMintBrainfuckNFT = (address: string | undefined) => {
  const addTransaction = useTransactionsStore((s) => s.addTransaction);
  const brainFuckContract = useBrainFuckContract(address);
  const account = usePriorityAccount();
  const [error, setError] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const mint = useCallback(
    async (mintAmount: number = 1) => {
      if (!account || !address || !brainFuckContract) {
        return;
      }
      try {
        setIsLoading(true);
        // TODO: if this data is anywhere locally, better to use that over making a ETH call
        const price = await brainFuckContract.price();

        const res = await brainFuckContract.mint(
          account,
          BigNumber.from(mintAmount),
          {
            value: price.mul(mintAmount),
          },
        );

        if (!!res) {
          addTransaction(res.hash, {
            type: 'mint-token',
            collection: address,
          });
          setError(undefined);
        }
      } catch (e) {
        console.error(e);
        setError(e);
      }
      setIsLoading(false);
    },
    [brainFuckContract, setIsLoading, address, account],
  );

  const tx = useTxn(
    useMemo(
      () => ({
        type: 'mint-token',
        collection: address ?? '',
      }),
      [address],
    ),
  );

  const txStatus: TransactionStatus | undefined = useMemo(
    () => tx?.status,
    [tx],
  );

  return useMemo(() => {
    return {
      error,
      tx,
      txStatus,
      mint,
      isLoading,
    };
  }, [isLoading, error, tx, txStatus, mint]);
};
