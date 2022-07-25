import * as alchemySdk from '@alch/alchemy-sdk';
import { ALCHEMY_KEY, CHAIN_ID } from '../constants';

const settings = {
  apiKey: ALCHEMY_KEY,
  network:
    CHAIN_ID === 1
      ? alchemySdk.Network.ETH_MAINNET
      : alchemySdk.Network.ETH_RINKEBY,
  maxRetries: 10,
};

export const alchemy = alchemySdk;
export const alchemyClient = alchemySdk.initializeAlchemy(settings);
