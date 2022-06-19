import { useMemo } from 'react';
import useSWR from 'swr';
import { getIPFSMetadataWithCache } from '../utils/ipfs';

export const useIPFSJson = (cid: string | undefined) => {
  const { data } = useSWR(
    useMemo(() => {
      if (!cid) {
        return null;
      }
      return cid;
    }, [cid]),
    getIPFSMetadataWithCache,
    {},
  );
  return useMemo(() => {
    if (!data) {
      return undefined;
    }
    return data;
  }, [data]);
};
