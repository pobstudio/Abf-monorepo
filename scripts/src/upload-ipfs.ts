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
    "description": "A multi-frame gif renderer. Provide bytes in the following format: 1 byte width + 1 byte height + 1 byte # colors + array of RGB colors + frame 1 image data + frame 2 image data... Image data is a width * height sized byte array of indexes to the RGB colors provided earlier. NOTE: colors start from index 1, the zeroth index is reserved for transparency.",
    "sampleOptions": {
    "input": "0x0404050000002C3333395B64A5C9CAE7F6F201010101020202020303030304040404"
    },
    "previewOptions": {
    "byteGroups": [
    {
    "numGroups": "1",
    "groupBytesIn": 1,
    "label": "Width"
    },
    {
    "numGroups": "1",
    "groupBytesIn": 1,
    "label": "Height"
    },
    {
    "numGroups": "1",
    "groupBytesIn": 1,
    "label": "Num Colors"
    },
    {
    "numGroups": "variable.2",
    "groupBytesIn": 3,
    "label": "Colors"
    },
    {
    "numGroups": "infinity",
    "groupBytesIn": 1,
    "label": "Image Data"
    }
    ]
    }
    };
  const metadataBlob = new Blob([JSON.stringify(obj)]);
  const rootCid = await client.storeBlob(metadataBlob);
  console.log(rootCid, JSON.stringify(obj));
})();
