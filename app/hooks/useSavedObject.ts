import { useEffect, useMemo, useState } from "react";
import { btoa } from 'isomorphic-base64';
import Router, { useRouter } from "next/router";

export const useSavedObject = <T>(obj: T) => {
  const [savedObject, setSavedObject] = useState<T>(obj);

  const router = useRouter();

  const encodedObj = useMemo(() => {
    return btoa(JSON.stringify(obj));
  }, [obj]);

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const save = router.query.save;
    if (!hasHydrated && typeof save === 'string') {
      setHasHydrated(true);
      setSavedObject(JSON.parse(decodeURIComponent(save)));
    }
  }, [router]);

  useEffect(() => {
    if (hasHydrated) {
      setSavedObject(obj);
    }
  }, [obj]);

  // dehydrate
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

  return [savedObject, encodedObj] as [T, string];
}