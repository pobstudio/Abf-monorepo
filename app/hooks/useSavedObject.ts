import { btoa } from 'isomorphic-base64';
import Router from 'next/router';
import { useEffect, useMemo } from 'react';

export const useHydrateSave = <T>(obj: T) => {
  // dehydrate
  const encodedObj = useMemo(() => {
    return btoa(JSON.stringify(obj));
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
};
