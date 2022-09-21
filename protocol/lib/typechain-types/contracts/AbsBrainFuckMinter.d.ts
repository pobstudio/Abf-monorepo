import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../common";
export declare namespace AbsBrainFuckMinter {
    type CreateAbsBrainFuckMinterConfigStruct = {
        price: PromiseOrValue<BigNumberish>;
        rendererRoyaltyFraction: PromiseOrValue<BigNumberish>;
        whitelistToken: PromiseOrValue<string>;
    };
    type CreateAbsBrainFuckMinterConfigStructOutput = [
        BigNumber,
        BigNumber,
        string
    ] & {
        price: BigNumber;
        rendererRoyaltyFraction: BigNumber;
        whitelistToken: string;
    };
}
export interface AbsBrainFuckMinterInterface extends utils.Interface {
    functions: {
        "MAX_MINTING_PER_TX()": FunctionFragment;
        "abf()": FunctionFragment;
        "donate()": FunctionFragment;
        "init(address,address,(uint256,uint96,address))": FunctionFragment;
        "isActive()": FunctionFragment;
        "isInit()": FunctionFragment;
        "mint(address,uint256)": FunctionFragment;
        "owner()": FunctionFragment;
        "price()": FunctionFragment;
        "rendererRoyaltyFraction()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "setIsActive(bool)": FunctionFragment;
        "setTreasury()": FunctionFragment;
        "setWhitelistToken(address)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "treasury()": FunctionFragment;
        "treasuryProps()": FunctionFragment;
        "whitelistToken()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "MAX_MINTING_PER_TX" | "abf" | "donate" | "init" | "isActive" | "isInit" | "mint" | "owner" | "price" | "rendererRoyaltyFraction" | "renounceOwnership" | "setIsActive" | "setTreasury" | "setWhitelistToken" | "transferOwnership" | "treasury" | "treasuryProps" | "whitelistToken"): FunctionFragment;
    encodeFunctionData(functionFragment: "MAX_MINTING_PER_TX", values?: undefined): string;
    encodeFunctionData(functionFragment: "abf", values?: undefined): string;
    encodeFunctionData(functionFragment: "donate", values?: undefined): string;
    encodeFunctionData(functionFragment: "init", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct
    ]): string;
    encodeFunctionData(functionFragment: "isActive", values?: undefined): string;
    encodeFunctionData(functionFragment: "isInit", values?: undefined): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "price", values?: undefined): string;
    encodeFunctionData(functionFragment: "rendererRoyaltyFraction", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setIsActive", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setTreasury", values?: undefined): string;
    encodeFunctionData(functionFragment: "setWhitelistToken", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
    encodeFunctionData(functionFragment: "treasuryProps", values?: undefined): string;
    encodeFunctionData(functionFragment: "whitelistToken", values?: undefined): string;
    decodeFunctionResult(functionFragment: "MAX_MINTING_PER_TX", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "abf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "donate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isActive", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isInit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rendererRoyaltyFraction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setIsActive", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTreasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWhitelistToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "treasuryProps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "whitelistToken", data: BytesLike): Result;
    events: {
        "ChangedIsActive(bool)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ChangedIsActive"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export interface ChangedIsActiveEventObject {
    isActive: boolean;
}
export declare type ChangedIsActiveEvent = TypedEvent<[
    boolean
], ChangedIsActiveEventObject>;
export declare type ChangedIsActiveEventFilter = TypedEventFilter<ChangedIsActiveEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface AbsBrainFuckMinter extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AbsBrainFuckMinterInterface;
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
        MAX_MINTING_PER_TX(overrides?: CallOverrides): Promise<[BigNumber]>;
        abf(overrides?: CallOverrides): Promise<[string]>;
        donate(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        init(owner: PromiseOrValue<string>, _abf: PromiseOrValue<string>, config: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isActive(overrides?: CallOverrides): Promise<[boolean]>;
        isInit(overrides?: CallOverrides): Promise<[boolean]>;
        mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        price(overrides?: CallOverrides): Promise<[BigNumber]>;
        rendererRoyaltyFraction(overrides?: CallOverrides): Promise<[BigNumber]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setTreasury(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        treasury(overrides?: CallOverrides): Promise<[string]>;
        treasuryProps(overrides?: CallOverrides): Promise<[string]>;
        whitelistToken(overrides?: CallOverrides): Promise<[string]>;
    };
    MAX_MINTING_PER_TX(overrides?: CallOverrides): Promise<BigNumber>;
    abf(overrides?: CallOverrides): Promise<string>;
    donate(overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    init(owner: PromiseOrValue<string>, _abf: PromiseOrValue<string>, config: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isActive(overrides?: CallOverrides): Promise<boolean>;
    isInit(overrides?: CallOverrides): Promise<boolean>;
    mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    price(overrides?: CallOverrides): Promise<BigNumber>;
    rendererRoyaltyFraction(overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setTreasury(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    treasury(overrides?: CallOverrides): Promise<string>;
    treasuryProps(overrides?: CallOverrides): Promise<string>;
    whitelistToken(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        MAX_MINTING_PER_TX(overrides?: CallOverrides): Promise<BigNumber>;
        abf(overrides?: CallOverrides): Promise<string>;
        donate(overrides?: CallOverrides): Promise<void>;
        init(owner: PromiseOrValue<string>, _abf: PromiseOrValue<string>, config: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: CallOverrides): Promise<void>;
        isActive(overrides?: CallOverrides): Promise<boolean>;
        isInit(overrides?: CallOverrides): Promise<boolean>;
        mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        owner(overrides?: CallOverrides): Promise<string>;
        price(overrides?: CallOverrides): Promise<BigNumber>;
        rendererRoyaltyFraction(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setTreasury(overrides?: CallOverrides): Promise<void>;
        setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        treasury(overrides?: CallOverrides): Promise<string>;
        treasuryProps(overrides?: CallOverrides): Promise<string>;
        whitelistToken(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "ChangedIsActive(bool)"(isActive?: null): ChangedIsActiveEventFilter;
        ChangedIsActive(isActive?: null): ChangedIsActiveEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        MAX_MINTING_PER_TX(overrides?: CallOverrides): Promise<BigNumber>;
        abf(overrides?: CallOverrides): Promise<BigNumber>;
        donate(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        init(owner: PromiseOrValue<string>, _abf: PromiseOrValue<string>, config: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isActive(overrides?: CallOverrides): Promise<BigNumber>;
        isInit(overrides?: CallOverrides): Promise<BigNumber>;
        mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        price(overrides?: CallOverrides): Promise<BigNumber>;
        rendererRoyaltyFraction(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setTreasury(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        treasury(overrides?: CallOverrides): Promise<BigNumber>;
        treasuryProps(overrides?: CallOverrides): Promise<BigNumber>;
        whitelistToken(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        MAX_MINTING_PER_TX(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        abf(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        donate(overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        init(owner: PromiseOrValue<string>, _abf: PromiseOrValue<string>, config: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isActive(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isInit(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        price(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rendererRoyaltyFraction(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setTreasury(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        treasuryProps(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        whitelistToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=AbsBrainFuckMinter.d.ts.map