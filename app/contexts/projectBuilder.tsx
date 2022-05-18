import React, { useMemo, useCallback } from 'react';
import { ProjectMetadata } from '../types';

export interface ProjectBuilderProviderContext {
  projectMetadata: Partial<ProjectMetadata>;
  encodedProjectMetadata: string;
}

export type ProjectBuilderProviderState = ProjectBuilderProviderContext;

const DEFAULT_PROJECT_METADATA: Partial<ProjectMetadata> = {};

const ENCODED_DEFAULT_PROJECT_METADATA = btoa(
  JSON.stringify(DEFAULT_PROJECT_METADATA),
);

const initialState: ProjectBuilderProviderState = {
  projectMetadata: DEFAULT_PROJECT_METADATA,
  encodedProjectMetadata: ENCODED_DEFAULT_PROJECT_METADATA,
};

const ProjectBuilderContext =
  React.createContext<ProjectBuilderProviderState>(initialState);

const ProjectBuilderProvider: React.FC = ({ children }) => {
  const projectMetadata: Partial<ProjectMetadata> = useMemo(() => {
    return {};
  }, []);

  const encodedProjectMetadata = useMemo(() => {
    return btoa(JSON.stringify(projectMetadata));
  }, [projectMetadata]);

  const stateObject = useMemo(() => {
    return {
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

const useAppContext = (): ProjectBuilderProviderState => {
  return React.useContext(ProjectBuilderContext);
};

export { ProjectBuilderProvider, useAppContext };
