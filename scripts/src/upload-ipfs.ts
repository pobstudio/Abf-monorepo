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
      "A configured single frame gif renderer. Configure the size and colors of a drawing context via the 'addConfiguration' function. At rendering, provide bytes with the following format: 4 byte configuration index + image data (same format as Single Frame Gif).",
    sampleOptions: {
      input: '0x0000000101010101020202020303030304040404',
    },
    previewOptions: {
      byteGroups: [
        {
          numGroups: '1',
          groupBytesIn: 4,
          label: 'Configuration Index',
        },
        {
          numGroups: 'infinity',
          groupBytesIn: 1,
          label: 'Image Data',
        },
      ],
    },
  };

  const metadataBlob = new Blob([JSON.stringify(obj)]);
  const rootCid = await client.storeBlob(metadataBlob);
  console.log(rootCid, JSON.stringify(obj));
})();
