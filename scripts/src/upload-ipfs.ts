require('dotenv').config();

import { readFile, writeFile } from 'fs';
import { Blob, NFTStorage } from 'nft.storage';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);

const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: NFT_STORAGE_API_KEY ?? '' });

(async () => {
  console.log('Uploading JSON');
  console.log();

  const obj = {
    description:
      'A 8 by 8 mono-chrome pixel grid. Provide 256 bytes to control the gray hue. 0x00 is black, 0xFF is white.',
    previewOptions: {
      groupBytesIn: 1,
      skipBytesBeforeGrouping: 0,
    },
  };
  const metadataBlob = new Blob([JSON.stringify(obj)]);
  const rootCid = await client.storeBlob(metadataBlob);
  console.log(rootCid, JSON.stringify(obj));
})();
