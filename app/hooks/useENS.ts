import { invert } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import { useEnsStore } from '../stores/ens';
import { shortenHexString } from '../utils/hex';
import { useProvider } from './useProvider';

export const useENSLookup = (address?: string | undefined | null) => {
  const ensNameFromStore = useEnsStore(
    useCallback(
      (s) => (!!address ? s.addressToEnsMap[address] : undefined),
      [address],
    ),
  );
  const setEns = useEnsStore((s) => s.setEns);
  const provider = useProvider();

  useEffect(() => {
    if (!provider) {
      return;
    }
    if (!address) {
      return;
    }
    provider.lookupAddress(address).then((v) => !!v && setEns(address, v));
  }, [provider]);

  return useMemo(() => ensNameFromStore, [ensNameFromStore]);
};

export const useResolveToEnsLookup = (name?: string | undefined | null) => {
  const ensNameFromStore = useEnsStore(
    useCallback(
      (s) => (!!name ? invert(s.addressToEnsMap)[name] : undefined),
      [name],
    ),
  );
  const isValidEnsSearch = useMemo(() => {
    return !!name && name.endsWith('.eth');
  }, [name]);
  const setEns = useEnsStore((s) => s.setEns);
  const provider = useProvider();

  useEffect(() => {
    if (!provider) {
      return;
    }
    if (!name) {
      return;
    }
    if (!isValidEnsSearch) {
      return;
    }
    provider.resolveName(name).then((v) => !!v && setEns(v, name));
  }, [provider, isValidEnsSearch]);

  return useMemo(() => ensNameFromStore, [ensNameFromStore]);
};

export const useENSorHex = (
  address?: string | undefined | null,
  defaultText?: string,
): string => {
  const ens = useENSLookup(address);
  return useMemo(() => {
    if (!address) {
      return defaultText ?? '';
    }
    return ens ?? shortenHexString(address ?? '');
  }, [address, defaultText, ens]);
};
