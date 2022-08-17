import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { ConfiguredGifImageRenderer, ConfiguredGifImageRendererInterface } from "../../../contracts/renderers/ConfiguredGifImageRenderer";
declare type ConfiguredGifImageRendererConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ConfiguredGifImageRenderer__factory extends ContractFactory {
    constructor(...args: ConfiguredGifImageRendererConstructorParams);
    deploy(_gifImageRenderer: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ConfiguredGifImageRenderer>;
    getDeployTransaction(_gifImageRenderer: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ConfiguredGifImageRenderer;
    connect(signer: Signer): ConfiguredGifImageRenderer__factory;
    static readonly bytecode = "0x608060405260016002553480156200001657600080fd5b50604051620025893803806200258983398181016040528101906200003c919062000187565b6200005c62000050620000a460201b60201c565b620000ac60201b60201c565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505062000201565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000815190506200018181620001e7565b92915050565b6000602082840312156200019a57600080fd5b6000620001aa8482850162000170565b91505092915050565b6000620001c082620001c7565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b620001f281620001b3565b8114620001fe57600080fd5b50565b61237880620002116000396000f3fe608060405234801561001057600080fd5b50600436106100f35760003560e01c806371a835ff11610097578063b0a2f64011610066578063b0a2f64014610276578063c431d8e0146102a6578063effde6db146102d6578063f2fde38b146102f4576100f3565b806371a835ff146101ec57806382863b5d1461020a5780638da5cb5b1461023a57806392348b2214610258576100f3565b806306fdde03116100d357806306fdde0314610164578063316df61e1461018257806343c5820c146101b2578063715018a6146101e2576100f3565b8062a85d69146100f8578062e061651461011657806301ffc9a714610134575b600080fd5b610100610310565b60405161010d9190611b89565b60405180910390f35b61011e610338565b60405161012b9190611b89565b60405180910390f35b61014e60048036038101906101499190611407565b61033e565b60405161015b9190611a61565b60405180910390f35b61016c6103b8565b6040516101799190611ac7565b60405180910390f35b61019c60048036038101906101979190611430565b6103f5565b6040516101a99190611ac7565b60405180910390f35b6101cc60048036038101906101c79190611430565b610545565b6040516101d99190611aa5565b60405180910390f35b6101ea610695565b005b6101f46106a9565b6040516102019190611b89565b60405180910390f35b610224600480360381019061021f91906114f7565b6106b1565b6040516102319190611b89565b60405180910390f35b6102426107fc565b60405161024f9190611a46565b60405180910390f35b61026061080b565b60405161026d9190611ac7565b60405180910390f35b610290600480360381019061028b9190611430565b61082b565b60405161029d9190611ac7565b60405180910390f35b6102c060048036038101906102bb9190611538565b610860565b6040516102cd9190611aa5565b60405180910390f35b6102de610875565b6040516102eb9190611ac7565b60405180910390f35b61030e600480360381019061030991906113de565b6108b2565b005b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905090565b60025481565b60007f3433a79a000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103b157506103b082610936565b5b9050919050565b60606040518060400160405280601b81526020017f436f6e666967757265642053696e676c65204672616d65204769660000000000815250905090565b6060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663316df61e61049561048786868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505060006109a0565b63ffffffff1660001b610a07565b858560049088889050926104ab93929190611cb0565b6040516020016104bd939291906118d0565b6040516020818303038152906040526040518263ffffffff1660e01b81526004016104e89190611aa5565b60006040518083038186803b15801561050057600080fd5b505afa158015610514573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061053d91906114b6565b905092915050565b6060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166343c5820c6105e56105d786868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505060006109a0565b63ffffffff1660001b610a07565b858560049088889050926105fb93929190611cb0565b60405160200161060d939291906118d0565b6040516020818303038152906040526040518263ffffffff1660e01b81526004016106389190611aa5565b60006040518083038186803b15801561065057600080fd5b505afa158015610664573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061068d9190611475565b905092915050565b61069d610a4c565b6106a76000610aca565b565b63ffffffff81565b60008060038360400151516106c69190611f47565b14610706576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fd90611b09565b60405180910390fd5b61075760025460001b83600001518460200151600386604001515161072b9190611d39565b866040015160405160200161074394939291906119fc565b604051602081830303815290604052610b8e565b507f12ace6f0b54dc6c4abfb9aad10026ee778ec35756eaf7fe7ecd7afa44e973f356002546040516107899190611b89565b60405180910390a1600260008154809291906107a490611eac565b919050555063ffffffff60025411156107f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e990611b69565b60405180910390fd5b6002549050919050565b6000610806610bd6565b905090565b606060405180608001604052806042815260200161230160429139905090565b606061083983839050610bff565b60405160200161084991906119cf565b604051602081830303815290604052905092915050565b606061086e8260001b610a07565b9050919050565b60606040518060400160405280600581526020017f696d616765000000000000000000000000000000000000000000000000000000815250905090565b6108ba610a4c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561092a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092190611ae9565b60405180910390fd5b61093381610aca565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006004826109af9190611ce3565b835110156109f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e990611b49565b60405180910390fd5b60008260048501015190508091505092915050565b6060610a45610a1d610a1884610dac565b610e01565b60017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610e89565b9050919050565b610a54610f6f565b73ffffffffffffffffffffffffffffffffffffffff16610a726107fc565b73ffffffffffffffffffffffffffffffffffffffff1614610ac8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610abf90611b29565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080610bb983604051602001610ba591906119ad565b604051602081830303815290604052610f77565b9050610bcd610bc785610dac565b82610fa3565b91505092915050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606000821415610c47576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050610da7565b600082905060005b60008214610c79578080610c6290611eac565b915050600a82610c729190611d39565b9150610c4f565b60008167ffffffffffffffff811115610cbb577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610ced5781602001600182028036833780820191505090505b5090505b60008514610da057600182610d069190611d6a565b9150600a85610d159190611f47565b6030610d219190611ce3565b60f81b818381518110610d5d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85610d999190611d39565b9450610cf1565b8093505050505b919050565b60007fd351a9253491dfef66f53115e9e3afda3b5fdef08a1de6937da91188ec553be560001b82604051602001610de4929190611a7c565b604051602081830303815290604052805190602001209050919050565b60008030837f21c35dbe1b344a2488cf3321d6ce542f8e9f305544ff09e4993a62319a497c1f60001b604051602001610e3c93929190611965565b6040516020818303038152906040528051906020012060001c905080604051602001610e689190611934565b6040516020818303038152906040528051906020012060001c915050919050565b60606000610e9685610fb9565b90506000811415610eb95760405180602001604052806000815250915050610f68565b80841115610ed95760405180602001604052806000815250915050610f68565b83831015610f22578084846040517f2c4a89fa000000000000000000000000000000000000000000000000000000008152600401610f1993929190611ba4565b60405180910390fd5b60008484039050600085830390506000828210610f3f5782610f41565b815b90506040519450601f19601f60208301011685016040528085528087602087018a3c505050505b9392505050565b600033905090565b6060815182604051602001610f8d9291906118f6565b6040516020818303038152906040529050919050565b6000610fb183836000610fc4565b905092915050565b6000813b9050919050565b6000806040518060400160405280601081526020017f67363d3d37363d34f03d5260086018f300000000000000000000000000000000815250905061100885610e01565b9150600061101583611185565b1461104c576040517fcd43efa100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000858251602084016000f59050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156110c1576040517fbbd2fe8700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008173ffffffffffffffffffffffffffffffffffffffff1685876040516110e991906118b9565b60006040518083038185875af1925050503d8060008114611126576040519150601f19603f3d011682016040523d82523d6000602084013e61112b565b606091505b505090508015806111445750600061114285611185565b145b1561117b576040517f53de54b900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050509392505050565b6000813b9050919050565b60006111a361119e84611c00565b611bdb565b9050828152602081018484840111156111bb57600080fd5b6111c6848285611e39565b509392505050565b60006111e16111dc84611c00565b611bdb565b9050828152602081018484840111156111f957600080fd5b611204848285611e48565b509392505050565b600061121f61121a84611c31565b611bdb565b90508281526020810184848401111561123757600080fd5b611242848285611e48565b509392505050565b600081359050611259816122a4565b92915050565b60008135905061126e816122bb565b92915050565b60008083601f84011261128657600080fd5b8235905067ffffffffffffffff81111561129f57600080fd5b6020830191508360018202830111156112b757600080fd5b9250929050565b600082601f8301126112cf57600080fd5b81356112df848260208601611190565b91505092915050565b600082601f8301126112f957600080fd5b81516113098482602086016111ce565b91505092915050565b600082601f83011261132357600080fd5b815161133384826020860161120c565b91505092915050565b60006060828403121561134e57600080fd5b6113586060611bdb565b90506000611368848285016113c9565b600083015250602061137c848285016113c9565b602083015250604082013567ffffffffffffffff81111561139c57600080fd5b6113a8848285016112be565b60408301525092915050565b6000813590506113c3816122d2565b92915050565b6000813590506113d8816122e9565b92915050565b6000602082840312156113f057600080fd5b60006113fe8482850161124a565b91505092915050565b60006020828403121561141957600080fd5b60006114278482850161125f565b91505092915050565b6000806020838503121561144357600080fd5b600083013567ffffffffffffffff81111561145d57600080fd5b61146985828601611274565b92509250509250929050565b60006020828403121561148757600080fd5b600082015167ffffffffffffffff8111156114a157600080fd5b6114ad848285016112e8565b91505092915050565b6000602082840312156114c857600080fd5b600082015167ffffffffffffffff8111156114e257600080fd5b6114ee84828501611312565b91505092915050565b60006020828403121561150957600080fd5b600082013567ffffffffffffffff81111561152357600080fd5b61152f8482850161133c565b91505092915050565b60006020828403121561154a57600080fd5b6000611558848285016113b4565b91505092915050565b61156a81611d9e565b82525050565b61158161157c82611d9e565b611ef5565b82525050565b61159081611db0565b82525050565b61159f81611dbc565b82525050565b6115b66115b182611dbc565b611f07565b82525050565b60006115c88385611c89565b93506115d5838584611e39565b82840190509392505050565b60006115ec82611c62565b6115f68185611c78565b9350611606818560208601611e48565b61160f81612005565b840191505092915050565b600061162582611c62565b61162f8185611c89565b935061163f818560208601611e48565b80840191505092915050565b600061165682611c6d565b6116608185611c94565b9350611670818560208601611e48565b61167981612005565b840191505092915050565b600061168f82611c6d565b6116998185611ca5565b93506116a9818560208601611e48565b80840191505092915050565b60006116c2600183611ca5565b91506116cd8261203d565b600182019050919050565b60006116e5602683611c94565b91506116f082612066565b604082019050919050565b6000611708600283611ca5565b9150611713826120b5565b600282019050919050565b600061172b600183611ca5565b9150611736826120de565b600182019050919050565b600061174e602083611c94565b915061175982612107565b602082019050919050565b6000611771600183611ca5565b915061177c82612130565b600182019050919050565b6000611794600183611ca5565b915061179f82612159565b600182019050919050565b60006117b7602083611c94565b91506117c282612182565b602082019050919050565b60006117da600183611ca5565b91506117e5826121ab565b600182019050919050565b60006117fd602683611ca5565b9150611808826121b4565b602682019050919050565b6000611820601483611c94565b915061182b82612203565b602082019050919050565b6000611843600983611ca5565b915061184e8261222c565b600982019050919050565b6000611866602583611c94565b915061187182612255565b604082019050919050565b61188581611e12565b82525050565b61189c61189782611e1c565b611f23565b82525050565b6118b36118ae82611e2c565b611f35565b82525050565b60006118c5828461161a565b915081905092915050565b60006118dc828661161a565b91506118e98284866115bc565b9150819050949350505050565b6000611901826116b5565b915061190d828561188b565b60048201915061191c82611836565b9150611928828461161a565b91508190509392505050565b600061193f826116fb565b915061194b8284611570565b60148201915061195a8261171e565b915081905092915050565b600061197082611764565b915061197c8286611570565b60148201915061198c82856115a5565b60208201915061199c82846115a5565b602082019150819050949350505050565b60006119b8826117cd565b91506119c4828461161a565b915081905092915050565b60006119da826117f0565b91506119e68284611684565b91506119f182611787565b915081905092915050565b6000611a0882876118a2565b600182019150611a1882866118a2565b600182019150611a2882856118a2565b600182019150611a38828461161a565b915081905095945050505050565b6000602082019050611a5b6000830184611561565b92915050565b6000602082019050611a766000830184611587565b92915050565b6000604082019050611a916000830185611596565b611a9e6020830184611596565b9392505050565b60006020820190508181036000830152611abf81846115e1565b905092915050565b60006020820190508181036000830152611ae1818461164b565b905092915050565b60006020820190508181036000830152611b02816116d8565b9050919050565b60006020820190508181036000830152611b2281611741565b9050919050565b60006020820190508181036000830152611b42816117aa565b9050919050565b60006020820190508181036000830152611b6281611813565b9050919050565b60006020820190508181036000830152611b8281611859565b9050919050565b6000602082019050611b9e600083018461187c565b92915050565b6000606082019050611bb9600083018661187c565b611bc6602083018561187c565b611bd3604083018461187c565b949350505050565b6000611be5611bf6565b9050611bf18282611e7b565b919050565b6000604051905090565b600067ffffffffffffffff821115611c1b57611c1a611fd6565b5b611c2482612005565b9050602081019050919050565b600067ffffffffffffffff821115611c4c57611c4b611fd6565b5b611c5582612005565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b60008085851115611cc057600080fd5b83861115611ccd57600080fd5b6001850283019150848603905094509492505050565b6000611cee82611e12565b9150611cf983611e12565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611d2e57611d2d611f78565b5b828201905092915050565b6000611d4482611e12565b9150611d4f83611e12565b925082611d5f57611d5e611fa7565b5b828204905092915050565b6000611d7582611e12565b9150611d8083611e12565b925082821015611d9357611d92611f78565b5b828203905092915050565b6000611da982611df2565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b83811015611e66578082015181840152602081019050611e4b565b83811115611e75576000848401525b50505050565b611e8482612005565b810181811067ffffffffffffffff82111715611ea357611ea2611fd6565b5b80604052505050565b6000611eb782611e12565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611eea57611ee9611f78565b5b600182019050919050565b6000611f0082611f11565b9050919050565b6000819050919050565b6000611f1c82612030565b9050919050565b6000611f2e82612016565b9050919050565b6000611f4082612023565b9050919050565b6000611f5282611e12565b9150611f5d83611e12565b925082611f6d57611f6c611fa7565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b60008160e01b9050919050565b60008160f81b9050919050565b60008160601b9050919050565b7f6300000000000000000000000000000000000000000000000000000000000000600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7fd694000000000000000000000000000000000000000000000000000000000000600082015250565b7f0100000000000000000000000000000000000000000000000000000000000000600082015250565b7f636f6c6f7273206d75737420636f6d6520696e20722c672c62207475706c6573600082015250565b7fff00000000000000000000000000000000000000000000000000000000000000600082015250565b7f7d00000000000000000000000000000000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60008082015250565b7f7b2274726169745f74797065223a202244617461204c656e677468222c20227660008201527f616c7565223a0000000000000000000000000000000000000000000000000000602082015250565b7f746f55696e7433325f6f75744f66426f756e6473000000000000000000000000600082015250565b7f80600e6000396000f30000000000000000000000000000000000000000000000600082015250565b7f4d6178206e756d626572206f6620636f6e66696775726174696f6e7320616c6c60008201527f6f7765642e000000000000000000000000000000000000000000000000000000602082015250565b6122ad81611d9e565b81146122b857600080fd5b50565b6122c481611dc6565b81146122cf57600080fd5b50565b6122db81611e12565b81146122e657600080fd5b50565b6122f281611e2c565b81146122fd57600080fd5b5056fe697066733a2f2f6261666b72656968637a36377976766c6f74626e3478337033357764627064653237726c6469686c7a6f7167326b6c626d653775366c6568786e61a26469706673582212201fd05759ea8d09bb20bfd3f20d5cac5a6871179415686f6c018e55db372f39ae64736f6c63430008040033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        anonymous?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        anonymous?: undefined;
        outputs?: undefined;
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
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
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
    static createInterface(): ConfiguredGifImageRendererInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ConfiguredGifImageRenderer;
}
export {};
//# sourceMappingURL=ConfiguredGifImageRenderer__factory.d.ts.map