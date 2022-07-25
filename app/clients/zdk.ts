import { ZDK, ZDKChain, ZDKNetwork } from '@zoralabs/zdk';
import { CHAIN_ID, ZORA_API_KEY } from '../constants';

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: CHAIN_ID === 1 ? ZDKChain.Mainnet : ZDKChain.Mainnet, // MAINNET only right now
};
const API_ENDPOINT = 'https://api.zora.co/graphql';
const args = {
  endPoint: API_ENDPOINT,
  networks: [networkInfo],
  apiKey: ZORA_API_KEY,
};

export const zdk = new ZDK(args); // All arguments are optional
