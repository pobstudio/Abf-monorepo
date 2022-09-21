import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { ISplitMain, ISplitMainInterface } from "../../../contracts/interfaces/ISplitMain";
export declare class ISplitMain__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
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
        anonymous?: undefined;
    })[];
    static createInterface(): ISplitMainInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISplitMain;
}
//# sourceMappingURL=ISplitMain__factory.d.ts.map