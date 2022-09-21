import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../../common";
export interface ABFVMInterface extends utils.Interface {
    functions: {
        "run(bytes,bytes)": FunctionFragment;
        "tokenSeed(bytes,uint256,bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "run" | "tokenSeed"): FunctionFragment;
    encodeFunctionData(functionFragment: "run", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "tokenSeed", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    decodeFunctionResult(functionFragment: "run", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenSeed", data: BytesLike): Result;
    events: {};
}
export interface ABFVM extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ABFVMInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        run(code: PromiseOrValue<BytesLike>, input: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string] & {
            out: string;
        }>;
        tokenSeed(seed: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, constants: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    run(code: PromiseOrValue<BytesLike>, input: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    tokenSeed(seed: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, constants: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        run(code: PromiseOrValue<BytesLike>, input: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        tokenSeed(seed: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, constants: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        run(code: PromiseOrValue<BytesLike>, input: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenSeed(seed: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, constants: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        run(code: PromiseOrValue<BytesLike>, input: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenSeed(seed: PromiseOrValue<BytesLike>, tokenId: PromiseOrValue<BigNumberish>, constants: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ABFVM.d.ts.map