import { isEqual } from 'lodash';
import { useMemo } from 'react';
import { useTransactionsStore } from '../stores/transaction';
import { TransactionMetadata } from '../types/transaction';

export const useTxn = (txnMetadata: TransactionMetadata) => {
  const transactionMap = useTransactionsStore((s) => s.transactionMap);
  const possibleTxs = useMemo(() => {
    const justAddedTxs = Object.values(transactionMap).filter(
      (tx) => !tx.lastBlockNumChecked && isEqual(tx.metadata, txnMetadata),
    );
    const updatedTxs = Object.values(transactionMap)
      .filter(
        (tx) => !!tx.lastBlockNumChecked && isEqual(tx.metadata, txnMetadata),
      )
      .sort(
        (a, b) =>
          (b.lastBlockNumChecked as number) - (a.lastBlockNumChecked as number),
      );
    return [...justAddedTxs, ...updatedTxs];
  }, [transactionMap, txnMetadata]);

  const tx = useMemo(() => {
    return possibleTxs[0];
  }, [possibleTxs]);

  return tx;
};
