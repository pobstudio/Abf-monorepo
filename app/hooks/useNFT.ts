import { useMemo } from 'react';
import useSWR from 'swr';
import { ROUTES } from '../constants/routes';
import { fetchJSON } from '../utils/fetchJSON';

export const useNftsForCollection = (collectionAddress: string) => {
  const { data } = useSWR(
    useMemo(
      () =>
        !!collectionAddress
          ? `${ROUTES.API.NFTS}?contract=${collectionAddress}` // DOES NOT WORK FOR RINKEBY
          : null,
      [collectionAddress],
    ),
    fetchJSON,
    {},
  );

  return useMemo(() => {
    if (!data) {
      return undefined;
    }
    console.log(data);
    return data;
  }, [data]);
};
