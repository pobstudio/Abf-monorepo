import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { IRenderer, IRendererInterface } from "../../../contracts/interfaces/IRenderer";
export declare class IRenderer__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IRendererInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRenderer;
}
//# sourceMappingURL=IRenderer__factory.d.ts.map