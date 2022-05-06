import React, { useMemo, useCallback } from 'react';

export interface ProjectBuilderProviderContext {}

export type ProjectBuilderProviderState = ProjectBuilderProviderContext;

const initialState: ProjectBuilderProviderState = {};

const ProjectBuilderContext =
  React.createContext<ProjectBuilderProviderState>(initialState);

const ProjectBuilderProvider: React.FC = ({ children }) => {
  const stateObject = useMemo(() => {
    return {};
  }, []);

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
