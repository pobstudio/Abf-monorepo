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
  whitelistToken: string;
}

export interface ProjectMetadata {
  name: string;
  symbol: string;
  additionalMetadataURI: string;
  seed: string;
  constants: string;
  code: string;
  postProcessedCode?: string;
  renderer: string;
  rendererMetadataStub?: RendererMetadataStub;
  mintingSupply: number;
  priceInEth: number;
  inputConstants: string;
  royaltyFractionInBps: number;
  rendererRoyaltyFraction: number;
  whitelistToken: string;
  isActive: boolean;
}

export interface CollectionMetadata {
  address: string | undefined;
  code: string;
  constants: string;
  mintingSupply: string;
  name: string;
  owner: string;
  price: string;
  renderer: string;
  rendererRoyaltyFraction: string;
  seed: string;
  symbol: string;
  whitelistToken: string;
}

export interface CollectionMetadataStub {
  address: string | undefined;
  code: string;
  mintingSupply: string;
  name: string;
  owner: string;
  price: string;
  renderer: string;
  symbol: string;
}

export interface TokenTransferStub {
  collection: string;
  id: string;
  event: string;
  blocknumber: string;
  timestamp: string;
  from: string;
  to: string;
}

export interface RendererMetadataStub {
  name: string | undefined;
  address: string;
  additionalMetadataURI: string;
  propsSize: BigNumber;
  additionalMetadata: RendererAdditionalMetadata;
  owner?: string;
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
  numGroups: number | 'infinity' | string;
  groupBytesIn: number;
  label?: string;
}

export interface RendererMetadata extends RendererMetadataStub {
  id: BigNumber;
  registeredAt: number;
}

export interface OfflineRenderer {
  propsSize: number;
  renderRaw: (out: string) => string;
}
