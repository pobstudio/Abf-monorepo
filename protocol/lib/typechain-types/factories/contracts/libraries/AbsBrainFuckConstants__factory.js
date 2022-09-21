"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsBrainFuckConstants__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "ANIMATION_RENDER_TYPE",
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
        inputs: [],
        name: "ATTRIBUTES_RENDER_TYPE",
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
        inputs: [],
        name: "DEFAULT_CONTRACT_DESCRIPTION",
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
        inputs: [],
        name: "DEFAULT_CONTRACT_IMAGE",
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
        inputs: [],
        name: "IMAGE_RENDER_TYPE",
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
        inputs: [],
        name: "METADATA_RENDER_TYPE",
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
        inputs: [],
        name: "MIDDLEWARE_RENDER_TYPE",
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
];
const _bytecode = "0x61050d610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100875760003560e01c80639d84a617116100655780639d84a617146100e6578063be931b2414610104578063d9275b4914610122578063d9f513ed1461014057610087565b806332aac5031461008c5780633eaff467146100aa5780634defa224146100c8575b600080fd5b61009461015e565b6040516100a191906102ef565b60405180910390f35b6100b2610197565b6040516100bf91906102ef565b60405180910390f35b6100d06101d0565b6040516100dd91906102ef565b60405180910390f35b6100ee6101ec565b6040516100fb91906102ef565b60405180910390f35b61010c610225565b60405161011991906102ef565b60405180910390f35b61012a610244565b60405161013791906102ef565b60405180910390f35b61014861027d565b60405161015591906102ef565b60405180910390f35b6040518060400160405280600581526020017f696d61676500000000000000000000000000000000000000000000000000000081525081565b6040518060400160405280600a81526020017f6d6964646c65776172650000000000000000000000000000000000000000000081525081565b6040518060600160405280603681526020016104a26036913981565b6040518060400160405280600d81526020017f616e696d6174696f6e5f75726c0000000000000000000000000000000000000081525081565b6040518061016001604052806101308152602001610372610130913981565b6040518060400160405280600881526020017f6d6574616461746100000000000000000000000000000000000000000000000081525081565b6040518060400160405280600a81526020017f617474726962757465730000000000000000000000000000000000000000000081525081565b60006102c182610311565b6102cb818561031c565b93506102db81856020860161032d565b6102e481610360565b840191505092915050565b6000602082019050818103600083015261030981846102b6565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561034b578082015181840152602081019050610330565b8381111561035a576000848401525b50505050565b6000601f19601f830116905091905056fe22646174613a696d6167652f7376672b786d6c3b6261736536342c50484e325a79423361575230614430694d6a55324969426f5a576c6e61485139496a49314e694967646d6c6c64304a76654430694d434177494449314e6941794e54596949475a7062477739496d3576626d5569494868746247357a50534a6f644852774f693876643364334c6e637a4c6d39795a7938794d4441774c334e325a79492b436a78795a574e30494864705a48526f505349794e5459694947686c6157646f644430694d6a55324969426d6157787350534a3361476c305a53497650676f3859326c795932786c49474e34505349784d6a67754e53496759336b39496a45794f43343149694279505349794d4334314969426d6157787350534a696247466a6179497650676f384c334e325a7a344b22224f6e2d636861696e2067656e6572617469766520617274207573696e67204142462052656e64657265722070726f746f636f6c2e22a26469706673582212203bf016da89b09479c71f176bbd2864a4d51488bc84b94c2d4ec7deafd39e8eac64736f6c63430008040033";
const isSuperArgs = (xs) => xs.length > 1;
class AbsBrainFuckConstants__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
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
exports.AbsBrainFuckConstants__factory = AbsBrainFuckConstants__factory;
AbsBrainFuckConstants__factory.bytecode = _bytecode;
AbsBrainFuckConstants__factory.abi = _abi;
//# sourceMappingURL=AbsBrainFuckConstants__factory.js.map