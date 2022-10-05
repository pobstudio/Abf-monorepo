"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721ZFactory__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_erc721zImplementation",
                type: "address",
            },
            {
                internalType: "address",
                name: "_abfMinterImplementation",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "nft",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "minter",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "creator",
                type: "address",
            },
        ],
        name: "CreatedNFT",
        type: "event",
    },
    {
        inputs: [],
        name: "abfMinterImplementation",
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
        inputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "symbol",
                        type: "string",
                    },
                    {
                        internalType: "bytes32",
                        name: "seed",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes",
                        name: "contractMetadataPropsPrefix",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "contractMetadataPropsSuffix",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "suffix",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "prefix",
                        type: "bytes",
                    },
                    {
                        internalType: "address",
                        name: "contractMetadataRenderer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "metadataRenderer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "adminMinter",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "mintingSupply",
                        type: "uint256",
                    },
                    {
                        internalType: "uint96",
                        name: "royaltyFraction",
                        type: "uint96",
                    },
                    {
                        internalType: "bytes32",
                        name: "tokenDescriptionKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "bool",
                        name: "allowRendererSwapping",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "tokenDescription",
                        type: "bytes",
                    },
                ],
                internalType: "struct ERC721Z.InitConfig",
                name: "config",
                type: "tuple",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint96",
                        name: "rendererRoyaltyFraction",
                        type: "uint96",
                    },
                    {
                        internalType: "address",
                        name: "whitelistToken",
                        type: "address",
                    },
                ],
                internalType: "struct AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfig",
                name: "minterConfig",
                type: "tuple",
            },
        ],
        name: "createNFT",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "erc721zImplementation",
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
];
const _bytecode = "0x60c060405234801561001057600080fd5b50604051620010a3380380620010a3833981810160405281019061003491906100be565b8173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b815250508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1660601b815250505050610143565b6000815190506100b88161012c565b92915050565b600080604083850312156100d157600080fd5b60006100df858286016100a9565b92505060206100f0858286016100a9565b9150509250929050565b60006101058261010c565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b610135816100fa565b811461014057600080fd5b50565b60805160601c60a05160601c610f276200017c600039600081816101c9015261038001526000818160bd01526103a40152610f276000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806380432a4e14610046578063b3d60b7014610077578063cda6b05614610095575b600080fd5b610060600480360381019061005b919061083c565b6100b3565b60405161006e929190610b58565b60405180910390f35b61007f61037e565b60405161008c9190610b3d565b60405180910390f35b61009d6103a2565b6040516100aa9190610b3d565b60405180910390f35b60008060006100e17f00000000000000000000000000000000000000000000000000000000000000006103c6565b90508073ffffffffffffffffffffffffffffffffffffffff16639923b19330876040518363ffffffff1660e01b815260040161011e929190610bef565b600060405180830381600087803b15801561013857600080fd5b505af115801561014c573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff16638f2fc60b338761016001516040518363ffffffff1660e01b8152600401610190929190610c1f565b600060405180830381600087803b1580156101aa57600080fd5b505af11580156101be573d6000803e3d6000fd5b5050505060006101ed7f00000000000000000000000000000000000000000000000000000000000000006103c6565b90508073ffffffffffffffffffffffffffffffffffffffff1663aa6296bb3384886040518463ffffffff1660e01b815260040161022c93929190610bb8565b600060405180830381600087803b15801561024657600080fd5b505af115801561025a573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff1663f24b8721826040518263ffffffff1660e01b81526004016102979190610b3d565b600060405180830381600087803b1580156102b157600080fd5b505af11580156102c5573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff1663f2fde38b336040518263ffffffff1660e01b81526004016103029190610b3d565b600060405180830381600087803b15801561031c57600080fd5b505af1158015610330573d6000803e3d6000fd5b505050507fea565321f1841d94b79ccc4729b04247aefff2f98f1ebfd86f842a19193d05ec82823360405161036793929190610b81565b60405180910390a181819350935050509250929050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b60006040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528260601b60148201527f5af43d82803e903d91602b57fd5bf3000000000000000000000000000000000060288201526037816000f0915050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610496576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048d90610c48565b60405180910390fd5b919050565b60006104ae6104a984610c8d565b610c68565b9050828152602081018484840111156104c657600080fd5b6104d1848285610da2565b509392505050565b60006104ec6104e784610cbe565b610c68565b90508281526020810184848401111561050457600080fd5b61050f848285610da2565b509392505050565b60008135905061052681610e7e565b92915050565b60008135905061053b81610e95565b92915050565b60008135905061055081610eac565b92915050565b600082601f83011261056757600080fd5b813561057784826020860161049b565b91505092915050565b600082601f83011261059157600080fd5b81356105a18482602086016104d9565b91505092915050565b6000606082840312156105bc57600080fd5b6105c66060610c68565b905060006105d684828501610812565b60008301525060206105ea84828501610827565b60208301525060406105fe84828501610517565b60408301525092915050565b60006101e0828403121561061d57600080fd5b6106286101e0610c68565b9050600082013567ffffffffffffffff81111561064457600080fd5b61065084828501610580565b600083015250602082013567ffffffffffffffff81111561067057600080fd5b61067c84828501610580565b602083015250604061069084828501610541565b604083015250606082013567ffffffffffffffff8111156106b057600080fd5b6106bc84828501610556565b606083015250608082013567ffffffffffffffff8111156106dc57600080fd5b6106e884828501610556565b60808301525060a082013567ffffffffffffffff81111561070857600080fd5b61071484828501610556565b60a08301525060c082013567ffffffffffffffff81111561073457600080fd5b61074084828501610556565b60c08301525060e061075484828501610517565b60e08301525061010061076984828501610517565b6101008301525061012061077f84828501610517565b6101208301525061014061079584828501610812565b610140830152506101606107ab84828501610827565b610160830152506101806107c184828501610541565b610180830152506101a06107d78482850161052c565b6101a0830152506101c082013567ffffffffffffffff8111156107f957600080fd5b61080584828501610556565b6101c08301525092915050565b60008135905061082181610ec3565b92915050565b60008135905061083681610eda565b92915050565b6000806080838503121561084f57600080fd5b600083013567ffffffffffffffff81111561086957600080fd5b6108758582860161060a565b9250506020610886858286016105aa565b9150509250929050565b61089981610d38565b82525050565b6108a881610d38565b82525050565b6108b781610d4a565b82525050565b6108c681610d56565b82525050565b60006108d782610cef565b6108e18185610d05565b93506108f1818560208601610db1565b6108fa81610e44565b840191505092915050565b600061091082610cfa565b61091a8185610d16565b935061092a818560208601610db1565b61093381610e44565b840191505092915050565b600061094b601683610d27565b915061095682610e55565b602082019050919050565b6060820160008201516109776000850182610b10565b50602082015161098a6020850182610b1f565b50604082015161099d6040850182610890565b50505050565b60006101e08301600083015184820360008601526109c18282610905565b915050602083015184820360208601526109db8282610905565b91505060408301516109f060408601826108bd565b5060608301518482036060860152610a0882826108cc565b91505060808301518482036080860152610a2282826108cc565b91505060a083015184820360a0860152610a3c82826108cc565b91505060c083015184820360c0860152610a5682826108cc565b91505060e0830151610a6b60e0860182610890565b50610100830151610a80610100860182610890565b50610120830151610a95610120860182610890565b50610140830151610aaa610140860182610b10565b50610160830151610abf610160860182610b1f565b50610180830151610ad46101808601826108bd565b506101a0830151610ae96101a08601826108ae565b506101c08301518482036101c0860152610b0382826108cc565b9150508091505092915050565b610b1981610d80565b82525050565b610b2881610d8a565b82525050565b610b3781610d8a565b82525050565b6000602082019050610b52600083018461089f565b92915050565b6000604082019050610b6d600083018561089f565b610b7a602083018461089f565b9392505050565b6000606082019050610b96600083018661089f565b610ba3602083018561089f565b610bb0604083018461089f565b949350505050565b600060a082019050610bcd600083018661089f565b610bda602083018561089f565b610be76040830184610961565b949350505050565b6000604082019050610c04600083018561089f565b8181036020830152610c1681846109a3565b90509392505050565b6000604082019050610c34600083018561089f565b610c416020830184610b2e565b9392505050565b60006020820190508181036000830152610c618161093e565b9050919050565b6000610c72610c83565b9050610c7e8282610de4565b919050565b6000604051905090565b600067ffffffffffffffff821115610ca857610ca7610e15565b5b610cb182610e44565b9050602081019050919050565b600067ffffffffffffffff821115610cd957610cd8610e15565b5b610ce282610e44565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000610d4382610d60565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006bffffffffffffffffffffffff82169050919050565b82818337600083830152505050565b60005b83811015610dcf578082015181840152602081019050610db4565b83811115610dde576000848401525b50505050565b610ded82610e44565b810181811067ffffffffffffffff82111715610e0c57610e0b610e15565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f455243313136373a20637265617465206661696c656400000000000000000000600082015250565b610e8781610d38565b8114610e9257600080fd5b50565b610e9e81610d4a565b8114610ea957600080fd5b50565b610eb581610d56565b8114610ec057600080fd5b50565b610ecc81610d80565b8114610ed757600080fd5b50565b610ee381610d8a565b8114610eee57600080fd5b5056fea2646970667358221220d0604632c4cb5c377bb9b4e4ab16b8590d57aed120e288714631a87bdbc677fc64736f6c63430008040033";
const isSuperArgs = (xs) => xs.length > 1;
class ERC721ZFactory__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_erc721zImplementation, _abfMinterImplementation, overrides) {
        return super.deploy(_erc721zImplementation, _abfMinterImplementation, overrides || {});
    }
    getDeployTransaction(_erc721zImplementation, _abfMinterImplementation, overrides) {
        return super.getDeployTransaction(_erc721zImplementation, _abfMinterImplementation, overrides || {});
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
exports.ERC721ZFactory__factory = ERC721ZFactory__factory;
ERC721ZFactory__factory.bytecode = _bytecode;
ERC721ZFactory__factory.abi = _abi;
//# sourceMappingURL=ERC721ZFactory__factory.js.map