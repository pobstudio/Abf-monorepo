export interface Deployment {
    core: {
        brainFuckImplementation: string;
        factory: string;
    };
    registries: {
        renderer: string;
    };
    renderers: {
        [name: string]: string;
    };
    utilityRenderers: {
        [name: string]: string;
    };
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
export declare type Deployments = {
    [chainId: number]: Deployment;
};
//# sourceMappingURL=types.d.ts.map