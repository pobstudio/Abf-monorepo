import { HEX_STRING_REGEX } from '@abf-monorepo/types';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MAX_UINT } from '../constants';
import { useSavedOrDefaultTutorialMetadata } from '../hooks/useDefaults';
import { useHydrateSave } from '../hooks/useHydrateSave';
import { useRendererMetadata } from '../hooks/useRenderer';
import { useModalStore } from '../stores/modal';
import {
  RenderCodeOutputState,
  RendererMetadataStub,
  SampleTokenRenderDebugState,
} from '../types';
import {
  DEFAULT_CURRENT_SAMPLE_TOKEN_DEBUG_STATE,
  INPUT_CONSTANT_BYTES_SIZE,
  runBrainFuckCodeDebug,
} from '../utils/brainFuck';
import { getHexStringNumBytes } from '../utils/hex';

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
  currentSampleTokenDebugState: SampleTokenRenderDebugState;
  setCurrentSampleTokenDebugState: React.Dispatch<
    React.SetStateAction<SampleTokenRenderDebugState>
  >;
  inputConstants: string;
  onInputConstantsChange: (val: string) => void;
  rendererMetadata: RendererMetadataStub | undefined;
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
  setCurrentSampleTokenDebugState: () => new Error('func is not set'),
  currentSampleTokenDebugState: DEFAULT_CURRENT_SAMPLE_TOKEN_DEBUG_STATE,
  inputConstants: '',
  onInputConstantsChange: () => new Error('func is not set'),
  rendererMetadata: undefined,
};

const TutorialContext =
  React.createContext<TutorialProviderState>(initialState);

export const TutorialsProvider: React.FC<{
  renderer?: string;
  getDefaultTutorialMetadata: () => Partial<TutorialMetadata>;
  reward: string;
  children: React.ReactNode;
}> = ({ getDefaultTutorialMetadata, reward, renderer, children }) => {
  const defaultTutorialMetadata = useSavedOrDefaultTutorialMetadata(
    getDefaultTutorialMetadata,
  );
  const [code, setCode] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!defaultTutorialMetadata) {
      return;
    }
    setCode(defaultTutorialMetadata.code);
  }, [defaultTutorialMetadata]);
  const tutorialMetadata = useMemo((): Partial<TutorialMetadata> => {
    return omitBy(
      {
        ...defaultTutorialMetadata,
        code: !!code ? code : undefined,
      },
      isNil,
    );
  }, [defaultTutorialMetadata, code]);
  const minimizedTutorialMetadata = useMemo(() => {
    const { expectedOutputHexStr, ...rest } = tutorialMetadata;
    if (!rest.code) {
      return undefined;
    }
    return rest;
  }, [tutorialMetadata]);
  useHydrateSave(minimizedTutorialMetadata);

  const [currentSampleTokenDebugState, setCurrentSampleTokenDebugState] =
    useState<SampleTokenRenderDebugState>(
      DEFAULT_CURRENT_SAMPLE_TOKEN_DEBUG_STATE,
    );
  const [inputConstants, setInputConstants] = useState('');
  const onInputConstantsChange = useCallback(
    (input: string) => {
      if (!HEX_STRING_REGEX.test(input)) {
        return;
      }
      setInputConstants?.(
        '0x' + input.slice(2, 2 + INPUT_CONSTANT_BYTES_SIZE * 2),
      );
    },
    [setInputConstants],
  );

  const rendererMetadata = useRendererMetadata(renderer);

  const output = useMemo((): RenderCodeOutputState | undefined => {
    if (!code) {
      return undefined;
    }
    const input: number[] = [];
    for (let i = 2; i < inputConstants.length; i += 2) {
      input.push(parseInt(inputConstants.slice(i, i + 2), 16));
    }
    try {
      const { output, byteToBrainfuckIndex } = runBrainFuckCodeDebug(
        code,
        input,
      );
      console.log(byteToBrainfuckIndex, 'byteToBrainfuckIndex');

      const extraWarnings: string[] = [];

      if (
        !!rendererMetadata?.propsSize &&
        !MAX_UINT.eq(rendererMetadata.propsSize) &&
        rendererMetadata.propsSize.lt(getHexStringNumBytes(output))
      ) {
        extraWarnings.push('EXCESS BYTES: RENDERER MAY NOT BEHAVE CORRECTLY.');
      }

      return {
        output,
        status: 'success',
        warnings: [...extraWarnings],
      };
    } catch (e: any) {
      return {
        message: e.message,
        status: 'error',
      };
    }
  }, [code, inputConstants, rendererMetadata]);

  const isButtonDisabled = useMemo(() => {
    if (output?.status !== 'success') {
      return true;
    }
    if (!tutorialMetadata.expectedOutputHexStr) {
      return true;
    }
    console.log(
      output,
      tutorialMetadata.expectedOutputHexStr,
      'isButtonDisabled',
    );
    return (
      tutorialMetadata.expectedOutputHexStr.toLowerCase() !==
      output.output.toLowerCase()
    );
  }, [tutorialMetadata.expectedOutputHexStr, output]);
  const setIsOpen = useModalStore((s) => s.setIsGenericModalOpen);
  const onSubmit = useCallback(() => {
    if (isButtonDisabled) {
      confirm('Answer is not correct.');
      return;
    }
    // confirm(reward);
    setIsOpen(true);
  }, [isButtonDisabled, reward, setIsOpen]);

  const stateObject = useMemo(() => {
    return {
      tutorialMetadata,
      code,
      setCode,
      output,
      expectedOutputHexStr: tutorialMetadata.expectedOutputHexStr,
      isButtonDisabled,
      onSubmit,
      currentSampleTokenDebugState,
      setCurrentSampleTokenDebugState,
      inputConstants,
      onInputConstantsChange,
      rendererMetadata,
    };
  }, [
    tutorialMetadata,
    code,
    setCode,
    output,
    tutorialMetadata,
    isButtonDisabled,
    onSubmit,
    currentSampleTokenDebugState,
    setCurrentSampleTokenDebugState,
    inputConstants,
    onInputConstantsChange,
    rendererMetadata,
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
