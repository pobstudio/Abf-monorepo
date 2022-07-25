import { BigNumber } from 'ethers';
/**
 * Global app related constants
 */
export const CHAIN_ID = parseInt('4'); // process.env.NEXT_PUBLIC_CHAIN_ID ?? '1');

/**
 * Data constants
 */
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const NULL_HASH =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export const MAX_UINT = BigNumber.from(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);
export const ZERO = BigNumber.from(0);
export const MIN_BLOCK_CONFIRMATIONS = 35;
export const HUNDRED_PERCENT_BPS = 10000;
export const CHAIN_ID_TO_NETWORK_NAME: { [chainId: number]: string } = {
  4: 'rinkeby',
  5: 'goerli',
  1: 'mainnet',
};

/**
 * Environment/keys
 */
export const ALCHEMY_KEY =
  (CHAIN_ID === 1
    ? process.env.NEXT_PUBLIC_ALCHEMY_KEY
    : process.env.NEXT_PUBLIC_TEST_ALCHEMY_KEY) || '';
export const MAINNET_ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY || '';
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
export const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY || '';
export const ZORA_API_KEY = process.env.ZORA_API_KEY || '';

/**
 * Links
 */
export const IPFS_LINK = `https://public-pob-studio.mypinata.cloud/ipfs`;

export const IPFS_FALLBACK_LINKS = [
  (hash: string, url: string) => `${IPFS_LINK}/${hash}/${url}`,
  (hash: string, url: string) => `https://ipfs.io/ipfs/${hash}/${url}`,
  (hash: string, url: string) => `https://${hash}.ipfs.dweb.link/${url}`,
];

export const PRIVATE_GATEWAY_IPFS_LINK = `https://pob-studio.mypinata.cloud/ipfs`;
export const STUDIO_PROD_LINK = 'https://pob.studio';
export const SHOP_PROD_LINK = 'https://shop.pob.studio';
export const PROD_LINK = 'https://abf.dev';

export const TWITTER_HANDLE = `@abf_dev`;
export const TWITTER_LINK = `https://twitter.com/abf_dev`;
export const DISCORD_LINK = `https://discord.gg/dvkey2pkyJ`;
export const GITHUB_LINK = `https://github.com/proofofbeauty/ABF-monorepo`;

export const DEFAULT_TITLE = `ABF - Absolute Brain F**k. ${TWITTER_HANDLE}`;
export const DEFAULT_DESCRIPTION = `ABF is a hyperstructure to deploy, mint, and create on-chain generative art NFTs. No fees + fully self-controlled NFT contracts designed to last forever. `;

export const NFT_LICENSE_LINK = `https://www.nftlicense.org`;
export const PREVIEW_IMAGE_LINK = `https://abf-preview.vercel.app`;

export const SUBGRAPH_LINK = `https://api.thegraph.com/subgraphs/name/proofofbeauty/abf${
  CHAIN_ID === 1 ? '' : `-${CHAIN_ID_TO_NETWORK_NAME[CHAIN_ID]}`
}`;
export const BRAINFUCK_DOCS_LINK = `https://gist.github.com/roachhd/dce54bec8ba55fb17d3a`;

// OG banners
export const GLOBAL_OG_BANNER = `${PROD_LINK}/assets/og.png`;

/**
 * Dimensions
 */
