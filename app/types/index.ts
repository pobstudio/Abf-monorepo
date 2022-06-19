import { BigNumber, BytesLike } from 'ethers';

export type RenderCodeOutputStatus = 'error' | 'success';

export type RenderCodeOutputState =
  | [string, RenderCodeOutputStatus]
  | undefined;
export interface SampleTokenRenderState {
  tokenId: number;
  tokenSeed: string | undefined;
  codeOutput: RenderCodeOutputState;
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
  previewOptions?: {
    groupBytesIn?: number;
    skipBytesBeforeGrouping?: number;
  };
}

export interface RendererMetadata extends RendererMetadataStub {
  id: BigNumber;
  registeredAt: number;
}

export interface OfflineRenderer {
  outSize: number;
  renderRaw: (out: string) => string;
}
