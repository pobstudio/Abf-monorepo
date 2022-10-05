"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressedAnimatedGifRenderer__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_animatedGifImageRenderer",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "ErrorCreatingContract",
        type: "error",
    },
    {
        inputs: [],
        name: "ErrorCreatingProxy",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_size",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_start",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_end",
                type: "uint256",
            },
        ],
        name: "InvalidCodeAtRange",
        type: "error",
    },
    {
        inputs: [],
        name: "TargetAlreadyExists",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "AddedConfiguration",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "COLOR_CONFIGURATION_INDEX",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "COMPRESSED_DATA_MIN_INDEX",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "HEIGHT_INDEX",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "IMAGE_DATA_START_INDEX",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MAX_NUM_CONFIGURATIONS",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "WIDTH_INDEX",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "additionalMetadataURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes[]",
                name: "colorTables",
                type: "bytes[]",
            },
        ],
        name: "batchAddColorTables",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "props",
                type: "bytes",
            },
        ],
        name: "convertProps",
        outputs: [
            {
                internalType: "bytes",
                name: "output",
                type: "bytes",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "getColorTable",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maxConfigurationIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "propsSize",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "props",
                type: "bytes",
            },
        ],
        name: "render",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "props",
                type: "bytes",
            },
        ],
        name: "renderRaw",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renderType",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405260016002553480156200001657600080fd5b5060405162002bf238038062002bf283398181016040528101906200003c919062000187565b6200005c62000050620000a460201b60201c565b620000ac60201b60201c565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505062000201565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000815190506200018181620001e7565b92915050565b6000602082840312156200019a57600080fd5b6000620001aa8482850162000170565b91505092915050565b6000620001c082620001c7565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b620001f281620001b3565b8114620001fe57600080fd5b50565b6129e180620002116000396000f3fe608060405234801561001057600080fd5b506004361061012a5760003560e01c806343c5820c116100ad57806392348b221161007157806392348b2214610337578063b1488fbd14610355578063c87c43a414610373578063d6ac7434146103a3578063f2fde38b146103c15761012a565b806343c5820c146102a3578063715018a6146102d357806371a835ff146102dd57806381612ceb146102fb5780638da5cb5b146103195761012a565b80632507de41116100f45780632507de41146101e9578063272730ba146102075780632f8782a814610225578063316df61e14610243578063342de290146102735761012a565b8062a85d691461012f578062e061651461014d57806301ffc9a71461016b57806306fdde031461019b57806317ddd9db146101b9575b600080fd5b6101376103dd565b60405161014491906121c5565b60405180910390f35b610155610405565b60405161016291906121c5565b60405180910390f35b61018560048036038101906101809190611a8e565b61040b565b604051610192919061205d565b60405180910390f35b6101a3610485565b6040516101b091906120c3565b60405180910390f35b6101d360048036038101906101ce9190611a4d565b6104c2565b6040516101e091906121c5565b60405180910390f35b6101f16106d7565b6040516101fe91906121c5565b60405180910390f35b61020f6106dc565b60405161021c91906121c5565b60405180910390f35b61022d6106e1565b60405161023a91906121c5565b60405180910390f35b61025d60048036038101906102589190611ab7565b6106e6565b60405161026a91906120c3565b60405180910390f35b61028d60048036038101906102889190611b7e565b6108b3565b60405161029a91906120a1565b60405180910390f35b6102bd60048036038101906102b89190611ab7565b6108c8565b6040516102ca91906120a1565b60405180910390f35b6102db610a95565b005b6102e5610aa9565b6040516102f291906121c5565b60405180910390f35b610303610ab1565b60405161031091906120c3565b60405180910390f35b610321610aee565b60405161032e9190612042565b60405180910390f35b61033f610afd565b60405161034c91906120c3565b60405180910390f35b61035d610b1d565b60405161036a91906121c5565b60405180910390f35b61038d60048036038101906103889190611ab7565b610b22565b60405161039a91906120a1565b60405180910390f35b6103ab610faf565b6040516103b891906121c5565b60405180910390f35b6103db60048036038101906103d69190611a24565b610fb4565b005b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905090565b60025481565b60007fea0d9bea000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061047e575061047d82611038565b5b9050919050565b60606040518060400160405280600e81526020017f436f6d7072657373656420476966000000000000000000000000000000000000815250905090565b600080600090505b82518110156106cc5760006003848381518110610510577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101515161052391906125ed565b14610563576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055a90612125565b60405180910390fd5b61062060025460001b60038584815181106105a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151516105ba919061236e565b8584815181106105f3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015160405160200161060c92919061201a565b6040516020818303038152906040526110a2565b507f12ace6f0b54dc6c4abfb9aad10026ee778ec35756eaf7fe7ecd7afa44e973f3560025460405161065291906121c5565b60405180910390a16002600081548092919061066d90612548565b919050555063ffffffff60025411156106bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106b2906121a5565b60405180910390fd5b806106c590612548565b90506104ca565b506002549050919050565b600181565b600681565b608081565b6060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663316df61e84846000818110610760577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b858560018181106107a4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b61080e61080088888080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505060026110ea565b63ffffffff1660001b611151565b6108188888610b22565b60405160200161082b9493929190611ec0565b6040516020818303038152906040526040518263ffffffff1660e01b815260040161085691906120a1565b60006040518083038186803b15801561086e57600080fd5b505afa158015610882573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906108ab9190611b3d565b905092915050565b60606108c18260001b611151565b9050919050565b6060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166343c5820c84846000818110610942577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b85856001818110610986577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b6109f06109e288888080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505060026110ea565b63ffffffff1660001b611151565b6109fa8888610b22565b604051602001610a0d9493929190611ec0565b6040516020818303038152906040526040518263ffffffff1660e01b8152600401610a3891906120a1565b60006040518083038186803b158015610a5057600080fd5b505afa158015610a64573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610a8d9190611afc565b905092915050565b610a9d611196565b610aa76000611214565b565b63ffffffff81565b60606040518060400160405280600581526020017f696d616765000000000000000000000000000000000000000000000000000000815250905090565b6000610af86112d8565b905090565b606060405180608001604052806042815260200161296a60429139905090565b600281565b60606000610b7584848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506001611301565b610bc485858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506000611301565b610bce919061239f565b60ff16905060008167ffffffffffffffff811115610c15577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610c475781602001600182028036833780820191505090505b5090506000610c9b86868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506006611368565b61ffff16905060008060f81b9050600060026006610cb99190612318565b90505b87879050811015610f80576000888883818110610d02577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b905060008160f81c60ff1690506080811015610da15781868681518110610d5c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508193508480610d9990612548565b955050610f6d565b6080811415610eb8578786604051602001610dbd929190611f1d565b60405160208183030381529060405297508667ffffffffffffffff811115610e0e577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610e405781602001600182028036833780820191505090505b5095508280610e4e90612548565b935050610e9f8a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505084611368565b61ffff1694508280610eb090612548565b935050610f6c565b6000608082610ec791906123da565b905060005b81811015610f5b5785888289610ee29190612318565b81518110610f19577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080610f5390612548565b915050610ecc565b508086610f689190612318565b9550505b5b505080610f7990612548565b9050610cbc565b508483604051602001610f94929190611f1d565b60405160208183030381529060405294505050505092915050565b600081565b610fbc611196565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561102c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611023906120e5565b60405180910390fd5b61103581611214565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6000806110cd836040516020016110b99190611ff8565b6040516020818303038152906040526113cf565b90506110e16110db856113fb565b82611450565b91505092915050565b60006004826110f99190612318565b8351101561113c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161113390612185565b60405180910390fd5b60008260048501015190508091505092915050565b606061118f611167611162846113fb565b611466565b60017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6114ee565b9050919050565b61119e6115d4565b73ffffffffffffffffffffffffffffffffffffffff166111bc610aee565b73ffffffffffffffffffffffffffffffffffffffff1614611212576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120990612145565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006001826113109190612318565b83511015611353576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161134a90612165565b60405180910390fd5b60008260018501015190508091505092915050565b60006002826113779190612318565b835110156113ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113b190612105565b60405180910390fd5b60008260028501015190508091505092915050565b60608151826040516020016113e5929190611f41565b6040516020818303038152906040529050919050565b60007fd351a9253491dfef66f53115e9e3afda3b5fdef08a1de6937da91188ec553be560001b82604051602001611433929190612078565b604051602081830303815290604052805190602001209050919050565b600061145e838360006115dc565b905092915050565b60008030837f21c35dbe1b344a2488cf3321d6ce542f8e9f305544ff09e4993a62319a497c1f60001b6040516020016114a193929190611fb0565b6040516020818303038152906040528051906020012060001c9050806040516020016114cd9190611f7f565b6040516020818303038152906040528051906020012060001c915050919050565b606060006114fb8561179d565b9050600081141561151e57604051806020016040528060008152509150506115cd565b8084111561153e57604051806020016040528060008152509150506115cd565b83831015611587578084846040517f2c4a89fa00000000000000000000000000000000000000000000000000000000815260040161157e939291906121e0565b60405180910390fd5b600084840390506000858303905060008282106115a457826115a6565b815b90506040519450601f19601f60208301011685016040528085528087602087018a3c505050505b9392505050565b600033905090565b6000806040518060400160405280601081526020017f67363d3d37363d34f03d5260086018f300000000000000000000000000000000815250905061162085611466565b9150600061162d836117a8565b14611664576040517fcd43efa100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000858251602084016000f59050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156116d9576040517fbbd2fe8700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008173ffffffffffffffffffffffffffffffffffffffff1685876040516117019190611f06565b60006040518083038185875af1925050503d806000811461173e576040519150601f19603f3d011682016040523d82523d6000602084013e611743565b606091505b5050905080158061175c5750600061175a856117a8565b145b15611793576040517f53de54b900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050509392505050565b6000813b9050919050565b6000813b9050919050565b60006117c66117c18461223c565b612217565b905080838252602082019050828560208602820111156117e557600080fd5b60005b8581101561182f57813567ffffffffffffffff81111561180757600080fd5b8086016118148982611991565b855260208501945060208401935050506001810190506117e8565b5050509392505050565b600061184c61184784612268565b612217565b90508281526020810184848401111561186457600080fd5b61186f8482856124d5565b509392505050565b600061188a61188584612268565b612217565b9050828152602081018484840111156118a257600080fd5b6118ad8482856124e4565b509392505050565b60006118c86118c384612299565b612217565b9050828152602081018484840111156118e057600080fd5b6118eb8482856124e4565b509392505050565b60008135905061190281612924565b92915050565b600082601f83011261191957600080fd5b81356119298482602086016117b3565b91505092915050565b6000813590506119418161293b565b92915050565b60008083601f84011261195957600080fd5b8235905067ffffffffffffffff81111561197257600080fd5b60208301915083600182028301111561198a57600080fd5b9250929050565b600082601f8301126119a257600080fd5b81356119b2848260208601611839565b91505092915050565b600082601f8301126119cc57600080fd5b81516119dc848260208601611877565b91505092915050565b600082601f8301126119f657600080fd5b8151611a068482602086016118b5565b91505092915050565b600081359050611a1e81612952565b92915050565b600060208284031215611a3657600080fd5b6000611a44848285016118f3565b91505092915050565b600060208284031215611a5f57600080fd5b600082013567ffffffffffffffff811115611a7957600080fd5b611a8584828501611908565b91505092915050565b600060208284031215611aa057600080fd5b6000611aae84828501611932565b91505092915050565b60008060208385031215611aca57600080fd5b600083013567ffffffffffffffff811115611ae457600080fd5b611af085828601611947565b92509250509250929050565b600060208284031215611b0e57600080fd5b600082015167ffffffffffffffff811115611b2857600080fd5b611b34848285016119bb565b91505092915050565b600060208284031215611b4f57600080fd5b600082015167ffffffffffffffff811115611b6957600080fd5b611b75848285016119e5565b91505092915050565b600060208284031215611b9057600080fd5b6000611b9e84828501611a0f565b91505092915050565b611bb08161240e565b82525050565b611bc7611bc28261240e565b612591565b82525050565b611bd681612420565b82525050565b611bed611be88261242c565b6125a3565b82525050565b611bfc81612458565b82525050565b611c13611c0e82612458565b6125ad565b82525050565b6000611c24826122ca565b611c2e81856122e0565b9350611c3e8185602086016124e4565b611c47816126ab565b840191505092915050565b6000611c5d826122ca565b611c6781856122f1565b9350611c778185602086016124e4565b80840191505092915050565b6000611c8e826122d5565b611c9881856122fc565b9350611ca88185602086016124e4565b611cb1816126ab565b840191505092915050565b6000611cc960018361230d565b9150611cd4826126e3565b600182019050919050565b6000611cec6026836122fc565b9150611cf78261270c565b604082019050919050565b6000611d0f6014836122fc565b9150611d1a8261275b565b602082019050919050565b6000611d3260028361230d565b9150611d3d82612784565b600282019050919050565b6000611d5560018361230d565b9150611d60826127ad565b600182019050919050565b6000611d786020836122fc565b9150611d83826127d6565b602082019050919050565b6000611d9b60018361230d565b9150611da6826127ff565b600182019050919050565b6000611dbe6020836122fc565b9150611dc982612828565b602082019050919050565b6000611de160018361230d565b9150611dec82612851565b600182019050919050565b6000611e046013836122fc565b9150611e0f8261285a565b602082019050919050565b6000611e276014836122fc565b9150611e3282612883565b602082019050919050565b6000611e4a60098361230d565b9150611e55826128ac565b600982019050919050565b6000611e6d6025836122fc565b9150611e78826128d5565b604082019050919050565b611e8c816124ae565b82525050565b611ea3611e9e826124b8565b6125c9565b82525050565b611eba611eb5826124c8565b6125db565b82525050565b6000611ecc8287611bdc565b600182019150611edc8286611bdc565b600182019150611eec8285611c52565b9150611ef88284611c52565b915081905095945050505050565b6000611f128284611c52565b915081905092915050565b6000611f298285611c52565b9150611f358284611c52565b91508190509392505050565b6000611f4c82611cbc565b9150611f588285611e92565b600482019150611f6782611e3d565b9150611f738284611c52565b91508190509392505050565b6000611f8a82611d25565b9150611f968284611bb6565b601482019150611fa582611d48565b915081905092915050565b6000611fbb82611d8e565b9150611fc78286611bb6565b601482019150611fd78285611c02565b602082019150611fe78284611c02565b602082019150819050949350505050565b600061200382611dd4565b915061200f8284611c52565b915081905092915050565b60006120268285611ea9565b6001820191506120368284611c52565b91508190509392505050565b60006020820190506120576000830184611ba7565b92915050565b60006020820190506120726000830184611bcd565b92915050565b600060408201905061208d6000830185611bf3565b61209a6020830184611bf3565b9392505050565b600060208201905081810360008301526120bb8184611c19565b905092915050565b600060208201905081810360008301526120dd8184611c83565b905092915050565b600060208201905081810360008301526120fe81611cdf565b9050919050565b6000602082019050818103600083015261211e81611d02565b9050919050565b6000602082019050818103600083015261213e81611d6b565b9050919050565b6000602082019050818103600083015261215e81611db1565b9050919050565b6000602082019050818103600083015261217e81611df7565b9050919050565b6000602082019050818103600083015261219e81611e1a565b9050919050565b600060208201905081810360008301526121be81611e60565b9050919050565b60006020820190506121da6000830184611e83565b92915050565b60006060820190506121f56000830186611e83565b6122026020830185611e83565b61220f6040830184611e83565b949350505050565b6000612221612232565b905061222d8282612517565b919050565b6000604051905090565b600067ffffffffffffffff8211156122575761225661267c565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156122835761228261267c565b5b61228c826126ab565b9050602081019050919050565b600067ffffffffffffffff8211156122b4576122b361267c565b5b6122bd826126ab565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000612323826124ae565b915061232e836124ae565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156123635761236261261e565b5b828201905092915050565b6000612379826124ae565b9150612384836124ae565b9250826123945761239361264d565b5b828204905092915050565b60006123aa826124c8565b91506123b5836124c8565b92508160ff04831182151516156123cf576123ce61261e565b5b828202905092915050565b60006123e5826124ae565b91506123f0836124ae565b9250828210156124035761240261261e565b5b828203905092915050565b60006124198261248e565b9050919050565b60008115159050919050565b60007fff0000000000000000000000000000000000000000000000000000000000000082169050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b838110156125025780820151818401526020810190506124e7565b83811115612511576000848401525b50505050565b612520826126ab565b810181811067ffffffffffffffff8211171561253f5761253e61267c565b5b80604052505050565b6000612553826124ae565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156125865761258561261e565b5b600182019050919050565b600061259c826125b7565b9050919050565b6000819050919050565b6000819050919050565b60006125c2826126d6565b9050919050565b60006125d4826126bc565b9050919050565b60006125e6826126c9565b9050919050565b60006125f8826124ae565b9150612603836124ae565b9250826126135761261261264d565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b60008160e01b9050919050565b60008160f81b9050919050565b60008160601b9050919050565b7f6300000000000000000000000000000000000000000000000000000000000000600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f746f55696e7431365f6f75744f66426f756e6473000000000000000000000000600082015250565b7fd694000000000000000000000000000000000000000000000000000000000000600082015250565b7f0100000000000000000000000000000000000000000000000000000000000000600082015250565b7f636f6c6f7273206d75737420636f6d6520696e20722c672c62207475706c6573600082015250565b7fff00000000000000000000000000000000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60008082015250565b7f746f55696e74385f6f75744f66426f756e647300000000000000000000000000600082015250565b7f746f55696e7433325f6f75744f66426f756e6473000000000000000000000000600082015250565b7f80600e6000396000f30000000000000000000000000000000000000000000000600082015250565b7f4d6178206e756d626572206f6620636f6e66696775726174696f6e7320616c6c60008201527f6f7765642e000000000000000000000000000000000000000000000000000000602082015250565b61292d8161240e565b811461293857600080fd5b50565b61294481612462565b811461294f57600080fd5b50565b61295b816124ae565b811461296657600080fd5b5056fe697066733a2f2f6261666b72656968637a36377976766c6f74626e3478337033357764627064653237726c6469686c7a6f7167326b6c626d653775366c6568786e61a264697066735822122073e8b8aee1359d6cae3bd2e9a524af4845867a9b8cc2e7dd3e908300bd3fc35664736f6c63430008040033";
const isSuperArgs = (xs) => xs.length > 1;
class CompressedAnimatedGifRenderer__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_animatedGifImageRenderer, overrides) {
        return super.deploy(_animatedGifImageRenderer, overrides || {});
    }
    getDeployTransaction(_animatedGifImageRenderer, overrides) {
        return super.getDeployTransaction(_animatedGifImageRenderer, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.CompressedAnimatedGifRenderer__factory = CompressedAnimatedGifRenderer__factory;
CompressedAnimatedGifRenderer__factory.bytecode = _bytecode;
CompressedAnimatedGifRenderer__factory.abi = _abi;
//# sourceMappingURL=CompressedAnimatedGifRenderer__factory.js.map