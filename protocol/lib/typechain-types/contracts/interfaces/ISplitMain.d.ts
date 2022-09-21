import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../../common";
export interface ISplitMainInterface extends utils.Interface {
    functions: {
        "acceptControl(address)": FunctionFragment;
        "cancelControlTransfer(address)": FunctionFragment;
        "createSplit(address[],uint32[],uint32,address)": FunctionFragment;
        "distributeERC20(address,address,address[],uint32[],uint32,address)": FunctionFragment;
        "distributeETH(address,address[],uint32[],uint32,address)": FunctionFragment;
        "makeSplitImmutable(address)": FunctionFragment;
        "predictImmutableSplitAddress(address[],uint32[],uint32)": FunctionFragment;
        "transferControl(address,address)": FunctionFragment;
        "updateAndDistributeERC20(address,address,address[],uint32[],uint32,address)": FunctionFragment;
        "updateAndDistributeETH(address,address[],uint32[],uint32,address)": FunctionFragment;
        "updateSplit(address,address[],uint32[],uint32)": FunctionFragment;
        "walletImplementation()": FunctionFragment;
        "withdraw(address,uint256,address[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "acceptControl" | "cancelControlTransfer" | "createSplit" | "distributeERC20" | "distributeETH" | "makeSplitImmutable" | "predictImmutableSplitAddress" | "transferControl" | "updateAndDistributeERC20" | "updateAndDistributeETH" | "updateSplit" | "walletImplementation" | "withdraw"): FunctionFragment;
    encodeFunctionData(functionFragment: "acceptControl", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "cancelControlTransfer", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "createSplit", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "distributeERC20", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "distributeETH", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "makeSplitImmutable", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "predictImmutableSplitAddress", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferControl", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "updateAndDistributeERC20", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "updateAndDistributeETH", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "updateSplit", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "walletImplementation", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdraw", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>[]
    ]): string;
    decodeFunctionResult(functionFragment: "acceptControl", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelControlTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createSplit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "distributeERC20", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "distributeETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeSplitImmutable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "predictImmutableSplitAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferControl", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAndDistributeERC20", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAndDistributeETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateSplit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "walletImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    events: {
        "CancelControlTransfer(address)": EventFragment;
        "ControlTransfer(address,address,address)": EventFragment;
        "CreateSplit(address)": EventFragment;
        "DistributeERC20(address,address,uint256,address)": EventFragment;
        "DistributeETH(address,uint256,address)": EventFragment;
        "InitiateControlTransfer(address,address)": EventFragment;
        "UpdateSplit(address)": EventFragment;
        "Withdrawal(address,uint256,address[],uint256[])": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CancelControlTransfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ControlTransfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CreateSplit"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DistributeERC20"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DistributeETH"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "InitiateControlTransfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateSplit"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}
export interface CancelControlTransferEventObject {
    split: string;
}
export declare type CancelControlTransferEvent = TypedEvent<[
    string
], CancelControlTransferEventObject>;
export declare type CancelControlTransferEventFilter = TypedEventFilter<CancelControlTransferEvent>;
export interface ControlTransferEventObject {
    split: string;
    previousController: string;
    newController: string;
}
export declare type ControlTransferEvent = TypedEvent<[
    string,
    string,
    string
], ControlTransferEventObject>;
export declare type ControlTransferEventFilter = TypedEventFilter<ControlTransferEvent>;
export interface CreateSplitEventObject {
    split: string;
}
export declare type CreateSplitEvent = TypedEvent<[string], CreateSplitEventObject>;
export declare type CreateSplitEventFilter = TypedEventFilter<CreateSplitEvent>;
export interface DistributeERC20EventObject {
    split: string;
    token: string;
    amount: BigNumber;
    distributorAddress: string;
}
export declare type DistributeERC20Event = TypedEvent<[
    string,
    string,
    BigNumber,
    string
], DistributeERC20EventObject>;
export declare type DistributeERC20EventFilter = TypedEventFilter<DistributeERC20Event>;
export interface DistributeETHEventObject {
    split: string;
    amount: BigNumber;
    distributorAddress: string;
}
export declare type DistributeETHEvent = TypedEvent<[
    string,
    BigNumber,
    string
], DistributeETHEventObject>;
export declare type DistributeETHEventFilter = TypedEventFilter<DistributeETHEvent>;
export interface InitiateControlTransferEventObject {
    split: string;
    newPotentialController: string;
}
export declare type InitiateControlTransferEvent = TypedEvent<[
    string,
    string
], InitiateControlTransferEventObject>;
export declare type InitiateControlTransferEventFilter = TypedEventFilter<InitiateControlTransferEvent>;
export interface UpdateSplitEventObject {
    split: string;
}
export declare type UpdateSplitEvent = TypedEvent<[string], UpdateSplitEventObject>;
export declare type UpdateSplitEventFilter = TypedEventFilter<UpdateSplitEvent>;
export interface WithdrawalEventObject {
    account: string;
    ethAmount: BigNumber;
    tokens: string[];
    tokenAmounts: BigNumber[];
}
export declare type WithdrawalEvent = TypedEvent<[
    string,
    BigNumber,
    string[],
    BigNumber[]
], WithdrawalEventObject>;
export declare type WithdrawalEventFilter = TypedEventFilter<WithdrawalEvent>;
export interface ISplitMain extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ISplitMainInterface;
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
        acceptControl(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        cancelControlTransfer(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        createSplit(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, controller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        distributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        distributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        makeSplitImmutable(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        predictImmutableSplitAddress(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        transferControl(split: PromiseOrValue<string>, newController: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateAndDistributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateAndDistributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateSplit(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        walletImplementation(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdraw(account: PromiseOrValue<string>, withdrawETH: PromiseOrValue<BigNumberish>, tokens: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    acceptControl(split: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    cancelControlTransfer(split: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    createSplit(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, controller: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    distributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    distributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    makeSplitImmutable(split: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    predictImmutableSplitAddress(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    transferControl(split: PromiseOrValue<string>, newController: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateAndDistributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateAndDistributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateSplit(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    walletImplementation(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdraw(account: PromiseOrValue<string>, withdrawETH: PromiseOrValue<BigNumberish>, tokens: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        acceptControl(split: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        cancelControlTransfer(split: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        createSplit(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, controller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        distributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        distributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        makeSplitImmutable(split: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        predictImmutableSplitAddress(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        transferControl(split: PromiseOrValue<string>, newController: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateAndDistributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateAndDistributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateSplit(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        walletImplementation(overrides?: CallOverrides): Promise<string>;
        withdraw(account: PromiseOrValue<string>, withdrawETH: PromiseOrValue<BigNumberish>, tokens: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "CancelControlTransfer(address)"(split?: PromiseOrValue<string> | null): CancelControlTransferEventFilter;
        CancelControlTransfer(split?: PromiseOrValue<string> | null): CancelControlTransferEventFilter;
        "ControlTransfer(address,address,address)"(split?: PromiseOrValue<string> | null, previousController?: PromiseOrValue<string> | null, newController?: PromiseOrValue<string> | null): ControlTransferEventFilter;
        ControlTransfer(split?: PromiseOrValue<string> | null, previousController?: PromiseOrValue<string> | null, newController?: PromiseOrValue<string> | null): ControlTransferEventFilter;
        "CreateSplit(address)"(split?: PromiseOrValue<string> | null): CreateSplitEventFilter;
        CreateSplit(split?: PromiseOrValue<string> | null): CreateSplitEventFilter;
        "DistributeERC20(address,address,uint256,address)"(split?: PromiseOrValue<string> | null, token?: PromiseOrValue<string> | null, amount?: null, distributorAddress?: PromiseOrValue<string> | null): DistributeERC20EventFilter;
        DistributeERC20(split?: PromiseOrValue<string> | null, token?: PromiseOrValue<string> | null, amount?: null, distributorAddress?: PromiseOrValue<string> | null): DistributeERC20EventFilter;
        "DistributeETH(address,uint256,address)"(split?: PromiseOrValue<string> | null, amount?: null, distributorAddress?: PromiseOrValue<string> | null): DistributeETHEventFilter;
        DistributeETH(split?: PromiseOrValue<string> | null, amount?: null, distributorAddress?: PromiseOrValue<string> | null): DistributeETHEventFilter;
        "InitiateControlTransfer(address,address)"(split?: PromiseOrValue<string> | null, newPotentialController?: PromiseOrValue<string> | null): InitiateControlTransferEventFilter;
        InitiateControlTransfer(split?: PromiseOrValue<string> | null, newPotentialController?: PromiseOrValue<string> | null): InitiateControlTransferEventFilter;
        "UpdateSplit(address)"(split?: PromiseOrValue<string> | null): UpdateSplitEventFilter;
        UpdateSplit(split?: PromiseOrValue<string> | null): UpdateSplitEventFilter;
        "Withdrawal(address,uint256,address[],uint256[])"(account?: PromiseOrValue<string> | null, ethAmount?: null, tokens?: null, tokenAmounts?: null): WithdrawalEventFilter;
        Withdrawal(account?: PromiseOrValue<string> | null, ethAmount?: null, tokens?: null, tokenAmounts?: null): WithdrawalEventFilter;
    };
    estimateGas: {
        acceptControl(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        cancelControlTransfer(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        createSplit(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, controller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        distributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        distributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        makeSplitImmutable(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        predictImmutableSplitAddress(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transferControl(split: PromiseOrValue<string>, newController: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateAndDistributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateAndDistributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateSplit(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        walletImplementation(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdraw(account: PromiseOrValue<string>, withdrawETH: PromiseOrValue<BigNumberish>, tokens: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        acceptControl(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        cancelControlTransfer(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        createSplit(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, controller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        distributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        distributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        makeSplitImmutable(split: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        predictImmutableSplitAddress(accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferControl(split: PromiseOrValue<string>, newController: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateAndDistributeERC20(split: PromiseOrValue<string>, token: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateAndDistributeETH(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, distributorAddress: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateSplit(split: PromiseOrValue<string>, accounts: PromiseOrValue<string>[], percentAllocations: PromiseOrValue<BigNumberish>[], distributorFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        walletImplementation(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdraw(account: PromiseOrValue<string>, withdrawETH: PromiseOrValue<BigNumberish>, tokens: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ISplitMain.d.ts.map