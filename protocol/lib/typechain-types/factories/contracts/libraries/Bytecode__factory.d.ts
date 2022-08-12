import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
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
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122011e030e1455201b1e5b7f64a5ff6e964462672e290babdb635ed7728e4758d7a64736f6c63430008040033";
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