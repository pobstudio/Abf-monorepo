export interface Deployment {
    core: {
        brainFuckImplementation: string;
        factory: string;
    };
    registries: {
        renderer: string;
    };
    renderers: {
        identity: string;
        dotMatrix: string;
        path: string;
        pixelGrid8: string;
        pixelGrid16: string;
        pixelGrid24: string;
        hslPixelGrid8: string;
        hslPixelGrid16: string;
        hslPixelGrid24: string;
        monoPixelGrid8: string;
        monoPixelGrid16: string;
        monoPixelGrid24: string;
        gifImage: string;
    };
    utilityRenderers: {
        configuredGifImage: string;
        background: string;
        compactDataMiddleware: string;
        alphaFilter: string;
        compositeLayer: string;
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