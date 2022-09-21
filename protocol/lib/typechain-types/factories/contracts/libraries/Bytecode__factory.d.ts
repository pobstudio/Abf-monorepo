import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides, Signer } from "ethers";
import type { PromiseOrValue } from "../../../common";
import type { Bytecode, BytecodeInterface } from "../../../contracts/libraries/Bytecode";
declare type BytecodeConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Bytecode__factory extends ContractFactory {
    constructor(...args: BytecodeConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Bytecode>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Bytecode;
    connect(signer: Signer): Bytecode__factory;
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220cbb169e663bb52adb95501e5cb1a9967112a28f286c7db3035bc1e8efd8e6e7b64736f6c63430008040033";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): BytecodeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Bytecode;
}
export {};
//# sourceMappingURL=Bytecode__factory.d.ts.map