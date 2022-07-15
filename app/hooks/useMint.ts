import { useCallback, useMemo, useState } from 'react';
import { usePriorityAccount } from '../connectors/priority';
import { useTransactionsStore } from '../stores/transaction';
import { TransactionStatus } from '../types/transaction';
import { useBrainFuckContract } from './useContracts';

export const useMintBrainfuckNFT = (address: string | undefined) => {
  const addTransaction = useTransactionsStore((s) => s.addTransaction);
  const transactionMap = useTransactionsStore((s) => s.transactionMap);
  const factory = useBrainFuckContract(address);
  const account = usePriorityAccount();
  const [error, setError] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const mint = useCallback(
    async (mintAmount: number = 1) => {
      if (!account || !address || !factory) {
        return;
      }
      try {
        setIsLoading(true);
        const res = await factory.mint(account, mintAmount);

        if (!!res) {
          addTransaction(res.hash, {
            type: 'mint-token',
          });
          setError(undefined);
        }
      } catch (e) {
        console.error(e);
        setError(e);
      }
      setIsLoading(false);
    },
    [factory, setIsLoading, address, account],
  );

  const tx = useMemo(() => {
    const justAddedTxs = Object.values(transactionMap).filter(
      (tx) => !tx.lastBlockNumChecked && tx.metadata.type === 'mint-token',
    );
    const updatedTxs = Object.values(transactionMap)
      .filter(
        (tx) => !!tx.lastBlockNumChecked && tx.metadata.type === 'mint-token',
      )
      .sort(
        (a, b) =>
          (b.lastBlockNumChecked as number) - (a.lastBlockNumChecked as number),
      );
    const possibleTxs = [...justAddedTxs, ...updatedTxs];
    return possibleTxs[0];
  }, [transactionMap]);

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
