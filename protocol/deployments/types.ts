export interface Deployment {
  core: {
    factory: string;
  };
  registries: {
    renderer: string;
  };
  renderers: { [name: string]: string }; // deployed renderers from this repo
  libraries: {
    vm: string;
    uriConstructor: string;
    svgUtils: string;
  };
  interfaceID: {
    renderer: string;
  };
  pob: {
    multisig: string;
  };
}

export type Deployments = { [chainId: number]: Deployment };
