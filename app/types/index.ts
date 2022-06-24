import { BigNumber, BytesLike } from 'ethers';

export interface ErrorRenderCodeOutputState {
  status: 'error';
  message: string;
}

export interface SuccessRenderCodeOutputState {
  status: 'success';
  output: string;
  warnings?: string[];
}

export type RenderCodeOutputState =
  | ErrorRenderCodeOutputState
  | SuccessRenderCodeOutputState;

export interface SampleTokenRenderDebugState {
  focusedByteGroupingIndex?: number | null;
}

export interface SampleTokenRenderState {
  tokenId: number;
  tokenSeed: string | undefined;
  codeOutput: RenderCodeOutputState | undefined;
}

export interface CreateProjectConfig {
  name: string;
  symbol: string;
  additionalMetadataURI: string;
  seed: BytesLike;
  constants: BytesLike;
  code: BytesLike;
  renderer: string;
  mintingSupply: BigNumber;
  price: BigNumber;
  royaltyFraction: BigNumber;
  isActive: boolean;
  rendererRoyaltyFraction: BigNumber;
}

export interface ProjectMetadata {
  name: string;
  symbol: string;
  additionalMetadataURI: string;
  seed: string;
  constants: string;
  code: string;
  renderer: string;
  rendererMetadataStub?: RendererMetadataStub;
  mintingSupply: number;
  priceInEth: number;
  inputConstants: string;
  royaltyFractionInBps: number;
  rendererRoyaltyFraction: number;
  isActive: boolean;
}

export interface RendererMetadataStub {
  label: string | undefined;
  address: string;
  additionalMetadataURI: string;
  outSize: BigNumber;
  additionalMetadata: RendererAdditionalMetadata;
}

export interface RendererAdditionalMetadata {
  description: string;
  sampleOptions?: {
    input?: string;
  };
  previewOptions?: {
    byteGroups: RendererAdditionalMetadataByteGroup[];
  };
}

export interface RendererAdditionalMetadataByteGroup {
  numGroups: number | 'infinity';
  groupBytesIn: number;
  label?: string;
}

export interface RendererMetadata extends RendererMetadataStub {
  id: BigNumber;
  registeredAt: number;
}

export interface OfflineRenderer {
  outSize: number;
  renderRaw: (out: string) => string;
}
