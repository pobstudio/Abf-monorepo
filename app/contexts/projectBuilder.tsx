import React, { useMemo, useCallback, useState, useEffect } from 'react';
import {
  useRendererMetadata,
  useRendererMetadataStubByProvider,
} from '../hooks/useRenderer';
import { ProjectMetadata } from '../types';
import produce from 'immer';
import { ADDRESS_REGEX } from '../../types/src';
import { utils } from 'ethers';

export interface ProjectBuilderProviderContext {
  rawProjectMetadata: Partial<ProjectMetadata>;
  setRawProjectMetadata:
    | React.Dispatch<React.SetStateAction<Partial<ProjectMetadata>>>
    | undefined;
  projectMetadata: Partial<ProjectMetadata>;
  encodedProjectMetadata: string;
}

export type ProjectBuilderProviderState = ProjectBuilderProviderContext;

const DEFAULT_PROJECT_METADATA: Partial<ProjectMetadata> = {};

const ENCODED_DEFAULT_PROJECT_METADATA = btoa(
  JSON.stringify(DEFAULT_PROJECT_METADATA),
);

const initialState: ProjectBuilderProviderState = {
  rawProjectMetadata: DEFAULT_PROJECT_METADATA,
  setRawProjectMetadata: undefined,
  projectMetadata: DEFAULT_PROJECT_METADATA,
  encodedProjectMetadata: ENCODED_DEFAULT_PROJECT_METADATA,
};

const ProjectBuilderContext =
  React.createContext<ProjectBuilderProviderState>(initialState);

export const ProjectBuilderProvider: React.FC = ({ children }) => {
  const [rawProjectMetadata, setRawProjectMetadata] = useState<
    Partial<ProjectMetadata>
  >({});

  const sanitizedRenderer = useMemo(() => {
    if (!rawProjectMetadata.renderer) {
      return undefined;
    }
    if (!ADDRESS_REGEX.test(rawProjectMetadata.renderer)) {
      return undefined;
    }
    return utils.getAddress(rawProjectMetadata.renderer);
  }, [rawProjectMetadata]);

  const rendererMetadata = useRendererMetadata(sanitizedRenderer);
  const rendererMetadataStub =
    useRendererMetadataStubByProvider(sanitizedRenderer);

  const projectMetadata: Partial<ProjectMetadata> = useMemo(() => {
    return {
      renderer: sanitizedRenderer,
      rendererMetadataStub: rendererMetadataStub ?? rendererMetadata,
    };
  }, [sanitizedRenderer, rendererMetadataStub, rendererMetadata]);

  useEffect(() => {
    console.log('rawProjectMetadata', rawProjectMetadata, projectMetadata);
  }, [rawProjectMetadata, projectMetadata]);

  const encodedProjectMetadata = useMemo(() => {
    return btoa(JSON.stringify(projectMetadata));
  }, [projectMetadata]);

  const stateObject = useMemo(() => {
    return {
      rawProjectMetadata,
      setRawProjectMetadata,
      projectMetadata,
      encodedProjectMetadata,
    };
  }, [projectMetadata, encodedProjectMetadata]);

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
  return {
    onRendererChange,
  };
};
