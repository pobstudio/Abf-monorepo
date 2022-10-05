import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides, Signer } from "ethers";
import type { PromiseOrValue } from "../../../common";
import type { ABFVM, ABFVMInterface } from "../../../contracts/vms/ABFVM";
declare type ABFVMConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ABFVM__factory extends ContractFactory {
    constructor(...args: ABFVMConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ABFVM>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ABFVM;
    connect(signer: Signer): ABFVM__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061057c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806329b9e6a51461003b578063832654401461006b575b600080fd5b610055600480360381019061005091906101d6565b61009b565b604051610062919061039e565b60405180910390f35b6100856004803603810190610080919061024b565b6100a5565b604051610092919061039e565b60405180910390f35b6060949350505050565b60608184846040516020016100bb929190610376565b604051602081830303815290604052805190602001206040516020016100e292919061034a565b60405160208183030381529060405290509392505050565b600061010d610108846103e5565b6103c0565b90508281526020810184848401111561012557600080fd5b610130848285610451565b509392505050565b60008135905061014781610518565b92915050565b60008083601f84011261015f57600080fd5b8235905067ffffffffffffffff81111561017857600080fd5b60208301915083600182028301111561019057600080fd5b9250929050565b600082601f8301126101a857600080fd5b81356101b88482602086016100fa565b91505092915050565b6000813590506101d08161052f565b92915050565b600080600080604085870312156101ec57600080fd5b600085013567ffffffffffffffff81111561020657600080fd5b6102128782880161014d565b9450945050602085013567ffffffffffffffff81111561023157600080fd5b61023d8782880161014d565b925092505092959194509250565b60008060006060848603121561026057600080fd5b600084013567ffffffffffffffff81111561027a57600080fd5b61028686828701610197565b9350506020610297868287016101c1565b92505060406102a886828701610138565b9150509250925092565b6102c36102be8261043d565b6104c4565b82525050565b60006102d482610416565b6102de8185610421565b93506102ee818560208601610460565b6102f781610507565b840191505092915050565b600061030d82610416565b6103178185610432565b9350610327818560208601610460565b80840191505092915050565b61034461033f82610447565b6104ce565b82525050565b600061035682856102b2565b60208201915061036682846102b2565b6020820191508190509392505050565b60006103828285610302565b915061038e8284610333565b6020820191508190509392505050565b600060208201905081810360008301526103b881846102c9565b905092915050565b60006103ca6103db565b90506103d68282610493565b919050565b6000604051905090565b600067ffffffffffffffff821115610400576103ff6104d8565b5b61040982610507565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561047e578082015181840152602081019050610463565b8381111561048d576000848401525b50505050565b61049c82610507565b810181811067ffffffffffffffff821117156104bb576104ba6104d8565b5b80604052505050565b6000819050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6105218161043d565b811461052c57600080fd5b50565b61053881610447565b811461054357600080fd5b5056fea2646970667358221220a952a361ed41debda677e7797d7a2a4f0dbc8f02ddafebb261ccd524fd31e3cd64736f6c63430008040033";
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
    static createInterface(): ABFVMInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ABFVM;
}
export {};
//# sourceMappingURL=ABFVM__factory.d.ts.map