import create from 'zustand';
import produce from 'immer';
import { TransactionReceipt } from '@ethersproject/providers';

type State = {
  transactionMap: TransactionMap;
  updateTransactionMap: (updateFn: (update: any) => void) => void;
  addTransaction: (hash: string, metadata: TransactionMetadata) => void;
};

export const useTransactionsStore = create<State>((set, get) => ({
  transactionMap: {},
  updateTransactionMap: (updateFn: (update: any) => void) => {
    set(
      produce((update) => {
        updateFn(update.transactionMap);
      }),
    );
  },
  addTransaction: (hash: string, metadata: TransactionMetadata) => {
    get().updateTransactionMap((u) => {
      u[hash] = {
        hash,
        status: 'in-progress',
        metadata,
      } as TransactionObject;
    });
  },
}));
