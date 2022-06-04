import { TransactionReceipt } from '@ethersproject/providers';

export type TransactionStatus = 'in-progress' | 'success' | 'failed';

export interface CreateCollectionTransactionMetadata {
  type: 'create-collection';
  hashedProjectMetadata: string;
}

export type TransactionMetadata = CreateCollectionTransactionMetadata;

export interface TransactionObject {
  hash: string;
  status: TransactionStatus;
  metadata: TransactionMetadata;
  receipt?: TransactionReceipt;
  lastBlockNumChecked?: number;
}
