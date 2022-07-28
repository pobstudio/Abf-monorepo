import { TransactionReceipt } from '@ethersproject/providers';

export type TransactionStatus = 'in-progress' | 'success' | 'failed';

export interface CreateCollectionTransactionMetadata {
  type: 'create-collection';
  hashedProjectMetadata: string;
}

export interface MintTokenTransactionMetadata {
  type: 'mint-token';
  collection: string;
}

export interface CollectionActivationTransactionMetadata {
  type: 'toggle-activation';
}

export type TransactionMetadata =
  | CreateCollectionTransactionMetadata
  | MintTokenTransactionMetadata
  | CollectionActivationTransactionMetadata;

export interface TransactionObject {
  hash: string;
  status: TransactionStatus;
  metadata: TransactionMetadata;
  receipt?: TransactionReceipt;
  lastBlockNumChecked?: number;
}
