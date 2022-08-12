import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { SSTORE2Map, SSTORE2MapInterface } from "../../../contracts/libraries/SSTORE2Map";
declare type SSTORE2MapConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SSTORE2Map__factory extends ContractFactory {
    constructor(...args: SSTORE2MapConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<SSTORE2Map>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): SSTORE2Map;
    connect(signer: Signer): SSTORE2Map__factory;
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220af1c6c282c1a2117a3992b901e5a628ac86a791393ae804abd2852a7e7d6dabe64736f6c63430008040033";
    static readonly abi: {
        inputs: never[];
        name: string;
        type: string;
    }[];
    static createInterface(): SSTORE2MapInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): SSTORE2Map;
}
export {};
//# sourceMappingURL=SSTORE2Map__factory.d.ts.map