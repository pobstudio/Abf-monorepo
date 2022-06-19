import { IPFS_FALLBACK_LINKS } from '../constants';
import { IPFS_CID_CACHE } from '../data/ipfs';

export const getIPFSMetadata = async (hash: string) => {
  const rootHash =
    hash.indexOf('/') !== -1 ? hash.slice(0, hash.indexOf('/')) : hash;
  const url = hash.indexOf('/') !== -1 ? hash.slice(hash.indexOf('/') + 1) : '';
  for (const urlGenerator of IPFS_FALLBACK_LINKS) {
    const results = await fetch(urlGenerator(rootHash, url));
    if (results.ok) {
      return { cid: hash, ...(await results.json()) };
    }
  }
  return undefined;
};

export const getIPFSMetadataWithCache = async (hash: string) => {
  if (!!IPFS_CID_CACHE[hash]) {
    return JSON.parse(IPFS_CID_CACHE[hash]);
  }
  return await getIPFSMetadata(hash);
};
