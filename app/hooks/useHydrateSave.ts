import Router from 'next/router';
import { useEffect, useMemo } from 'react';
import { btoa } from 'isomorphic-base64';
import { escapeUnicode } from '../utils/hex';

export const useHydrateSave = <T>(obj: T) => {
  // dehydrate
  const encodedObj = useMemo(() => {
    if (!obj) {
      return undefined;
    }
    if (JSON.stringify(obj) === '{}') {
      return undefined;
    }
    return btoa(JSON.stringify(obj));
  }, [obj]);

  useEffect(() => {
    if (!encodedObj) {
      return;
    }
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
