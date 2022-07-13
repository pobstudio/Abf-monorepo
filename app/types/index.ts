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
  address: any | undefined;
  code: any;
  constants: any;
  mintingSupply: any;
  name: any;
  owner: any;
  price: any;
  renderer: any;
  rendererRoyaltyFraction: any;
  seed: any;
  symbol: any;
  whitelistToken: any;
}

export interface CollectionMetadataStub {
  address: any | undefined;
  code: any;
  mintingSupply: any;
  name: any;
  owner: any;
  price: any;
  renderer: any;
  symbol: any;
}

export interface RendererMetadataStub {
  label: string | undefined;
  address: string;
  additionalMetadataURI: string;
  propsSize: BigNumber;
  additionalMetadata: RendererAdditionalMetadata;
  owner?: string;
}

export interface RendererAdditionalMetadata {
  name: string;
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
  propsSize: number;
  renderRaw: (out: string) => string;
}
