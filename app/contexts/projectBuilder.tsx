import { BigNumber } from 'ethers';
import produce from 'immer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  HEX_STRING_REGEX,
  INPUT_CONSTANTS_REGEX,
  SEED_REGEX,
} from '../../types/src';
import { HUNDRED_PERCENT_BPS } from '../constants';
import { useAddress } from '../hooks/useAddress';
import {
  useDefaultProjectMetadata,
  useSavedOrDefaultProject,
} from '../hooks/useDefaults';
import { useHash } from '../hooks/useHash';
import {
  useRendererMetadata,
  useRendererMetadataStubByProvider,
} from '../hooks/useRenderer';
import { useHydrateSave } from '../hooks/useSavedObject';
import {
  ProjectMetadata,
  RenderCodeOutputState,
  SampleTokenRenderState,
} from '../types';
import { getTokenSeed, runBrainFuckCode } from '../utils/brainFuck';

export interface ProjectBuilderProviderContext {
  rawProjectMetadata: Partial<ProjectMetadata>;
  projectMetadata: Partial<ProjectMetadata>;
  hashedProjectMetadata: string;
  encodedProjectMetadata: string;
  setRawProjectMetadata: React.Dispatch<
    React.SetStateAction<Partial<ProjectMetadata>>
  >;
  setCurrentSampleTokenId: React.Dispatch<React.SetStateAction<number>>;
  currentSampleTokenRenderState: SampleTokenRenderState;
  onRefresh: () => void;
}

export type ProjectBuilderProviderState = ProjectBuilderProviderContext;

const DEFAULT_CURRENT_SAMPLE_TOKEN_RENDER_STATE: SampleTokenRenderState = {
  tokenId: 0,
  tokenSeed: '0x00',
  codeOutput: undefined,
};

const initialState: ProjectBuilderProviderState = {
  currentSampleTokenRenderState: DEFAULT_CURRENT_SAMPLE_TOKEN_RENDER_STATE,
  rawProjectMetadata: {},
  setRawProjectMetadata: () => new Error('func is not set'),
  setCurrentSampleTokenId: () => new Error('func is not set'),
  onRefresh: () => new Error('func is not set'),
  hashedProjectMetadata: '',
  projectMetadata: {},
  encodedProjectMetadata: '',
};

const ProjectBuilderContext =
  React.createContext<ProjectBuilderProviderState>(initialState);

export const ProjectBuilderProvider: React.FC = ({ children }) => {
  const [currentSampleTokenId, setCurrentSampleTokenId] = useState(0);

  const [rawProjectMetadata, setRawProjectMetadata] = useState<
    Partial<ProjectMetadata>
  >({});

  const initialProjectMetadata = useSavedOrDefaultProject();
  useEffect(() => {
    setRawProjectMetadata(initialProjectMetadata);
  }, [initialProjectMetadata]);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const refreshedProjectMetadata = useDefaultProjectMetadata(refreshCounter);
  useEffect(() => {
    if (!refreshCounter) {
      return;
    }
    setRawProjectMetadata(refreshedProjectMetadata);
  }, [refreshCounter, refreshedProjectMetadata]);
  const onRefresh = useCallback(() => {
    if (!confirm('Just double checking. You sure you want to reset?')) {
      return;
    }
    setRefreshCounter((c) => c + 1);
  }, []);
  const inputConstants = useMemo(() => {
    if (!rawProjectMetadata.inputConstants) {
      return undefined;
    }
    if (
      rawProjectMetadata.inputConstants.length <= 2 ||
      rawProjectMetadata.inputConstants.length > 18
    ) {
      return undefined;
    }
    if (rawProjectMetadata.inputConstants.length % 2 === 1) {
      return undefined;
    }
    const filledInputConstants = rawProjectMetadata.inputConstants.padEnd(
      18,
      '0',
    );
    if (!INPUT_CONSTANTS_REGEX.test(filledInputConstants)) {
      return undefined;
    }
    return filledInputConstants;
  }, [rawProjectMetadata]);

  const seed = useMemo(() => {
    if (!rawProjectMetadata.seed) {
      return undefined;
    }
    if (rawProjectMetadata.seed.length % 2 === 1) {
      return undefined;
    }
    if (!SEED_REGEX.test(rawProjectMetadata.seed)) {
      return undefined;
    }
    return (rawProjectMetadata.seed.length ?? 0) > 2
      ? rawProjectMetadata.seed
      : undefined;
  }, [rawProjectMetadata]);

  const renderer = useAddress(rawProjectMetadata.renderer);
  const rendererMetadata = useRendererMetadata(renderer);
  const rendererMetadataStub = useRendererMetadataStubByProvider(renderer);

  const projectMetadata: Partial<ProjectMetadata> = useMemo(() => {
    return {
      ...rawProjectMetadata,
      inputConstants,
      renderer,
      seed,
      rendererMetadataStub: rendererMetadataStub ?? rendererMetadata,
    };
  }, [
    renderer,
    seed,
    inputConstants,
    rawProjectMetadata,
    rendererMetadataStub,
    rendererMetadata,
  ]);

  const currentSampleTokenRenderState = useMemo((): SampleTokenRenderState => {
    const tokenSeed =
      !!projectMetadata.inputConstants && !!projectMetadata.seed
        ? getTokenSeed(
            projectMetadata.seed,
            BigNumber.from(currentSampleTokenId),
            projectMetadata.inputConstants,
          )
        : undefined;

    const getCodeOutput = (): RenderCodeOutputState => {
      if (!tokenSeed) {
        return undefined;
      }
      if (!projectMetadata?.code) {
        return undefined;
      }
      const input: number[] = [];
      for (let i = 2; i < tokenSeed.length; i += 2) {
        input.push(parseInt(tokenSeed.slice(i, i + 2), 16));
      }
      try {
        return [runBrainFuckCode(projectMetadata.code, input), 'success'];
      } catch (e: any) {
        return [e.message, 'error'];
      }
    };

    const codeOutput = getCodeOutput();

    return {
      tokenId: currentSampleTokenId,
      tokenSeed,
      codeOutput,
    };
  }, [projectMetadata, currentSampleTokenId]);

  const hashedProjectMetadata = useHash(projectMetadata);

  const encodedProjectMetadata = useHydrateSave(projectMetadata);

  // useEffect(() => {
  //   console.log('rawProjectMetadata:', rawProjectMetadata);
  //   console.log('savedProjectMetadata:', savedProjectMetadata);
  //   console.log('encodedProjectMetadata:', encodedProjectMetadata);
  // }, [rawProjectMetadata, savedProjectMetadata, encodedProjectMetadata]);

  const stateObject = useMemo(() => {
    return {
      rawProjectMetadata,
      setRawProjectMetadata,
      projectMetadata,
      encodedProjectMetadata,
      currentSampleTokenId,
      setCurrentSampleTokenId,
      currentSampleTokenRenderState,
      hashedProjectMetadata,
      onRefresh,
    };
  }, [
    currentSampleTokenRenderState,
    currentSampleTokenId,
    rawProjectMetadata,
    encodedProjectMetadata,
    hashedProjectMetadata,
  ]);

  return (
    <ProjectBuilderContext.Provider value={stateObject}>
      {children}
    </ProjectBuilderContext.Provider>
  );
};

