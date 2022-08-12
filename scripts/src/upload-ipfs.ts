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
      'Layering composite render. Use "encodeProps" to encode a collection of renderers + renderers props. Each renderer provided output is layerd on top of each other with the lowest index being in the foreground.',
    sampleOptions: {
      input:
        '0x182D57A858FcB93Be44B6d69dbB46ACD04d0E291000000000000000000000000000000000000000000000000000000000000001f040404ff1e00e8f9fd59ce8f00000000000000030303030000000000000000182D57A858FcB93Be44B6d69dbB46ACD04d0E291000000000000000000000000000000000000000000000000000000000000001f0404042c3333395b64a5c9cae7f6f201010101020202020303030304040404',
    },
    previewOptions: {
      byteGroups: [],
    },
  };

  const metadataBlob = new Blob([JSON.stringify(obj)]);
  const rootCid = await client.storeBlob(metadataBlob);
  console.log(rootCid, JSON.stringify(obj));
})();
