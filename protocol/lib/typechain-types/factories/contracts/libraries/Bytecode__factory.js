"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bytecode__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
];
const _bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220cbb169e663bb52adb95501e5cb1a9967112a28f286c7db3035bc1e8efd8e6e7b64736f6c63430008040033";
const isSuperArgs = (xs) => xs.length > 1;
class Bytecode__factory extends ethers_1.ContractFactory {
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
exports.Bytecode__factory = Bytecode__factory;
Bytecode__factory.bytecode = _bytecode;
Bytecode__factory.abi = _abi;
//# sourceMappingURL=Bytecode__factory.js.map