export const useProjectBuilderContext = (): ProjectBuilderProviderState => {
  return React.useContext(ProjectBuilderContext);
};

export const useProjectMetadata = () => {
  const { projectMetadata } = useProjectBuilderContext();
  return projectMetadata;
};

export const useRawProjectMetadata = () => {
  const { rawProjectMetadata } = useProjectBuilderContext();
  return rawProjectMetadata;
};

export const useModifyProjectMetadata = () => {
  const { setRawProjectMetadata } = useProjectBuilderContext();
  const onRendererChange = useCallback(
    (renderer: string) => {
      setRawProjectMetadata?.(
        produce((u) => {
          u.renderer = renderer;
        }),
      );
    },
    [setRawProjectMetadata],
  );
  const onCodeChange = useCallback(
    (code: string) => {
      setRawProjectMetadata?.(
        produce((u) => {
          u.code = code;
        }),
      );
    },
    [setRawProjectMetadata],
  );
  const onNameChange = useCallback(
    (name: string) => {
      setRawProjectMetadata?.(
        produce((u) => {
          u.name = name.length === 0 ? undefined : name;
        }),
      );
    },
    [setRawProjectMetadata],
  );
  const onSymbolChange = useCallback(
    (symbol: string) => {
      setRawProjectMetadata?.(
        produce((u) => {
          u.symbol =
            symbol.length === 0 ? undefined : symbol.toUpperCase().slice(0, 12);
        }),
      );
    },
    [setRawProjectMetadata],
  );
  const onMintingSupplyChange = useCallback(
    (mintingSupply: number) => {
      setRawProjectMetadata?.(
        produce((u) => {
          u.mintingSupply = isNaN(mintingSupply)
            ? undefined
            : Math.floor(mintingSupply);
        }),
      );
    },
    [setRawProjectMetadata],
  );
  const onPriceChange = useCallback(
    (priceInEth: number) => {
      setRawProjectMetadata?.(
        produce((u) => {
          u.priceInEth = isNaN(priceInEth) ? undefined : priceInEth;
        }),
      );
    },
    [setRawProjectMetadata],
  );
  const onRoyaltyFractionChange = useCallback(
    (royaltyFraction: number) => {
      setRawProjectMetadata?.(
        produce((u) => {
          u.royaltyFractionInBps = isNaN(royaltyFraction)
            ? undefined
            : Math.round(
                (Math.min(100, Math.max(0, royaltyFraction)) *
                  HUNDRED_PERCENT_BPS) /
                  100,
              );
        }),
      );
    },
    [setRawProjectMetadata],
  );

  const onIsActiveChange = useCallback(
    (isActive: boolean) => {
      setRawProjectMetadata?.(
        produce((u) => {
          u.isActive = isActive;
        }),
      );
    },
    [setRawProjectMetadata],
  );

  const onInputConstantsChange = useCallback(
    (inputConstants: string) => {
      if (!HEX_STRING_REGEX.test(inputConstants)) {
        return;
      }
      setRawProjectMetadata?.(
        produce((u) => {
          u.inputConstants = '0x' + inputConstants.slice(2, 18);
        }),
      );
    },
    [setRawProjectMetadata],
  );

  const onSeedChange = useCallback(
    (seed: string) => {
      if (!HEX_STRING_REGEX.test(seed)) {
        return;
      }
      setRawProjectMetadata?.(
        produce((u) => {
          u.seed = '0x' + seed.slice(2, 24);
        }),
      );
    },
    [setRawProjectMetadata],
  );

  return {
    onSeedChange,
    onInputConstantsChange,
    onSymbolChange,
    onIsActiveChange,
    onNameChange,
    onRoyaltyFractionChange,
    onCodeChange,
    onMintingSupplyChange,
    onRendererChange,
    onPriceChange,
  };
};
