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
      'Tuple data middleware renderer. Provide a source renderer address and renderer props formatted in the following: (# of times to repeat byte, byte to repeat). Designed as a lightweight data compact standard.',
    sampleOptions: {
      input:
        '0x6f6cAf3012896bA475838eC0a8A273776828ff3A030001010401040204030404',
    },
    previewOptions: {
      byteGroups: [
        {
          numGroups: '1',
          groupBytesIn: 20,
          label: 'Source Renderer',
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
