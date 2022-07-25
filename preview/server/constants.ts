import { BigNumber } from 'ethers';

export const RENDER_URL = 'https://www.abf.dev';
export const OG_GRAPH_BANNER: [number, number] = [1200, 627];
export const CHAIN_ID = parseInt(process.env.CHAIN_ID ?? '1');

export const ALCHEMY_KEY =
  CHAIN_ID === 1 ? process.env.ALCHEMY_KEY : process.env.TEST_ALCHEMY_KEY ?? '';

export const ZERO = BigNumber.from(0);

export const FILE_TYPE = 'jpeg';
export const SCREENSHOT_QUALITY = 80;
export const PPI = 300;
export const NATIVE_RATIO: [number, number] = [1, 1];
export const DIMENSIONS: [number, number] = [
  PPI * NATIVE_RATIO[0],
  PPI * NATIVE_RATIO[1],
];
