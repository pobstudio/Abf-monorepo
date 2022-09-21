import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { IRendererPayable, IRendererPayableInterface } from "../../../contracts/interfaces/IRendererPayable";
export declare class IRendererPayable__factory {
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
    static createInterface(): IRendererPayableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRendererPayable;
}
//# sourceMappingURL=IRendererPayable__factory.d.ts.map