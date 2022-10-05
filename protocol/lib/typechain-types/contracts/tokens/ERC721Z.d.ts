import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../../common";
export declare namespace ERC721Z {
    type InitConfigStruct = {
        name: PromiseOrValue<string>;
        symbol: PromiseOrValue<string>;
        seed: PromiseOrValue<BytesLike>;
        contractMetadataRenderer: PromiseOrValue<string>;
        metadataRenderer: PromiseOrValue<string>;
        allowRendererSwapping: PromiseOrValue<boolean>;
        adminMinter: PromiseOrValue<string>;
        mintingSupply: PromiseOrValue<BigNumberish>;
    };
    type InitConfigStructOutput = [
        string,
        string,
        string,
        string,
        string,
        boolean,
        string,
        BigNumber
    ] & {
        name: string;
        symbol: string;
        seed: string;
        contractMetadataRenderer: string;
        metadataRenderer: string;
        allowRendererSwapping: boolean;
        adminMinter: string;
        mintingSupply: BigNumber;
    };
}
export interface ERC721ZInterface extends utils.Interface {
    functions: {
        "CONTRACT_PROPS_PREFIX_KEY()": FunctionFragment;
        "CONTRACT_PROPS_SUFFIX_KEY()": FunctionFragment;
        "METADATA_PROPS_PREFIX_KEY()": FunctionFragment;
        "METADATA_PROPS_SUFFIX_KEY()": FunctionFragment;
        "adminMint(address,uint256)": FunctionFragment;
        "adminMinter()": FunctionFragment;
        "allowRendererSwapping()": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "contractMetadataRenderer()": FunctionFragment;
        "contractURI()": FunctionFragment;
        "currentIndex()": FunctionFragment;
        "customContractURI()": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "init(address,(string,string,bytes32,address,address,bool,address,uint256))": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "isInit()": FunctionFragment;
        "metadataRenderer()": FunctionFragment;
        "mintingSupply()": FunctionFragment;
        "name()": FunctionFragment;
        "owner()": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "royaltyInfo(uint256,uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256,bytes)": FunctionFragment;
        "seed()": FunctionFragment;
        "setAdminMinter(address)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "setContractMetadataRenderer(address)": FunctionFragment;
        "setMetadataRenderer(address)": FunctionFragment;
        "setRoyalty(address,uint96)": FunctionFragment;
        "setSeed(bytes32)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenDescriptionKey()": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "CONTRACT_PROPS_PREFIX_KEY" | "CONTRACT_PROPS_SUFFIX_KEY" | "METADATA_PROPS_PREFIX_KEY" | "METADATA_PROPS_SUFFIX_KEY" | "adminMint" | "adminMinter" | "allowRendererSwapping" | "approve" | "balanceOf" | "contractMetadataRenderer" | "contractURI" | "currentIndex" | "customContractURI" | "getApproved" | "init" | "isApprovedForAll" | "isInit" | "metadataRenderer" | "mintingSupply" | "name" | "owner" | "ownerOf" | "renounceOwnership" | "royaltyInfo" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "seed" | "setAdminMinter" | "setApprovalForAll" | "setContractMetadataRenderer" | "setMetadataRenderer" | "setRoyalty" | "setSeed" | "supportsInterface" | "symbol" | "tokenDescriptionKey" | "tokenURI" | "totalSupply" | "transferFrom" | "transferOwnership"): FunctionFragment;
    encodeFunctionData(functionFragment: "CONTRACT_PROPS_PREFIX_KEY", values?: undefined): string;
    encodeFunctionData(functionFragment: "CONTRACT_PROPS_SUFFIX_KEY", values?: undefined): string;
    encodeFunctionData(functionFragment: "METADATA_PROPS_PREFIX_KEY", values?: undefined): string;
    encodeFunctionData(functionFragment: "METADATA_PROPS_SUFFIX_KEY", values?: undefined): string;
    encodeFunctionData(functionFragment: "adminMint", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "adminMinter", values?: undefined): string;
    encodeFunctionData(functionFragment: "allowRendererSwapping", values?: undefined): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "contractMetadataRenderer", values?: undefined): string;
    encodeFunctionData(functionFragment: "contractURI", values?: undefined): string;
    encodeFunctionData(functionFragment: "currentIndex", values?: undefined): string;
    encodeFunctionData(functionFragment: "customContractURI", values?: undefined): string;
    encodeFunctionData(functionFragment: "getApproved", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "init", values: [PromiseOrValue<string>, ERC721Z.InitConfigStruct]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isInit", values?: undefined): string;
    encodeFunctionData(functionFragment: "metadataRenderer", values?: undefined): string;
    encodeFunctionData(functionFragment: "mintingSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "royaltyInfo", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "seed", values?: undefined): string;
    encodeFunctionData(functionFragment: "setAdminMinter", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setContractMetadataRenderer", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setMetadataRenderer", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setRoyalty", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setSeed", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenDescriptionKey", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "CONTRACT_PROPS_PREFIX_KEY", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "CONTRACT_PROPS_SUFFIX_KEY", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "METADATA_PROPS_PREFIX_KEY", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "METADATA_PROPS_SUFFIX_KEY", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "adminMint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "adminMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowRendererSwapping", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractMetadataRenderer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "currentIndex", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "customContractURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isInit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "metadataRenderer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintingSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "royaltyInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "seed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAdminMinter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setContractMetadataRenderer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMetadataRenderer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRoyalty", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSeed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenDescriptionKey", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "SetSeed(bytes32)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetSeed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
export interface ApprovalEventObject {
    owner: string;
    approved: string;
    tokenId: BigNumber;
}
export declare type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export interface ApprovalForAllEventObject {
    owner: string;
    operator: string;
    approved: boolean;
}
export declare type ApprovalForAllEvent = TypedEvent<[
    string,
    string,
    boolean
], ApprovalForAllEventObject>;
export declare type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface SetSeedEventObject {
    seed: string;
}
export declare type SetSeedEvent = TypedEvent<[string], SetSeedEventObject>;
export declare type SetSeedEventFilter = TypedEventFilter<SetSeedEvent>;
export interface TransferEventObject {
    from: string;
    to: string;
    tokenId: BigNumber;
}
export declare type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface ERC721Z extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ERC721ZInterface;
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
        CONTRACT_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<[string]>;
        CONTRACT_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<[string]>;
        METADATA_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<[string]>;
        METADATA_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<[string]>;
        adminMint(to: PromiseOrValue<string>, numToMint: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        adminMinter(overrides?: CallOverrides): Promise<[string]>;
        allowRendererSwapping(overrides?: CallOverrides): Promise<[boolean]>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        contractMetadataRenderer(overrides?: CallOverrides): Promise<[string]>;
        contractURI(overrides?: CallOverrides): Promise<[string]>;
        currentIndex(overrides?: CallOverrides): Promise<[BigNumber]>;
        customContractURI(overrides?: CallOverrides): Promise<[string]>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        init(owner: PromiseOrValue<string>, config: ERC721Z.InitConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isInit(overrides?: CallOverrides): Promise<[boolean]>;
        metadataRenderer(overrides?: CallOverrides): Promise<[string]>;
        mintingSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        name(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        royaltyInfo(_tokenId: PromiseOrValue<BigNumberish>, _salePrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, BigNumber]>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        seed(overrides?: CallOverrides): Promise<[string]>;
        setAdminMinter(_adminMinter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setContractMetadataRenderer(_contractMetadataRenderer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMetadataRenderer(_metadataRenderer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setRoyalty(newReceiver: PromiseOrValue<string>, newRoyaltyFraction: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSeed(_seed: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenDescriptionKey(overrides?: CallOverrides): Promise<[string]>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    CONTRACT_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<string>;
    CONTRACT_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<string>;
    METADATA_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<string>;
    METADATA_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<string>;
    adminMint(to: PromiseOrValue<string>, numToMint: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    adminMinter(overrides?: CallOverrides): Promise<string>;
    allowRendererSwapping(overrides?: CallOverrides): Promise<boolean>;
    approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    contractMetadataRenderer(overrides?: CallOverrides): Promise<string>;
    contractURI(overrides?: CallOverrides): Promise<string>;
    currentIndex(overrides?: CallOverrides): Promise<BigNumber>;
    customContractURI(overrides?: CallOverrides): Promise<string>;
    getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    init(owner: PromiseOrValue<string>, config: ERC721Z.InitConfigStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isInit(overrides?: CallOverrides): Promise<boolean>;
    metadataRenderer(overrides?: CallOverrides): Promise<string>;
    mintingSupply(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    royaltyInfo(_tokenId: PromiseOrValue<BigNumberish>, _salePrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, BigNumber]>;
    "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    seed(overrides?: CallOverrides): Promise<string>;
    setAdminMinter(_adminMinter: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setContractMetadataRenderer(_contractMetadataRenderer: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMetadataRenderer(_metadataRenderer: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setRoyalty(newReceiver: PromiseOrValue<string>, newRoyaltyFraction: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSeed(_seed: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenDescriptionKey(overrides?: CallOverrides): Promise<string>;
    tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        CONTRACT_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<string>;
        CONTRACT_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<string>;
        METADATA_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<string>;
        METADATA_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<string>;
        adminMint(to: PromiseOrValue<string>, numToMint: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        adminMinter(overrides?: CallOverrides): Promise<string>;
        allowRendererSwapping(overrides?: CallOverrides): Promise<boolean>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        contractMetadataRenderer(overrides?: CallOverrides): Promise<string>;
        contractURI(overrides?: CallOverrides): Promise<string>;
        currentIndex(overrides?: CallOverrides): Promise<BigNumber>;
        customContractURI(overrides?: CallOverrides): Promise<string>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        init(owner: PromiseOrValue<string>, config: ERC721Z.InitConfigStruct, overrides?: CallOverrides): Promise<void>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isInit(overrides?: CallOverrides): Promise<boolean>;
        metadataRenderer(overrides?: CallOverrides): Promise<string>;
        mintingSupply(overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        royaltyInfo(_tokenId: PromiseOrValue<BigNumberish>, _salePrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, BigNumber]>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        seed(overrides?: CallOverrides): Promise<string>;
        setAdminMinter(_adminMinter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setContractMetadataRenderer(_contractMetadataRenderer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setMetadataRenderer(_metadataRenderer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setRoyalty(newReceiver: PromiseOrValue<string>, newRoyaltyFraction: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setSeed(_seed: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenDescriptionKey(overrides?: CallOverrides): Promise<string>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        "SetSeed(bytes32)"(seed?: null): SetSeedEventFilter;
        SetSeed(seed?: null): SetSeedEventFilter;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
    };
    estimateGas: {
        CONTRACT_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<BigNumber>;
        CONTRACT_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<BigNumber>;
        METADATA_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<BigNumber>;
        METADATA_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<BigNumber>;
        adminMint(to: PromiseOrValue<string>, numToMint: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        adminMinter(overrides?: CallOverrides): Promise<BigNumber>;
        allowRendererSwapping(overrides?: CallOverrides): Promise<BigNumber>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        contractMetadataRenderer(overrides?: CallOverrides): Promise<BigNumber>;
        contractURI(overrides?: CallOverrides): Promise<BigNumber>;
        currentIndex(overrides?: CallOverrides): Promise<BigNumber>;
        customContractURI(overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        init(owner: PromiseOrValue<string>, config: ERC721Z.InitConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isInit(overrides?: CallOverrides): Promise<BigNumber>;
        metadataRenderer(overrides?: CallOverrides): Promise<BigNumber>;
        mintingSupply(overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        royaltyInfo(_tokenId: PromiseOrValue<BigNumberish>, _salePrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        seed(overrides?: CallOverrides): Promise<BigNumber>;
        setAdminMinter(_adminMinter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setContractMetadataRenderer(_contractMetadataRenderer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMetadataRenderer(_metadataRenderer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setRoyalty(newReceiver: PromiseOrValue<string>, newRoyaltyFraction: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSeed(_seed: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        tokenDescriptionKey(overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        CONTRACT_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        CONTRACT_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        METADATA_PROPS_PREFIX_KEY(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        METADATA_PROPS_SUFFIX_KEY(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        adminMint(to: PromiseOrValue<string>, numToMint: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        adminMinter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        allowRendererSwapping(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractMetadataRenderer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        currentIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        customContractURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        init(owner: PromiseOrValue<string>, config: ERC721Z.InitConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isInit(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        metadataRenderer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mintingSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        royaltyInfo(_tokenId: PromiseOrValue<BigNumberish>, _salePrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        seed(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setAdminMinter(_adminMinter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setContractMetadataRenderer(_contractMetadataRenderer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMetadataRenderer(_metadataRenderer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setRoyalty(newReceiver: PromiseOrValue<string>, newRoyaltyFraction: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSeed(_seed: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenDescriptionKey(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ERC721Z.d.ts.map