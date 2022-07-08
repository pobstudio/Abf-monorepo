import { ADDRESS_REGEX } from '@abf-monorepo/types';
import { utils } from 'ethers';
import { useMemo } from 'react';

export const useAddress = (address: string | undefined) => {
  return useMemo(() => {
    if (!address) {
      return undefined;
    }
    if (!ADDRESS_REGEX.test(address)) {
      return undefined;
    }
    return utils.getAddress(address);
  }, [address]);
};
