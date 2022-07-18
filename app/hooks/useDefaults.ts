import { deployments } from '@abf-monorepo/protocol';
import { utils } from 'ethers';
import { atob } from 'isomorphic-base64';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { CHAIN_ID } from '../constants';
import { TutorialMetadata } from '../contexts/tutorial';
import { ProjectMetadata } from '../types';
import { INPUT_CONSTANT_BYTES_SIZE } from '../utils/brainFuck';

export const useDefaultSeed = (refresh?: any) => {
  return useMemo(() => {
    const input = Date.now().toString(16);
    return utils
      .keccak256('0x' + (input.length % 2 === 1 ? '0' : '') + input)
      .slice(0, 24);
  }, [refresh]);
};

export const DEFAULT_RENDERER_KEY = 'monoPixelGrid16';
export const DEFAULT_INPUT_CONSTANTS = '0xFF'.padEnd(
  INPUT_CONSTANT_BYTES_SIZE * 2 + 2,
  '0',
);
export const DEFAULT_PROJECT_METADATA_STUB: Partial<ProjectMetadata> = {
  inputConstants: DEFAULT_INPUT_CONSTANTS,
  renderer: deployments[CHAIN_ID].renderers[DEFAULT_RENDERER_KEY],
  isActive: false,
  royaltyFractionInBps: 0,
  code: ',[.-].',
  mintingSupply: 4,
};

export const useDefaultProjectMetadata = (
  refresh?: any,
): Partial<ProjectMetadata> => {
  const seed = useDefaultSeed(refresh);
  return useMemo(() => {
    return {
      ...DEFAULT_PROJECT_METADATA_STUB,
      seed: seed,
    };
  }, [seed]);
};

export const useMinimizedProjectMetadata = (
  metadata: Partial<ProjectMetadata>,
) => {
  return useMemo(() => {
    const minimizedObject: any = {};
    for (const key of Object.keys(metadata)) {
      if (
        (metadata as any)[key] !== (DEFAULT_PROJECT_METADATA_STUB as any)[key]
      ) {
        if (key === 'rendererMetadataStub') {
          continue;
        }
        minimizedObject[key] = (metadata as any)[key];
      }
    }
    return minimizedObject as Partial<ProjectMetadata>;
  }, [metadata]);
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
        setSavedProjectMetadata({
          ...defaultProjectMetadata,
          ...(obj as Partial<ProjectMetadata>),
        });
        return;
      }
    } catch (e) {}
    setHasHydrated(true);
    setSavedProjectMetadata(defaultProjectMetadata);
  }, [router]);

  return useMemo(() => savedProjectMetadata, [savedProjectMetadata]);
};

export const useSavedOrDefaultTutorialMetadata = (
  getDefaultTutorialMetadata: () => Partial<TutorialMetadata>,
): Partial<TutorialMetadata> => {
  const defaultChallengeMetadata = getDefaultTutorialMetadata();

  const router = useRouter();

  const [hasHydrated, setHasHydrated] = useState(false);

  const [savedTutorialMetadata, setSavedTutorialMetadata] = useState<
    Partial<TutorialMetadata>
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
        setSavedTutorialMetadata({
          ...defaultChallengeMetadata,
          ...(obj as Partial<TutorialMetadata>),
        });
        return;
      }
    } catch (e) {}
    setHasHydrated(true);
    setSavedTutorialMetadata(defaultChallengeMetadata);
  }, [router]);

  return useMemo(() => savedTutorialMetadata, [savedTutorialMetadata]);
};
