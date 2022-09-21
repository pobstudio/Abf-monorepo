import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, TypedEvent, TypedEventFilter, TypedListener } from "../../common";
export interface AbsBrainFuckConstantsInterface extends utils.Interface {
    functions: {
        "ANIMATION_RENDER_TYPE()": FunctionFragment;
        "ATTRIBUTES_RENDER_TYPE()": FunctionFragment;
        "DEFAULT_CONTRACT_DESCRIPTION()": FunctionFragment;
        "DEFAULT_CONTRACT_IMAGE()": FunctionFragment;
        "IMAGE_RENDER_TYPE()": FunctionFragment;
        "METADATA_RENDER_TYPE()": FunctionFragment;
        "MIDDLEWARE_RENDER_TYPE()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ANIMATION_RENDER_TYPE" | "ATTRIBUTES_RENDER_TYPE" | "DEFAULT_CONTRACT_DESCRIPTION" | "DEFAULT_CONTRACT_IMAGE" | "IMAGE_RENDER_TYPE" | "METADATA_RENDER_TYPE" | "MIDDLEWARE_RENDER_TYPE"): FunctionFragment;
    encodeFunctionData(functionFragment: "ANIMATION_RENDER_TYPE", values?: undefined): string;
    encodeFunctionData(functionFragment: "ATTRIBUTES_RENDER_TYPE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_CONTRACT_DESCRIPTION", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_CONTRACT_IMAGE", values?: undefined): string;
    encodeFunctionData(functionFragment: "IMAGE_RENDER_TYPE", values?: undefined): string;
    encodeFunctionData(functionFragment: "METADATA_RENDER_TYPE", values?: undefined): string;
    encodeFunctionData(functionFragment: "MIDDLEWARE_RENDER_TYPE", values?: undefined): string;
    decodeFunctionResult(functionFragment: "ANIMATION_RENDER_TYPE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ATTRIBUTES_RENDER_TYPE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_CONTRACT_DESCRIPTION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_CONTRACT_IMAGE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "IMAGE_RENDER_TYPE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "METADATA_RENDER_TYPE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MIDDLEWARE_RENDER_TYPE", data: BytesLike): Result;
    events: {};
}
export interface AbsBrainFuckConstants extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AbsBrainFuckConstantsInterface;
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
        ANIMATION_RENDER_TYPE(overrides?: CallOverrides): Promise<[string]>;
        ATTRIBUTES_RENDER_TYPE(overrides?: CallOverrides): Promise<[string]>;
        DEFAULT_CONTRACT_DESCRIPTION(overrides?: CallOverrides): Promise<[string]>;
        DEFAULT_CONTRACT_IMAGE(overrides?: CallOverrides): Promise<[string]>;
        IMAGE_RENDER_TYPE(overrides?: CallOverrides): Promise<[string]>;
        METADATA_RENDER_TYPE(overrides?: CallOverrides): Promise<[string]>;
        MIDDLEWARE_RENDER_TYPE(overrides?: CallOverrides): Promise<[string]>;
    };
    ANIMATION_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
    ATTRIBUTES_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
    DEFAULT_CONTRACT_DESCRIPTION(overrides?: CallOverrides): Promise<string>;
    DEFAULT_CONTRACT_IMAGE(overrides?: CallOverrides): Promise<string>;
    IMAGE_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
    METADATA_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
    MIDDLEWARE_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        ANIMATION_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
        ATTRIBUTES_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
        DEFAULT_CONTRACT_DESCRIPTION(overrides?: CallOverrides): Promise<string>;
        DEFAULT_CONTRACT_IMAGE(overrides?: CallOverrides): Promise<string>;
        IMAGE_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
        METADATA_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
        MIDDLEWARE_RENDER_TYPE(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        ANIMATION_RENDER_TYPE(overrides?: CallOverrides): Promise<BigNumber>;
        ATTRIBUTES_RENDER_TYPE(overrides?: CallOverrides): Promise<BigNumber>;
        DEFAULT_CONTRACT_DESCRIPTION(overrides?: CallOverrides): Promise<BigNumber>;
        DEFAULT_CONTRACT_IMAGE(overrides?: CallOverrides): Promise<BigNumber>;
        IMAGE_RENDER_TYPE(overrides?: CallOverrides): Promise<BigNumber>;
        METADATA_RENDER_TYPE(overrides?: CallOverrides): Promise<BigNumber>;
        MIDDLEWARE_RENDER_TYPE(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ANIMATION_RENDER_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ATTRIBUTES_RENDER_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DEFAULT_CONTRACT_DESCRIPTION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DEFAULT_CONTRACT_IMAGE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        IMAGE_RENDER_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        METADATA_RENDER_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        MIDDLEWARE_RENDER_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=AbsBrainFuckConstants.d.ts.map