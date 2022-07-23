import { FC } from 'react';

export interface MixinDocParams {
  label: string;
  description: string;
  isOptional?: boolean;
}

export interface MixinDocExample {
  label: string;
  code: string;
  tapeLogLength: number;
}

export interface MixinDoc {
  alias?: string[];
  description: FC;
  params: MixinDocParams[];
  examples: MixinDocExample[];
  dataPointerLocationDescription: string;
}
