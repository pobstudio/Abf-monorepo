require('dotenv').config();

import { deployments } from '@abf-monorepo/protocol';
import { readFile, writeFile } from 'fs';
import { Blob, NFTStorage } from 'nft.storage';
import { promisify } from 'util';

console.log(deployments);
const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);

const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: NFT_STORAGE_API_KEY ?? '' });

(async () => {
  console.log('Uploading JSON');
  console.log();

  const obj = {
    description:
      'Compact data middleware renderer, pads the hex string (prefix and suffix) with paddingByte. Data converted from a tuple format to raw byte string. Designed to conserve on-chain data.',
    sampleOptions: {
      input:
        '0x6f6cAf3012896bA475838eC0a8A273776828ff3A040014000003000101040104020403',
    },
    previewOptions: {
      byteGroups: [
        {
          numGroups: '1',
          groupBytesIn: 20,
          label: 'Source Renderer',
        },
        {
          numGroups: '1',
          groupBytesIn: 1,
          label: 'Num Prefix Bytes (bytes prefixed to the decompressed data)',
        },
        {
          numGroups: '1',
          groupBytesIn: 2,
          label: 'Total Size',
        },
        {
          numGroups: '1',
          groupBytesIn: 2,
          label: 'Size of padding prefix',
        },
        {
          numGroups: 'infinity',
          groupBytesIn: 1,
          label: 'Source Renderer Props',
        },
      ],
    },
  };
  const metadataBlob = new Blob([JSON.stringify(obj)]);
  const rootCid = await client.storeBlob(metadataBlob);
  console.log(rootCid, JSON.stringify(obj));
})();
