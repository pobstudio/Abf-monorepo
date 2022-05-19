import { deployments } from '@abf-monorepo/protocol';
import { BigNumber } from 'ethers';
import { CHAIN_ID, IPFS_LINK } from '../constants';

export const getOpenSeaUrl = (address: string, tokenId: string) => {
  return `https://${
    CHAIN_ID === 1 ? '' : 'testnets.'
  }opensea.io/assets/${address}/${BigNumber.from(tokenId).toString()}`;
};

export const getOpenSeaAccountUrl = (address: string) => {
  return `https://${
    CHAIN_ID === 1 ? '' : 'testnets.'
  }opensea.io/accounts/${address}`;
};

export const getEtherscanTxUrl = (txhash: string) => {
  return `https://${CHAIN_ID === 1 ? '' : 'goerli.'}etherscan.io/tx/${txhash}`;
};

export const getEtherscanAddressUrl = (address: string) => {
  return `https://${
    CHAIN_ID === 1 ? '' : 'goerli.'
  }etherscan.io/address/${address}`;
};

export const getIPFSUrl = (cid: string) => {
  return `${IPFS_LINK}/${
    cid.startsWith('ipfs://') ? cid.slice('ipfs://'.length) : cid
  }`;
};
