import { useEffect, useState } from 'react';

export const useLastTruthyValue = <T>(value: T) => {
  const [truthyValue, setValue] = useState<T | undefined>(undefined);
  useEffect(() => {
    if (!!value) {
      setValue(value);
    }
  }, [value]);

  return truthyValue;
};
