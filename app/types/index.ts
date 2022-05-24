import { BigNumber } from 'ethers';

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
  isActive: boolean;
}

export interface RendererMetadataStub {
  address: string;
  additionalMetadataURI: string;
  outSize: BigNumber;
}
export interface RendererMetadata extends RendererMetadataStub {
  id: BigNumber;
  registeredAt: number;
}
