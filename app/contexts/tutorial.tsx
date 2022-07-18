import React, { useCallback, useMemo, useState } from 'react';
import { useSavedOrDefaultTutorialMetadata } from '../hooks/useDefaults';
import { useHydrateSave } from '../hooks/useHydrateSave';
import { RenderCodeOutputState } from '../types';
import { runBrainFuckCode } from '../utils/brainFuck';

export interface TutorialMetadata {
  parameters?: number[]; // specific to Tutorial 0
  seed?: string; // trivial
  code: string; // required
  expectedOutputHexStr: string; // required
}

export interface TutorialProviderContext {
  tutorialMetadata: Partial<TutorialMetadata> | undefined;
  code: string | undefined;
  setCode: React.Dispatch<React.SetStateAction<string | undefined>>;
  output: RenderCodeOutputState | undefined;
  expectedOutputHexStr: string | undefined;
  isButtonDisabled: boolean;
  onSubmit: () => void;
}

export type TutorialProviderState = TutorialProviderContext;

const initialState: TutorialProviderState = {
  setCode: () => new Error('func is not set'),
  onSubmit: () => new Error('func is not set'),
  tutorialMetadata: undefined,
  code: undefined,
  output: undefined,
  expectedOutputHexStr: undefined,
  isButtonDisabled: true,
};

const TutorialContext =
  React.createContext<TutorialProviderState>(initialState);

export const TutorialsProvider: React.FC<{
  getDefaultTutorialMetadata: () => Partial<TutorialMetadata>;
  reward: string;
  children: React.ReactNode;
}> = ({ getDefaultTutorialMetadata, reward, children }) => {
  const tutorialMetadata = useSavedOrDefaultTutorialMetadata(
    getDefaultTutorialMetadata,
  );
  const { expectedOutputHexStr, code: savedCode } = tutorialMetadata;
  const [code, setCode] = useState<string | undefined>(savedCode);
  const output = useMemo((): RenderCodeOutputState | undefined => {
    if (!code) {
      return undefined;
    }
    try {
      const output = runBrainFuckCode(code, []);
      return {
        output,
        status: 'success',
        warnings: [],
      };
    } catch (e: any) {
      return {
        message: e.message,
        status: 'error',
      };
    }
  }, [code]);
  const newTutorialMetadata = useMemo((): Partial<TutorialMetadata> => {
    return {
      ...tutorialMetadata,
      code,
    };
  }, [tutorialMetadata, expectedOutputHexStr, code]);
  useHydrateSave(newTutorialMetadata);

  const isButtonDisabled = useMemo(() => {
    if (output?.status !== 'success') {
      return true;
    }
    if (!expectedOutputHexStr) {
      return true;
    }
    return expectedOutputHexStr !== output.output;
  }, [expectedOutputHexStr, output]);
  const onSubmit = useCallback(() => {
    if (isButtonDisabled) {
      confirm('Answer is not correct.');
      return;
    }
    confirm(reward);
  }, [isButtonDisabled, reward]);

  const stateObject = useMemo(() => {
    return {
      tutorialMetadata,
      code,
      setCode,
      output,
      expectedOutputHexStr,
      isButtonDisabled,
      onSubmit,
    };
  }, [
    tutorialMetadata,
    code,
    setCode,
    output,
    expectedOutputHexStr,
    isButtonDisabled,
    onSubmit,
  ]);

  return (
    <TutorialContext.Provider value={stateObject}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorialContext = (): TutorialProviderState => {
  return React.useContext(TutorialContext);
};
