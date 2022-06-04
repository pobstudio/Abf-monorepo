import { ethers } from 'ethers';
import { useMemo } from 'react';

export const useHash = (obj: object) => {
  return useMemo(
    () =>
      ethers.utils.keccak256(
        JSON.stringify(obj)
          .split('')
          .map((c) => c.charCodeAt(0)),
      ),
    [obj],
  );
};
