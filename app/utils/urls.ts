import { BigNumber } from 'ethers';
import { CHAIN_ID, CHAIN_ID_TO_NETWORK_NAME, IPFS_LINK } from '../constants';

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
  return `https://${
    CHAIN_ID === 1 ? '' : `${CHAIN_ID_TO_NETWORK_NAME[CHAIN_ID]}.`
  }etherscan.io/tx/${txhash}`;
};

export const getEtherscanAddressUrl = (address: string) => {
  return `https://${
    CHAIN_ID === 1 ? '' : `${CHAIN_ID_TO_NETWORK_NAME[CHAIN_ID]}.`
  }etherscan.io/address/${address}`;
};

export const getIPFSUrl = (cid: string) => {
  return `${IPFS_LINK}/${
    cid.startsWith('ipfs://') ? cid.slice('ipfs://'.length) : cid
  }`;
};
