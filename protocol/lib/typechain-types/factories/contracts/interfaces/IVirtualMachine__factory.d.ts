import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { IVirtualMachine, IVirtualMachineInterface } from "../../../contracts/interfaces/IVirtualMachine";
export declare class IVirtualMachine__factory {
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
    static createInterface(): IVirtualMachineInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVirtualMachine;
}
//# sourceMappingURL=IVirtualMachine__factory.d.ts.map