import React, { useMemo } from 'react';

export interface TutorialMetadata {
  parameters: number[];
  code: string;
  seed: string;
}

export interface TutorialProviderContext {
  setCurrentSampleTokenId: React.Dispatch<React.SetStateAction<number>>;
  activateCollection: () => void;
  isActive: boolean;
}

export type TutorialProviderState = TutorialProviderContext;

const initialState: TutorialProviderState = {
  setCurrentSampleTokenId: () => new Error('func is not set'),
  activateCollection: () => new Error('func is not set'),
  isActive: false,
};

const TutorialContext =
  React.createContext<TutorialProviderState>(initialState);

export const TutorialsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const stateObject = useMemo(() => {
    return {
      setCurrentSampleTokenId: () => 1,
      activateCollection: () => undefined,
      isActive: false,
    };
  }, []);

  return (
    <TutorialContext.Provider value={stateObject}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorialContext = (): TutorialProviderState => {
  return React.useContext(TutorialContext);
};
