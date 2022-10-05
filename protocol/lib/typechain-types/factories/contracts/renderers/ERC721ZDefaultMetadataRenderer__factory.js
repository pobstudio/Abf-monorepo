"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721ZDefaultMetadataRenderer__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
const _bytecode = "0x60806040523480156200001157600080fd5b5062000032620000266200003860201b60201c565b6200004060201b60201c565b62000104565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6127a780620001146000396000f3fe608060405234801561001057600080fd5b506004361061009d5760003560e01c8063715018a611610066578063715018a61461016e57806381612ceb146101785780638da5cb5b1461019657806392348b22146101b4578063f2fde38b146101d25761009d565b8062a85d69146100a257806301ffc9a7146100c057806306fdde03146100f0578063316df61e1461010e57806343c5820c1461013e575b600080fd5b6100aa6101ee565b6040516100b79190612099565b60405180910390f35b6100da60048036038101906100d5919061191c565b610216565b6040516100e79190611e36565b60405180910390f35b6100f8610290565b6040516101059190611eb9565b60405180910390f35b61012860048036038101906101239190611945565b6102cd565b6040516101359190611eb9565b60405180910390f35b61015860048036038101906101539190611945565b610308565b6040516101659190611e75565b60405180910390f35b610176610d1d565b005b610180610d31565b60405161018d9190611eb9565b60405180910390f35b61019e610d6e565b6040516101ab9190611df9565b60405180910390f35b6101bc610d7d565b6040516101c99190611eb9565b60405180910390f35b6101ec60048036038101906101e791906118f3565b610dba565b005b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905090565b60007fea0d9bea000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610289575061028882610e3e565b5b9050919050565b60606040518060400160405280601481526020017f4142462044656661756c74204d65746164617461000000000000000000000000815250905090565b60606102e16102dc8484610308565b610ea8565b6040516020016102f19190611dd7565b604051602081830303815290604052905092915050565b6060600061035b84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506000611032565b905060006103ae85858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505060146110a8565b9050600061040186868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506054611032565b90506000600467ffffffffffffffff811115610446577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405190808252806020026020018201604052801561047957816020015b60608152602001906001900390816104645790505b50905060008273ffffffffffffffffffffffffffffffffffffffff1663316df61e89896040518363ffffffff1660e01b81526004016104b9929190611e51565b60006040518083038186803b1580156104d157600080fd5b505afa1580156104e5573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061050e91906119cb565b905073__$b0379c906a513596884d0341a8178e41eb$__6346193bc58473ffffffffffffffffffffffffffffffffffffffff166381612ceb6040518163ffffffff1660e01b815260040160006040518083038186803b15801561057057600080fd5b505afa158015610584573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906105ad91906119cb565b73__$b0379c906a513596884d0341a8178e41eb$__636ab94a8f856040518263ffffffff1660e01b81526004016105e49190611e97565b60006040518083038186803b1580156105fc57600080fd5b505af4158015610610573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061063991906119cb565b6040518363ffffffff1660e01b8152600401610656929190611edb565b60006040518083038186803b15801561066e57600080fd5b505af4158015610682573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906106ab91906119cb565b826000815181106106e5577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525073__$b0379c906a513596884d0341a8178e41eb$__6346193bc58673ffffffffffffffffffffffffffffffffffffffff166306fdde036040518163ffffffff1660e01b815260040160006040518083038186803b15801561075057600080fd5b505afa158015610764573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061078d91906119cb565b6107968761110f565b6040516020016107a7929190611da8565b6040516020818303038152906040526040518263ffffffff1660e01b81526004016107d29190611f67565b60006040518083038186803b1580156107ea57600080fd5b505af41580156107fe573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061082791906119cb565b82600181518110610861577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525073__$b0379c906a513596884d0341a8178e41eb$__6346193bc58673ffffffffffffffffffffffffffffffffffffffff166325e6f5166040518163ffffffff1660e01b815260040160006040518083038186803b1580156108cc57600080fd5b505afa1580156108e0573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610909919061198a565b6040518263ffffffff1660e01b81526004016109259190611f32565b60006040518083038186803b15801561093d57600080fd5b505af4158015610951573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061097a91906119cb565b826002815181106109b4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101819052506000600167ffffffffffffffff811115610a02577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610a3557816020015b6060815260200190600190039081610a205790505b50905073__$b0379c906a513596884d0341a8178e41eb$__63d756ae03610a718673ffffffffffffffffffffffffffffffffffffffff166112bc565b6040518263ffffffff1660e01b8152600401610a8d9190612051565b60006040518083038186803b158015610aa557600080fd5b505af4158015610ab9573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610ae291906119cb565b81600081518110610b1c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525073__$b0379c906a513596884d0341a8178e41eb$__6346193bc573__$b0379c906a513596884d0341a8178e41eb$__6308ec6b85846040518263ffffffff1660e01b8152600401610b789190611e14565b60006040518083038186803b158015610b9057600080fd5b505af4158015610ba4573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610bcd91906119cb565b6040518263ffffffff1660e01b8152600401610be9919061201c565b60006040518083038186803b158015610c0157600080fd5b505af4158015610c15573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610c3e91906119cb565b83600381518110610c78577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525073__$b0379c906a513596884d0341a8178e41eb$__63b4af3208846040518263ffffffff1660e01b8152600401610cba9190611e14565b60006040518083038186803b158015610cd257600080fd5b505af4158015610ce6573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610d0f91906119cb565b965050505050505092915050565b610d25611342565b610d2f60006113c0565b565b60606040518060400160405280600881526020017f6d65746164617461000000000000000000000000000000000000000000000000815250905090565b6000610d78611484565b905090565b60606040518060400160405280600b81526020017f697066733a2f2f544f444f000000000000000000000000000000000000000000815250905090565b610dc2611342565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610e32576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e2990611f9c565b60405180910390fd5b610e3b816113c0565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6060600082511415610ecb5760405180602001604052806000815250905061102d565b60006040518060600160405280604081526020016127326040913990506000600360028551610efa91906121d9565b610f04919061222f565b6004610f109190612260565b67ffffffffffffffff811115610f4f577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610f815781602001600182028036833780820191505090505b509050600182016020820185865187015b80821015610fed576003820191508151603f8160121c168501518453600184019350603f81600c1c168501518453600184019350603f8160061c168501518453600184019350603f8116850151845360018401935050610f92565b5050600386510660018114611009576002811461101c57611024565b603d6001830353603d6002830353611024565b603d60018303535b50505080925050505b919050565b600060148261104191906121d9565b83511015611084576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107b90611ffc565b60405180910390fd5b60006c01000000000000000000000000836020860101510490508091505092915050565b60006020826110b791906121d9565b835110156110fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110f190611fbc565b60405180910390fd5b60008260208501015190508091505092915050565b60606000821415611157576040518060400160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525090506112b7565b600082905060005b60008214611189578080611172906123ff565b915050600a82611182919061222f565b915061115f565b60008167ffffffffffffffff8111156111cb577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156111fd5781602001600182028036833780820191505090505b5090505b600085146112b05760018261121691906122ba565b9150600a856112259190612448565b603061123191906121d9565b60f81b81838151811061126d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856112a9919061222f565b9450611201565b8093505050505b919050565b60606000821415611304576040518060400160405280600481526020017f3078303000000000000000000000000000000000000000000000000000000000815250905061133d565b600082905060005b6000821461132e57808061131f906123ff565b915050600882901c915061130c565b61133884826114ad565b925050505b919050565b61134a6117a7565b73ffffffffffffffffffffffffffffffffffffffff16611368610d6e565b73ffffffffffffffffffffffffffffffffffffffff16146113be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113b590611fdc565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600060028360026114c09190612260565b6114ca91906121d9565b67ffffffffffffffff811115611509577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561153b5781602001600182028036833780820191505090505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110611599577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110611623577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026116639190612260565b61166d91906121d9565b90505b6001811115611759577f3031323334353637383961626364656600000000000000000000000000000000600f8616601081106116d5577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b828281518110611712577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c945080611752906123a4565b9050611670565b506000841461179d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161179490611f12565b60405180910390fd5b8091505092915050565b600033905090565b60006117c26117bd846120d9565b6120b4565b9050828152602081018484840111156117da57600080fd5b6117e5848285612371565b509392505050565b60006118006117fb8461210a565b6120b4565b90508281526020810184848401111561181857600080fd5b611823848285612371565b509392505050565b60008135905061183a81612703565b92915050565b60008135905061184f8161271a565b92915050565b60008083601f84011261186757600080fd5b8235905067ffffffffffffffff81111561188057600080fd5b60208301915083600182028301111561189857600080fd5b9250929050565b600082601f8301126118b057600080fd5b81516118c08482602086016117af565b91505092915050565b600082601f8301126118da57600080fd5b81516118ea8482602086016117ed565b91505092915050565b60006020828403121561190557600080fd5b60006119138482850161182b565b91505092915050565b60006020828403121561192e57600080fd5b600061193c84828501611840565b91505092915050565b6000806020838503121561195857600080fd5b600083013567ffffffffffffffff81111561197257600080fd5b61197e85828601611855565b92509250509250929050565b60006020828403121561199c57600080fd5b600082015167ffffffffffffffff8111156119b657600080fd5b6119c28482850161189f565b91505092915050565b6000602082840312156119dd57600080fd5b600082015167ffffffffffffffff8111156119f757600080fd5b611a03848285016118c9565b91505092915050565b6000611a188383611b8b565b905092915050565b611a29816122ee565b82525050565b6000611a3a8261214b565b611a448185612179565b935083602082028501611a568561213b565b8060005b85811015611a925784840389528151611a738582611a0c565b9450611a7e8361216c565b925060208a01995050600181019050611a5a565b50829750879550505050505092915050565b611aad81612300565b82525050565b6000611abf838561218a565b9350611acc838584612362565b611ad583612506565b840190509392505050565b6000611aeb82612156565b611af5818561218a565b9350611b05818560208601612371565b611b0e81612506565b840191505092915050565b6000611b2482612161565b611b2e818561219b565b9350611b3e818560208601612371565b611b4781612506565b840191505092915050565b6000611b5d82612161565b611b6781856121ac565b9350611b77818560208601612371565b611b8081612506565b840191505092915050565b6000611b9682612161565b611ba081856121bd565b9350611bb0818560208601612371565b611bb981612506565b840191505092915050565b6000611bcf82612161565b611bd981856121ce565b9350611be9818560208601612371565b80840191505092915050565b6000611c0260208361219b565b9150611c0d82612517565b602082019050919050565b6000611c25600b836121ac565b9150611c3082612540565b602082019050919050565b6000611c486002836121ce565b9150611c5382612569565b600282019050919050565b6000611c6b6004836121ac565b9150611c7682612592565b602082019050919050565b6000611c8e60268361219b565b9150611c99826125bb565b604082019050919050565b6000611cb160158361219b565b9150611cbc8261260a565b602082019050919050565b6000611cd460208361219b565b9150611cdf82612633565b602082019050919050565b6000611cf760158361219b565b9150611d028261265c565b602082019050919050565b6000611d1a600a836121ac565b9150611d2582612685565b602082019050919050565b6000611d3d601d836121ce565b9150611d48826126ae565b601d82019050919050565b6000611d606000836121ac565b9150611d6b826126d7565b600082019050919050565b6000611d836008836121ac565b9150611d8e826126da565b602082019050919050565b611da281612358565b82525050565b6000611db48285611bc4565b9150611dbf82611c3b565b9150611dcb8284611bc4565b91508190509392505050565b6000611de282611d30565b9150611dee8284611bc4565b915081905092915050565b6000602082019050611e0e6000830184611a20565b92915050565b60006020820190508181036000830152611e2e8184611a2f565b905092915050565b6000602082019050611e4b6000830184611aa4565b92915050565b60006020820190508181036000830152611e6c818486611ab3565b90509392505050565b60006020820190508181036000830152611e8f8184611ae0565b905092915050565b60006020820190508181036000830152611eb18184611b52565b905092915050565b60006020820190508181036000830152611ed38184611b19565b905092915050565b60006040820190508181036000830152611ef58185611b52565b90508181036020830152611f098184611b52565b90509392505050565b60006020820190508181036000830152611f2b81611bf5565b9050919050565b60006040820190508181036000830152611f4b81611c18565b90508181036020830152611f5f8184611b52565b905092915050565b60006040820190508181036000830152611f8081611c5e565b90508181036020830152611f948184611b52565b905092915050565b60006020820190508181036000830152611fb581611c81565b9050919050565b60006020820190508181036000830152611fd581611ca4565b9050919050565b60006020820190508181036000830152611ff581611cc7565b9050919050565b6000602082019050818103600083015261201581611cea565b9050919050565b6000604082019050818103600083015261203581611d0d565b905081810360208301526120498184611b52565b905092915050565b6000606082019050818103600083015261206a81611d76565b9050818103602083015261207e8184611b52565b9050818103604083015261209181611d53565b905092915050565b60006020820190506120ae6000830184611d99565b92915050565b60006120be6120cf565b90506120ca82826123ce565b919050565b6000604051905090565b600067ffffffffffffffff8211156120f4576120f36124d7565b5b6120fd82612506565b9050602081019050919050565b600067ffffffffffffffff821115612125576121246124d7565b5b61212e82612506565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b60006121e482612358565b91506121ef83612358565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561222457612223612479565b5b828201905092915050565b600061223a82612358565b915061224583612358565b925082612255576122546124a8565b5b828204905092915050565b600061226b82612358565b915061227683612358565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156122af576122ae612479565b5b828202905092915050565b60006122c582612358565b91506122d083612358565b9250828210156122e3576122e2612479565b5b828203905092915050565b60006122f982612338565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561238f578082015181840152602081019050612374565b8381111561239e576000848401525b50505050565b60006123af82612358565b915060008214156123c3576123c2612479565b5b600182039050919050565b6123d782612506565b810181811067ffffffffffffffff821117156123f6576123f56124d7565b5b80604052505050565b600061240a82612358565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561243d5761243c612479565b5b600182019050919050565b600061245382612358565b915061245e83612358565b92508261246e5761246d6124a8565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f6465736372697074696f6e000000000000000000000000000000000000000000600082015250565b7f2023000000000000000000000000000000000000000000000000000000000000600082015250565b7f6e616d6500000000000000000000000000000000000000000000000000000000600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f746f55696e743235365f6f75744f66426f756e64730000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f746f416464726573735f6f75744f66426f756e64730000000000000000000000600082015250565b7f6174747269627574657300000000000000000000000000000000000000000000600082015250565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000600082015250565b50565b7f52656e6465726572000000000000000000000000000000000000000000000000600082015250565b61270c816122ee565b811461271757600080fd5b50565b6127238161230c565b811461272e57600080fd5b5056fe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa26469706673582212209e15273e061b027a5a1bea70b7ce74ccdc93be4aabd77f06592fb5a81a6e5a5464736f6c63430008040033";
const isSuperArgs = (xs) => {
    return (typeof xs[0] === "string" ||
        Array.isArray(xs[0]) ||
        "_isInterface" in xs[0]);
};
class ERC721ZDefaultMetadataRenderer__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            const [linkLibraryAddresses, signer] = args;
            super(_abi, ERC721ZDefaultMetadataRenderer__factory.linkBytecode(linkLibraryAddresses), signer);
        }
    }
    static linkBytecode(linkLibraryAddresses) {
        let linkedBytecode = _bytecode;
        linkedBytecode = linkedBytecode.replace(new RegExp("__\\$b0379c906a513596884d0341a8178e41eb\\$__", "g"), linkLibraryAddresses["contracts/libraries/NftMetadataUtils.sol:NftMetadataUtils"]
            .replace(/^0x/, "")
            .toLowerCase());
        return linkedBytecode;
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
exports.ERC721ZDefaultMetadataRenderer__factory = ERC721ZDefaultMetadataRenderer__factory;
ERC721ZDefaultMetadataRenderer__factory.bytecode = _bytecode;
ERC721ZDefaultMetadataRenderer__factory.abi = _abi;
//# sourceMappingURL=ERC721ZDefaultMetadataRenderer__factory.js.map