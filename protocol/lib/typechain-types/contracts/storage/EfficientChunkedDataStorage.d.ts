import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../../common";
export interface EfficientChunkedDataStorageInterface extends utils.Interface {
    functions: {
        "MAX_UINT_16()": FunctionFragment;
        "batchAddChunkedData(bytes[])": FunctionFragment;
        "chunkSize()": FunctionFragment;
        "currentMaxChunksIndex()": FunctionFragment;
        "dataSize()": FunctionFragment;
        "indexToData(uint256)": FunctionFragment;
        "owner()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "MAX_UINT_16" | "batchAddChunkedData" | "chunkSize" | "currentMaxChunksIndex" | "dataSize" | "indexToData" | "owner" | "renounceOwnership" | "supportsInterface" | "transferOwnership"): FunctionFragment;
    encodeFunctionData(functionFragment: "MAX_UINT_16", values?: undefined): string;
    encodeFunctionData(functionFragment: "batchAddChunkedData", values: [PromiseOrValue<BytesLike>[]]): string;
    encodeFunctionData(functionFragment: "chunkSize", values?: undefined): string;
    encodeFunctionData(functionFragment: "currentMaxChunksIndex", values?: undefined): string;
    encodeFunctionData(functionFragment: "dataSize", values?: undefined): string;
    encodeFunctionData(functionFragment: "indexToData", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "MAX_UINT_16", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchAddChunkedData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "chunkSize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "currentMaxChunksIndex", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "dataSize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "indexToData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface EfficientChunkedDataStorage extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: EfficientChunkedDataStorageInterface;
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
        MAX_UINT_16(overrides?: CallOverrides): Promise<[BigNumber]>;
        batchAddChunkedData(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        chunkSize(overrides?: CallOverrides): Promise<[BigNumber]>;
        currentMaxChunksIndex(overrides?: CallOverrides): Promise<[BigNumber]>;
        dataSize(overrides?: CallOverrides): Promise<[BigNumber]>;
        indexToData(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    MAX_UINT_16(overrides?: CallOverrides): Promise<BigNumber>;
    batchAddChunkedData(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    chunkSize(overrides?: CallOverrides): Promise<BigNumber>;
    currentMaxChunksIndex(overrides?: CallOverrides): Promise<BigNumber>;
    dataSize(overrides?: CallOverrides): Promise<BigNumber>;
    indexToData(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        MAX_UINT_16(overrides?: CallOverrides): Promise<BigNumber>;
        batchAddChunkedData(data: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<void>;
        chunkSize(overrides?: CallOverrides): Promise<BigNumber>;
        currentMaxChunksIndex(overrides?: CallOverrides): Promise<BigNumber>;
        dataSize(overrides?: CallOverrides): Promise<BigNumber>;
        indexToData(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        MAX_UINT_16(overrides?: CallOverrides): Promise<BigNumber>;
        batchAddChunkedData(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        chunkSize(overrides?: CallOverrides): Promise<BigNumber>;
        currentMaxChunksIndex(overrides?: CallOverrides): Promise<BigNumber>;
        dataSize(overrides?: CallOverrides): Promise<BigNumber>;
        indexToData(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        MAX_UINT_16(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        batchAddChunkedData(data: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        chunkSize(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        currentMaxChunksIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        dataSize(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        indexToData(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=EfficientChunkedDataStorage.d.ts.map