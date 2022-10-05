import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides, Signer } from "ethers";
import type { PromiseOrValue } from "../../../common";
import type { AbsBrainFuckTreasuryUtils, AbsBrainFuckTreasuryUtilsInterface } from "../../../contracts/libraries/AbsBrainFuckTreasuryUtils";
declare type AbsBrainFuckTreasuryUtilsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AbsBrainFuckTreasuryUtils__factory extends ContractFactory {
    constructor(...args: AbsBrainFuckTreasuryUtilsConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<AbsBrainFuckTreasuryUtils>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): AbsBrainFuckTreasuryUtils;
    connect(signer: Signer): AbsBrainFuckTreasuryUtils__factory;
    static readonly bytecode = "0x611cee610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100565760003560e01c80634bd755f91461005b578063a7b324001461008d578063bfc00ae9146100bd578063ca176cca146100db575b600080fd5b610075600480360381019061007091906112e5565b61010c565b60405161008493929190611640565b60405180910390f35b6100a760048036038101906100a29190611250565b61054c565b6040516100b491906116c4565b60405180910390f35b6100c561063b565b6040516100d29190611726565b60405180910390f35b6100f560048036038101906100f0919061132a565b610641565b604051610103929190611609565b60405180910390f35b606080600080600061016187878080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610641565b915091506000825167ffffffffffffffff8111156101a8577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156101d65781602001602082028036833780820191505090505b5090506000600190505b8151811015610523576000848281518110610224577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015190508073ffffffffffffffffffffffffffffffffffffffff166301ffc9a77f22daf330000000000000000000000000000000000000000000000000000000006040518263ffffffff1660e01b81526004016102879190611685565b60206040518083038186803b15801561029f57600080fd5b505afa1580156102b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d791906112bc565b1561041f57848281518110610315577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015173ffffffffffffffffffffffffffffffffffffffff166378385b588b8b6040518363ffffffff1660e01b81526004016103579291906116a0565b60206040518083038186803b15801561036f57600080fd5b505afa158015610383573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a79190611227565b8383815181106103e0577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050610511565b8073ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561046557600080fd5b505afa158015610479573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061049d9190611227565b8383815181106104d6577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250505b508061051c90611ae0565b90506101e0565b5060008061053183856108b1565b9150915081816103e897509750975050505050509250925092565b6060825160405160200161056091906115ee565b604051602081830303815290604052905060005b835181101561063457818482815181106105b7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101518483815181106105f8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151604051602001610612939291906115b5565b60405160208183030381529060405291508061062d90611ae0565b9050610574565b5092915050565b6103e881565b606080600083600081518110610680577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602001015160f81c60f81b60f81c60ff1690508067ffffffffffffffff8111156106d3577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156107015781602001602082028036833780820191505090505b5091508067ffffffffffffffff811115610744577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156107725781602001602082028036833780820191505090505b50925060005b83518110156108aa576107a38560016018846107949190611931565b61079e91906118aa565b610b4b565b8482815181106107dc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050610844856014600160188561082b9190611931565b61083591906118aa565b61083f91906118aa565b610bc1565b83828151811061087d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001019063ffffffff16908163ffffffff168152505080806108a290611ae0565b915050610778565b5050915091565b6060806000845167ffffffffffffffff8111156108f7577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156109255781602001602082028036833780820191505090505b50905060005b85518110156109e15785818151811061096d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015173ffffffffffffffffffffffffffffffffffffffff168282815181106109c4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018181525050806109da90611ae0565b905061092b565b506109fc81856000600189516109f7919061198b565b610c28565b845167ffffffffffffffff811115610a3d577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610a6b5781602001602082028036833780820191505090505b50925060005b8551811015610b3f57858181518110610ab3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151848281518110610af4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505080610b3890611ae0565b9050610a71565b50839150509250929050565b6000601482610b5a91906118aa565b83511015610b9d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b94906116e6565b60405180910390fd5b60006c01000000000000000000000000836020860101510490508091505092915050565b6000600482610bd091906118aa565b83511015610c13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0a90611706565b60405180910390fd5b60008260048501015190508091505092915050565b6000829050600082905080821415610c41575050610fef565b60008660028686610c52919061198b565b610c5c9190611900565b86610c6791906118aa565b81518110610c9e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015190505b818311610fc1575b80878481518110610ceb577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101511015610d0c578280610d0490611ae0565b935050610cb1565b5b868281518110610d46577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151811015610d68578180610d6090611a85565b925050610d0d565b818311610fbc57868281518110610da8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151878481518110610de9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151888581518110610e2a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101898581518110610e6a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010182815250828152505050858281518110610eb4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151868481518110610ef5577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151878581518110610f36577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101888581518110610f76577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018263ffffffff1663ffffffff168152508263ffffffff1663ffffffff1681525050508280610faa90611ae0565b9350508180610fb890611a85565b9250505b610ca9565b81851015610fd657610fd587878785610c28565b5b83831015610feb57610fea87878587610c28565b5b5050505b50505050565b600061100861100384611766565b611741565b9050808382526020820190508285602086028201111561102757600080fd5b60005b85811015611057578161103d888261110b565b84526020840193506020830192505060018101905061102a565b5050509392505050565b600061107461106f84611792565b611741565b9050808382526020820190508285602086028201111561109357600080fd5b60005b858110156110c357816110a98882611212565b845260208401935060208301925050600181019050611096565b5050509392505050565b60006110e06110db846117be565b611741565b9050828152602081018484840111156110f857600080fd5b611103848285611a43565b509392505050565b60008135905061111a81611c73565b92915050565b60008151905061112f81611c73565b92915050565b600082601f83011261114657600080fd5b8135611156848260208601610ff5565b91505092915050565b600082601f83011261117057600080fd5b8135611180848260208601611061565b91505092915050565b60008151905061119881611c8a565b92915050565b60008083601f8401126111b057600080fd5b8235905067ffffffffffffffff8111156111c957600080fd5b6020830191508360018202830111156111e157600080fd5b9250929050565b600082601f8301126111f957600080fd5b81356112098482602086016110cd565b91505092915050565b60008135905061122181611ca1565b92915050565b60006020828403121561123957600080fd5b600061124784828501611120565b91505092915050565b6000806040838503121561126357600080fd5b600083013567ffffffffffffffff81111561127d57600080fd5b61128985828601611135565b925050602083013567ffffffffffffffff8111156112a657600080fd5b6112b28582860161115f565b9150509250929050565b6000602082840312156112ce57600080fd5b60006112dc84828501611189565b91505092915050565b600080602083850312156112f857600080fd5b600083013567ffffffffffffffff81111561131257600080fd5b61131e8582860161119e565b92509250509250929050565b60006020828403121561133c57600080fd5b600082013567ffffffffffffffff81111561135657600080fd5b611362848285016111e8565b91505092915050565b6000611377838361139b565b60208301905092915050565b600061138f838361158f565b60208301905092915050565b6113a4816119bf565b82525050565b6113bb6113b6826119bf565b611b29565b82525050565b60006113cc8261180f565b6113d6818561184a565b93506113e1836117ef565b8060005b838110156114125781516113f9888261136b565b975061140483611830565b9250506001810190506113e5565b5085935050505092915050565b600061142a8261181a565b611434818561185b565b935061143f836117ff565b8060005b838110156114705781516114578882611383565b97506114628361183d565b925050600181019050611443565b5085935050505092915050565b611486816119dd565b82525050565b6000611498838561186c565b93506114a5838584611a43565b6114ae83611bf6565b840190509392505050565b60006114c482611825565b6114ce818561187d565b93506114de818560208601611a52565b6114e781611bf6565b840191505092915050565b60006114fd82611825565b611507818561188e565b9350611517818560208601611a52565b80840191505092915050565b6000611530601583611899565b915061153b82611c21565b602082019050919050565b6000611553601483611899565b915061155e82611c4a565b602082019050919050565b61157a61157582611a29565b611b4d565b82525050565b61158981611a33565b82525050565b61159881611a33565b82525050565b6115af6115aa82611a33565b611b57565b82525050565b60006115c182866114f2565b91506115cd82856113aa565b6014820191506115dd828461159e565b600482019150819050949350505050565b60006115fa8284611569565b60208201915081905092915050565b6000604082019050818103600083015261162381856113c1565b90508181036020830152611637818461141f565b90509392505050565b6000606082019050818103600083015261165a81866113c1565b9050818103602083015261166e818561141f565b905061167d6040830184611580565b949350505050565b600060208201905061169a600083018461147d565b92915050565b600060208201905081810360008301526116bb81848661148c565b90509392505050565b600060208201905081810360008301526116de81846114b9565b905092915050565b600060208201905081810360008301526116ff81611523565b9050919050565b6000602082019050818103600083015261171f81611546565b9050919050565b600060208201905061173b6000830184611580565b92915050565b600061174b61175c565b90506117578282611aaf565b919050565b6000604051905090565b600067ffffffffffffffff82111561178157611780611bc7565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156117ad576117ac611bc7565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156117d9576117d8611bc7565b5b6117e282611bf6565b9050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b60006118b582611a29565b91506118c083611a29565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156118f5576118f4611b69565b5b828201905092915050565b600061190b82611a29565b915061191683611a29565b92508261192657611925611b98565b5b828204905092915050565b600061193c82611a29565b915061194783611a29565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156119805761197f611b69565b5b828202905092915050565b600061199682611a29565b91506119a183611a29565b9250828210156119b4576119b3611b69565b5b828203905092915050565b60006119ca82611a09565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b82818337600083830152505050565b60005b83811015611a70578082015181840152602081019050611a55565b83811115611a7f576000848401525b50505050565b6000611a9082611a29565b91506000821415611aa457611aa3611b69565b5b600182039050919050565b611ab882611bf6565b810181811067ffffffffffffffff82111715611ad757611ad6611bc7565b5b80604052505050565b6000611aeb82611a29565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611b1e57611b1d611b69565b5b600182019050919050565b6000611b3482611b3b565b9050919050565b6000611b4682611c14565b9050919050565b6000819050919050565b6000611b6282611c07565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b60008160e01b9050919050565b60008160601b9050919050565b7f746f416464726573735f6f75744f66426f756e64730000000000000000000000600082015250565b7f746f55696e7433325f6f75744f66426f756e6473000000000000000000000000600082015250565b611c7c816119bf565b8114611c8757600080fd5b50565b611c93816119d1565b8114611c9e57600080fd5b50565b611caa81611a33565b8114611cb557600080fd5b5056fea26469706673582212203aa6d27261f4a959fae5ce91e17e06d99a8f1c2d610087a6b7704b7632b5181964736f6c63430008040033";
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
    static createInterface(): AbsBrainFuckTreasuryUtilsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AbsBrainFuckTreasuryUtils;
}
export {};
//# sourceMappingURL=AbsBrainFuckTreasuryUtils__factory.d.ts.map