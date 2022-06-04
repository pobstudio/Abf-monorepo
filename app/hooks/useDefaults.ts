import { deployments } from '@abf-monorepo/protocol';
import { utils } from 'ethers';
import { useMemo } from 'react';
import { CHAIN_ID } from '../constants';
import { ProjectMetadata } from '../types';

export const useDefaultSeed = () => {
  return useMemo(() => {
    const input = Date.now().toString(16);
    return utils
      .keccak256('0x' + (input.length % 2 === 1 ? '0' : '') + input)
      .slice(0, 24);
  }, []);
};

export const DEFAULT_RENDERER_KEY = 'pixelGrid16';
export const DEFAULT_INPUT_CONSTANTS = '0x'.padEnd(18, '0');

export const useDefaultProjectMetadata = (): Partial<ProjectMetadata> => {
  const seed = useDefaultSeed();
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
