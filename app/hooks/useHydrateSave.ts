import { btoa } from 'isomorphic-base64';
import Router, { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const useEncodedObject = <T>(obj: T) => {
  return useMemo(() => {
    if (!obj || JSON.stringify(obj) === '{}') {
      return undefined;
    }
    return btoa(JSON.stringify(obj));
  }, [obj]);
};
export const useHydrateSave = <T>(obj: T) => {
  const router = useRouter();

  // dehydrate
  const encodedObj = useEncodedObject(obj);

  useEffect(() => {
    // console.log('saving', obj, encodedObj, router.query);
    if (!encodedObj && !router.query.save) {
      return;
    }
    Router.push(
      {
        query: !!encodedObj ? { save: encodedObj } : {},
      },
      undefined,
      {
        scroll: false,
      },
    );
  }, [encodedObj]);

  return encodedObj;
};
