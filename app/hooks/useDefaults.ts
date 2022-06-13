import { deployments } from '@abf-monorepo/protocol';
import { utils } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { CHAIN_ID } from '../constants';
import { ProjectMetadata } from '../types';

export const useDefaultSeed = (refresh?: any) => {
  return useMemo(() => {
    const input = Date.now().toString(16);
    return utils
      .keccak256('0x' + (input.length % 2 === 1 ? '0' : '') + input)
      .slice(0, 24);
  }, [refresh]);
};

export const DEFAULT_RENDERER_KEY = 'pixelGrid8';
export const DEFAULT_INPUT_CONSTANTS = '0x'.padEnd(18, '0');

export const useDefaultProjectMetadata = (
  refresh?: any,
): Partial<ProjectMetadata> => {
  const seed = useDefaultSeed(refresh);
  return useMemo(() => {
    return {
      seed: seed,
      inputConstants: DEFAULT_INPUT_CONSTANTS,
      renderer: deployments[CHAIN_ID].renderers[DEFAULT_RENDERER_KEY],
      isActive: false,
      additionalMetadataURI: '',
      royaltyFractionInBps: 0,
    };
  }, [seed]);
};

export const useSavedOrDefaultProject = (): Partial<ProjectMetadata> => {
  const defaultProjectMetadata = useDefaultProjectMetadata();

  const router = useRouter();

  const [hasHydrated, setHasHydrated] = useState(false);

  const [savedProjectMetadata, setSavedProjectMetadata] = useState<
    Partial<ProjectMetadata>
  >({});
  useEffect(() => {
    if (hasHydrated) {
      return;
    }
    if (typeof router.query.save !== 'string') {
      return;
    }
    try {
      const save = router.query.save;
      const obj = JSON.parse(atob(save));
      if (Object.keys(obj).length !== 0) {
        setHasHydrated(true);
        setSavedProjectMetadata(obj as Partial<ProjectMetadata>);
        return;
      }
    } catch (e) {}
    setHasHydrated(true);
    setSavedProjectMetadata(defaultProjectMetadata);
  }, [router]);

  return useMemo(() => savedProjectMetadata, [savedProjectMetadata]);
};
