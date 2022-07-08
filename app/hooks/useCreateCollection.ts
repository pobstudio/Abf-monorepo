import { utils } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePriorityAccount } from '../connectors/priority';
import { NULL_ADDRESS, NULL_HASH } from '../constants';
import { useProjectBuilderContext } from '../contexts/projectBuilder';
import { useTransactionsStore } from '../stores/transaction';
import { TransactionStatus } from '../types/transaction';
import { convertStrToHexStr } from '../utils/hex';
import { useBrainFuckFactoryContract } from './useContracts';
import { useProvider } from './useProvider';
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
        constants: projectMetadata.constants ?? NULL_HASH,
        code: convertStrToHexStr(projectMetadata.code ?? ''),
        renderer: projectMetadata.renderer ?? NULL_ADDRESS,
        mintingSupply: projectMetadata.mintingSupply ?? 0,
        price: utils.parseEther(projectMetadata.priceInEth?.toString() ?? '0'),
        royaltyFraction: projectMetadata.royaltyFractionInBps ?? 0,
        isActive: projectMetadata.isActive ?? false,
        rendererRoyaltyFraction: projectMetadata.rendererRoyaltyFraction ?? 0,
        whitelistToken: projectMetadata.whitelistToken ?? NULL_ADDRESS,
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

  const [contractAddress, setContractAddress] = useState<
    string | undefined | null
  >(undefined);
  const provider = useProvider();
  useEffect(() => {
    if (contractAddress !== undefined) {
      return;
    }
    if (tx?.status !== 'success') {
      return;
    }
    if (!provider) {
      return;
    }
    const getContractAddress = async () => {
      const receipt = await provider.getTransactionReceipt(tx.hash);
      const filteredLogs = receipt.logs.filter(
        (l) =>
          l.topics[0] ===
          '0x070a766594eff59d7909f901e86526c662cf0e0d9ae3feee0824792b06d2c0ee',
      );
      if (filteredLogs.length !== 1) {
        setContractAddress(null);
        return;
      }
      const decodedLogData = utils.defaultAbiCoder.decode(
        ['address', 'address'],
        filteredLogs[0].data,
      );
      if (!!decodedLogData[0]) {
        setContractAddress(decodedLogData[0]);
      }
    };
    getContractAddress();
  }, [provider, tx]);

  return useMemo(() => {
    return {
      error,
      tx,
      txStatus,
      create,
      contractAddress,
      isLoading,
    };
  }, [isLoading, contractAddress, error, tx, txStatus, create]);
};
