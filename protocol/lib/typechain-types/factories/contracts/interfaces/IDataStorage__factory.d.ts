import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { IDataStorage, IDataStorageInterface } from "../../../contracts/interfaces/IDataStorage";
export declare class IDataStorage__factory {
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
    static createInterface(): IDataStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDataStorage;
}
//# sourceMappingURL=IDataStorage__factory.d.ts.map