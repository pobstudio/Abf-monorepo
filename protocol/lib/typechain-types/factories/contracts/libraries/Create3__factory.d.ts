import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Create3, Create3Interface } from "../../../contracts/libraries/Create3";
declare type Create3ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Create3__factory extends ContractFactory {
    constructor(...args: Create3ConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Create3>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Create3;
    connect(signer: Signer): Create3__factory;
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212207c5537e8c221dfeab71ba9870703a208e1afaedfe3ee0ab0a74b648f59ed9a9564736f6c63430008040033";
    static readonly abi: {
        inputs: never[];
        name: string;
        type: string;
    }[];
    static createInterface(): Create3Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): Create3;
}
export {};
//# sourceMappingURL=Create3__factory.d.ts.map