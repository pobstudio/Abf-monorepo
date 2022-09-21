"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSTORE2Map__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "WriteError",
        type: "error",
    },
];
const _bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122075d7d571ef43eaff052713d8f26a025e2f32a625c7a641246c8959999f609b9564736f6c63430008040033";
const isSuperArgs = (xs) => xs.length > 1;
class SSTORE2Map__factory extends ethers_1.ContractFactory {
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
exports.SSTORE2Map__factory = SSTORE2Map__factory;
SSTORE2Map__factory.bytecode = _bytecode;
SSTORE2Map__factory.abi = _abi;
//# sourceMappingURL=SSTORE2Map__factory.js.map