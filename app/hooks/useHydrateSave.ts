import Router from 'next/router';
import { useEffect, useMemo } from 'react';

export const useHydrateSave = <T>(obj: T) => {
  // dehydrate
  const encodedObj = useMemo(() => {
    return encodeURI(JSON.stringify(obj));
  }, [obj]);

  useEffect(() => {
    Router.push(
      {
        query: { save: encodedObj },
      },
      undefined,
      {
        scroll: false,
      },
    );
  }, [encodedObj]);

  return encodedObj;
};
