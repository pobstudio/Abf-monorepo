import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { ERC721APausable, ERC721APausableInterface } from "../../../contracts/extensions/ERC721APausable";
export declare class ERC721APausable__factory {
    static readonly abi: ({
        inputs: never[];
        name: string;
        type: string;
        anonymous?: undefined;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
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
    static createInterface(): ERC721APausableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC721APausable;
}
//# sourceMappingURL=ERC721APausable__factory.d.ts.map