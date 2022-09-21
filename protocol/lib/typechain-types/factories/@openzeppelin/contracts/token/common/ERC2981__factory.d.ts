import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { ERC2981, ERC2981Interface } from "../../../../../@openzeppelin/contracts/token/common/ERC2981";
export declare class ERC2981__factory {
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
    static createInterface(): ERC2981Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC2981;
}
//# sourceMappingURL=ERC2981__factory.d.ts.map