import React, { useMemo, useCallback, useState, useEffect } from 'react';
import {
  useRendererMetadata,
  useRendererMetadataStubByProvider,
} from '../hooks/useRenderer';
import { ProjectMetadata } from '../types';
import produce from 'immer';
import { ADDRESS_REGEX, INPUT_CONSTANTS_REGEX } from '../../types/src';
import { BigNumber, utils } from 'ethers';
import Router, { useRouter } from 'next/router';
import { HUNDRED_PERCENT_BPS } from '../constants';
import { getTokenSeed } from '../utils/brainFuck';

export interface ProjectBuilderProviderContext {
  currentSampleTokenId: number;
  rawProjectMetadata: Partial<ProjectMetadata>;
  setRawProjectMetadata:
    | React.Dispatch<React.SetStateAction<Partial<ProjectMetadata>>>
    | undefined;
  setCurrentSampleTokenId:
    | React.Dispatch<React.SetStateAction<number>>
    | undefined;
  projectMetadata: Partial<ProjectMetadata>;
  encodedProjectMetadata: string;
  currentSampleTokenSeed: string | undefined;
}

export type ProjectBuilderProviderState = ProjectBuilderProviderContext;

const DEFAULT_PROJECT_METADATA: Partial<ProjectMetadata> = {
  isActive: false,
};

const ENCODED_DEFAULT_PROJECT_METADATA = btoa(
  JSON.stringify(DEFAULT_PROJECT_METADATA),
);

const initialState: ProjectBuilderProviderState = {
  currentSampleTokenSeed: undefined,
  currentSampleTokenId: 0,
  rawProjectMetadata: DEFAULT_PROJECT_METADATA,
  setRawProjectMetadata: undefined,
  setCurrentSampleTokenId: undefined,
  projectMetadata: DEFAULT_PROJECT_METADATA,
  encodedProjectMetadata: ENCODED_DEFAULT_PROJECT_METADATA,
};

const ProjectBuilderContext =
  React.createContext<ProjectBuilderProviderState>(initialState);

export const ProjectBuilderProvider: React.FC = ({ children }) => {
  const [currentSampleTokenId, setCurrentSampleTokenId] = useState(0);
  const defaultSeed = useMemo(() => {
    const input = Date.now().toString(16);
    return utils
      .keccak256('0x' + (input.length % 2 === 1 ? '0' : '') + input)
      .slice(0, 24);
  }, []);

  const [rawProjectMetadata, setRawProjectMetadata] = useState<
    Partial<ProjectMetadata>
  >({ seed: defaultSeed, inputConstants: '0x'.padEnd(18, '0') });

  const sanitizedRenderer = useMemo(() => {
    if (!rawProjectMetadata.renderer) {
      return undefined;
    }
    if (!ADDRESS_REGEX.test(rawProjectMetadata.renderer)) {
      return undefined;
    }
    return utils.getAddress(rawProjectMetadata.renderer);
  }, [rawProjectMetadata]);

  const sanitizedInputConstants = useMemo(() => {
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

  const rendererMetadata = useRendererMetadata(sanitizedRenderer);
  const rendererMetadataStub =
    useRendererMetadataStubByProvider(sanitizedRenderer);

  const projectMetadata: Partial<ProjectMetadata> = useMemo(() => {
    return {
      inputConstants: sanitizedInputConstants,
      isActive: rawProjectMetadata.isActive,
      royaltyFractionInBps: rawProjectMetadata.royaltyFractionInBps,
      mintingSupply: rawProjectMetadata.mintingSupply,
      name: rawProjectMetadata.name,
      symbol: rawProjectMetadata.symbol,
      renderer: sanitizedRenderer,
      seed:
        (rawProjectMetadata?.seed?.length ?? 0) > 2
          ? rawProjectMetadata.seed
          : undefined,
      rendererMetadataStub: rendererMetadataStub ?? rendererMetadata,
    };
  }, [
    sanitizedRenderer,
    sanitizedInputConstants,
    rawProjectMetadata,
    rendererMetadataStub,
    rendererMetadata,
  ]);

  const currentSampleTokenSeed = useMemo(() => {
    if (currentSampleTokenId === undefined) {
      return undefined;
    }
    if (!projectMetadata?.inputConstants || !projectMetadata?.seed) {
      return undefined;
    }
    return getTokenSeed(
      projectMetadata.seed,
      BigNumber.from(currentSampleTokenId),
      projectMetadata.inputConstants,
    );
  }, [currentSampleTokenId, projectMetadata]);

  const encodedProjectMetadata = useMemo(() => {
    return btoa(JSON.stringify(projectMetadata));
  }, [projectMetadata]);

  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => {
    const save = router.query.save;
    if (!hasHydrated && typeof save === 'string') {
      setHasHydrated(true);
      setRawProjectMetadata(JSON.parse(atob(save)));
    }
  }, [router]);

  useEffect(() => {
    console.log('rawProjectMetadata:', rawProjectMetadata);
    console.log('projectMetadata:', projectMetadata);
    console.log('encodedProjectMetadata:', encodedProjectMetadata);
  }, [rawProjectMetadata, projectMetadata, encodedProjectMetadata]);

  // dehydrate base64
  useEffect(() => {
    Router.push(
      {
        query: { save: encodedProjectMetadata },
      },
      undefined,
      {
        scroll: false,
      },
    );
  }, [encodedProjectMetadata]);

  const stateObject = useMemo(() => {
    return {
      rawProjectMetadata,
      setRawProjectMetadata,
      projectMetadata,
      encodedProjectMetadata,
      currentSampleTokenId,
      setCurrentSampleTokenId,
      currentSampleTokenSeed,
    };
  }, [
    projectMetadata,
    currentSampleTokenSeed,
    currentSampleTokenId,
    rawProjectMetadata,
    encodedProjectMetadata,
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
