import { BfTemplateInsertLibrary } from '../../../../types/bf';
import { createTemplateInsert } from '../constants';
import { CONSTANTS_LIBRARY } from './constants';

export const MEMORY_LIBRARY: BfTemplateInsertLibrary = {
  ...CONSTANTS_LIBRARY,
  skipInputs: (val: any) => {
    const safeVal = parseInt(val);
    if (isNaN(safeVal)) {
      return undefined;
    }
    if (val < 0 || val > 255) {
      return undefined;
    }
    return `${','.repeat(safeVal)}${createTemplateInsert('0')}`;
  },
  copy: (delta: any, temporaryDelta: any) => {
    let safeDelta = parseInt(delta);
    let safeTemporaryDelta = parseInt(temporaryDelta);
    if (delta === undefined) {
      safeDelta = 1;
    }
    if (isNaN(safeDelta) || safeDelta === 0) {
      return undefined;
    }
    if (isNaN(safeTemporaryDelta) || !safeTemporaryDelta) {
      if (safeDelta === 1) {
        safeTemporaryDelta = 2;
      } else {
        safeTemporaryDelta = 1;
      }
    }
    if (safeDelta === safeTemporaryDelta) {
      return undefined;
    }
    return `${createTemplateInsert('jump', [safeDelta])}${createTemplateInsert(
      '0',
    )}${createTemplateInsert('jump', [-safeDelta])}${createTemplateInsert(
      'jump',
      [safeTemporaryDelta],
    )}${createTemplateInsert('0')}${createTemplateInsert('jump', [
      -safeTemporaryDelta,
    ])}[${createTemplateInsert('jump', [safeDelta])}+${createTemplateInsert(
      'jump',
      [-safeDelta],
    )}${createTemplateInsert('jump', [
      safeTemporaryDelta,
    ])}+${createTemplateInsert('jump', [
      -safeTemporaryDelta,
    ])}-]${createTemplateInsert('jump', [
      safeTemporaryDelta,
    ])}[${createTemplateInsert('jump', [
      -safeTemporaryDelta,
    ])}+${createTemplateInsert('jump', [
      safeTemporaryDelta,
    ])}-]${createTemplateInsert('jump', [
      -safeTemporaryDelta,
    ])}${createTemplateInsert('jump', [safeDelta])}`;
  },
  move: (delta: any) => {
    let safeDelta = parseInt(delta);
    if (delta === undefined) {
      safeDelta = 1;
    }
    if (isNaN(safeDelta) || safeDelta === 0) {
      return undefined;
    }
    return `${createTemplateInsert('jump', [safeDelta])}${createTemplateInsert(
      '0',
    )}${createTemplateInsert('jump', [-safeDelta])}[${createTemplateInsert(
      'jump',
      [safeDelta],
    )}+${createTemplateInsert('jump', [-safeDelta])}-]${createTemplateInsert(
      'jump',
      [safeDelta],
    )}`;
  },
  jump: (delta: any) => {
    const safeDelta = parseInt(delta);
    if (isNaN(safeDelta) || safeDelta === 0) {
      return undefined;
    }
    return `${(safeDelta > 0 ? '>' : '<').repeat(Math.abs(safeDelta))}`;
  },
  portal: (index: any) => {
    const safeIndex = parseInt(index);
    if (isNaN(safeIndex) || safeIndex <= 0) {
      return undefined;
    }
    return `!${createTemplateInsert('jump', [safeIndex])}`;
  },
};
