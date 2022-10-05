import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../common";
export declare namespace ERC721ZMinter {
    type InitConfigStruct = {
        price: PromiseOrValue<BigNumberish>;
        royaltyFraction: PromiseOrValue<BigNumberish>;
        whitelistToken: PromiseOrValue<string>;
        claimMerkleRoot: PromiseOrValue<BytesLike>;
        claimMerkleTreeURI: PromiseOrValue<string>;
    };
    type InitConfigStructOutput = [
        BigNumber,
        BigNumber,
        string,
        string,
        string
    ] & {
        price: BigNumber;
        royaltyFraction: BigNumber;
        whitelistToken: string;
        claimMerkleRoot: string;
        claimMerkleTreeURI: string;
    };
}
export interface ERC721ZMinterInterface extends utils.Interface {
    functions: {
        "MAX_MINTING_PER_ADDRESS()": FunctionFragment;
        "MAX_MINTING_PER_WHITELIST_TOKEN()": FunctionFragment;
        "claim(address,uint256,bytes32[])": FunctionFragment;
        "claimMerkleRoot()": FunctionFragment;
        "claimMerkleTreeURI()": FunctionFragment;
        "init(address,address,(uint256,uint96,address,bytes32,string))": FunctionFragment;
        "isActive()": FunctionFragment;
        "isInit()": FunctionFragment;
        "mint(address,uint256)": FunctionFragment;
        "mintCount(address)": FunctionFragment;
        "nft()": FunctionFragment;
        "owner()": FunctionFragment;
        "price()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "royaltyFraction()": FunctionFragment;
        "royaltyTreasury()": FunctionFragment;
        "setIsActive(bool)": FunctionFragment;
        "setRoyaltyTreasury(address)": FunctionFragment;
        "setWhitelistToken(address)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "whitelistToken()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "MAX_MINTING_PER_ADDRESS" | "MAX_MINTING_PER_WHITELIST_TOKEN" | "claim" | "claimMerkleRoot" | "claimMerkleTreeURI" | "init" | "isActive" | "isInit" | "mint" | "mintCount" | "nft" | "owner" | "price" | "renounceOwnership" | "royaltyFraction" | "royaltyTreasury" | "setIsActive" | "setRoyaltyTreasury" | "setWhitelistToken" | "transferOwnership" | "whitelistToken"): FunctionFragment;
    encodeFunctionData(functionFragment: "MAX_MINTING_PER_ADDRESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "MAX_MINTING_PER_WHITELIST_TOKEN", values?: undefined): string;
    encodeFunctionData(functionFragment: "claim", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>[]
    ]): string;
    encodeFunctionData(functionFragment: "claimMerkleRoot", values?: undefined): string;
    encodeFunctionData(functionFragment: "claimMerkleTreeURI", values?: undefined): string;
    encodeFunctionData(functionFragment: "init", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        ERC721ZMinter.InitConfigStruct
    ]): string;
    encodeFunctionData(functionFragment: "isActive", values?: undefined): string;
    encodeFunctionData(functionFragment: "isInit", values?: undefined): string;
    encodeFunctionData(functionFragment: "mint", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "mintCount", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nft", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "price", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "royaltyFraction", values?: undefined): string;
    encodeFunctionData(functionFragment: "royaltyTreasury", values?: undefined): string;
    encodeFunctionData(functionFragment: "setIsActive", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setRoyaltyTreasury", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setWhitelistToken", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "whitelistToken", values?: undefined): string;
    decodeFunctionResult(functionFragment: "MAX_MINTING_PER_ADDRESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "MAX_MINTING_PER_WHITELIST_TOKEN", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimMerkleRoot", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimMerkleTreeURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isActive", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isInit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nft", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "royaltyFraction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "royaltyTreasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setIsActive", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRoyaltyTreasury", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWhitelistToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
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
export interface ERC721ZMinter extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ERC721ZMinterInterface;
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
        MAX_MINTING_PER_ADDRESS(overrides?: CallOverrides): Promise<[BigNumber]>;
        MAX_MINTING_PER_WHITELIST_TOKEN(overrides?: CallOverrides): Promise<[BigNumber]>;
        claim(account: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, proof: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        claimMerkleRoot(overrides?: CallOverrides): Promise<[string]>;
        claimMerkleTreeURI(overrides?: CallOverrides): Promise<[string]>;
        init(owner: PromiseOrValue<string>, _nft: PromiseOrValue<string>, config: ERC721ZMinter.InitConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isActive(overrides?: CallOverrides): Promise<[boolean]>;
        isInit(overrides?: CallOverrides): Promise<[boolean]>;
        mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintCount(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        nft(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        price(overrides?: CallOverrides): Promise<[BigNumber]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        royaltyFraction(overrides?: CallOverrides): Promise<[BigNumber]>;
        royaltyTreasury(overrides?: CallOverrides): Promise<[string]>;
        setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setRoyaltyTreasury(_royaltyTreasury: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        whitelistToken(overrides?: CallOverrides): Promise<[string]>;
    };
    MAX_MINTING_PER_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;
    MAX_MINTING_PER_WHITELIST_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;
    claim(account: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, proof: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    claimMerkleRoot(overrides?: CallOverrides): Promise<string>;
    claimMerkleTreeURI(overrides?: CallOverrides): Promise<string>;
    init(owner: PromiseOrValue<string>, _nft: PromiseOrValue<string>, config: ERC721ZMinter.InitConfigStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isActive(overrides?: CallOverrides): Promise<boolean>;
    isInit(overrides?: CallOverrides): Promise<boolean>;
    mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintCount(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    nft(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    price(overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    royaltyFraction(overrides?: CallOverrides): Promise<BigNumber>;
    royaltyTreasury(overrides?: CallOverrides): Promise<string>;
    setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setRoyaltyTreasury(_royaltyTreasury: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    whitelistToken(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        MAX_MINTING_PER_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;
        MAX_MINTING_PER_WHITELIST_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;
        claim(account: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, proof: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<void>;
        claimMerkleRoot(overrides?: CallOverrides): Promise<string>;
        claimMerkleTreeURI(overrides?: CallOverrides): Promise<string>;
        init(owner: PromiseOrValue<string>, _nft: PromiseOrValue<string>, config: ERC721ZMinter.InitConfigStruct, overrides?: CallOverrides): Promise<void>;
        isActive(overrides?: CallOverrides): Promise<boolean>;
        isInit(overrides?: CallOverrides): Promise<boolean>;
        mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        mintCount(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nft(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        price(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        royaltyFraction(overrides?: CallOverrides): Promise<BigNumber>;
        royaltyTreasury(overrides?: CallOverrides): Promise<string>;
        setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setRoyaltyTreasury(_royaltyTreasury: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        whitelistToken(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "ChangedIsActive(bool)"(isActive?: null): ChangedIsActiveEventFilter;
        ChangedIsActive(isActive?: null): ChangedIsActiveEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        MAX_MINTING_PER_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;
        MAX_MINTING_PER_WHITELIST_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;
        claim(account: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, proof: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        claimMerkleRoot(overrides?: CallOverrides): Promise<BigNumber>;
        claimMerkleTreeURI(overrides?: CallOverrides): Promise<BigNumber>;
        init(owner: PromiseOrValue<string>, _nft: PromiseOrValue<string>, config: ERC721ZMinter.InitConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isActive(overrides?: CallOverrides): Promise<BigNumber>;
        isInit(overrides?: CallOverrides): Promise<BigNumber>;
        mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintCount(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nft(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        price(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        royaltyFraction(overrides?: CallOverrides): Promise<BigNumber>;
        royaltyTreasury(overrides?: CallOverrides): Promise<BigNumber>;
        setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setRoyaltyTreasury(_royaltyTreasury: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        whitelistToken(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        MAX_MINTING_PER_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        MAX_MINTING_PER_WHITELIST_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        claim(account: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, proof: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        claimMerkleRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        claimMerkleTreeURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        init(owner: PromiseOrValue<string>, _nft: PromiseOrValue<string>, config: ERC721ZMinter.InitConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isActive(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isInit(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(to: PromiseOrValue<string>, numMints: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintCount(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nft(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        price(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        royaltyFraction(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        royaltyTreasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setIsActive(_isActive: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setRoyaltyTreasury(_royaltyTreasury: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setWhitelistToken(_whitelistToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        whitelistToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ERC721ZMinter.d.ts.map