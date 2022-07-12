require('dotenv').config();
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import { HardhatUserConfig } from 'hardhat/config';
import { NetworksUserConfig } from 'hardhat/types';
import './tasks';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const {
  RINKEBY_NETWORK_RPC_URL,
  RINKEBY_PRIVATE_KEY,
  MAINNET_PRIVATE_KEY,
  MAINNET_NETWORK_RPC_URL,
  GOERLI_PRIVATE_KEY,
  GOERLI_NETWORK_RPC_URL,
  ETHERSCAN_API_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {},
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY ?? '',
  },
};

if (RINKEBY_NETWORK_RPC_URL && RINKEBY_PRIVATE_KEY) {
  (config.networks as NetworksUserConfig).rinkeby = {
    url: RINKEBY_NETWORK_RPC_URL,
    accounts: [RINKEBY_PRIVATE_KEY],
  };
}

if (MAINNET_NETWORK_RPC_URL && MAINNET_PRIVATE_KEY) {
  (config.networks as NetworksUserConfig).mainnet = {
    url: MAINNET_NETWORK_RPC_URL,
    accounts: [MAINNET_PRIVATE_KEY],
  };
}

if (GOERLI_NETWORK_RPC_URL && GOERLI_PRIVATE_KEY) {
  (config.networks as NetworksUserConfig).goerli = {
    url: GOERLI_NETWORK_RPC_URL,
    accounts: [GOERLI_PRIVATE_KEY],
  };
}
export default config;
