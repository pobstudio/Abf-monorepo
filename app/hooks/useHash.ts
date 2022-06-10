import { ethers } from 'ethers';
import { useMemo } from 'react';

export const useHash = (obj: object) => {
  return useMemo(() => {
    const byteArr = JSON.stringify(obj)
      .split('')
      .map((c) => c.charCodeAt(0));
    return ethers.utils.keccak256(
      byteArr.concat(byteArr.length % 2 === 1 ? [0] : []),
    );
  }, [obj]);
};
