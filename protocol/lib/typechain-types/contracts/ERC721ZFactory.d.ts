import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../common";
export declare namespace ERC721Z {
    type InitConfigStruct = {
        name: PromiseOrValue<string>;
        symbol: PromiseOrValue<string>;
        seed: PromiseOrValue<BytesLike>;
        contractMetadataPropsPrefix: PromiseOrValue<BytesLike>;
        contractMetadataPropsSuffix: PromiseOrValue<BytesLike>;
        suffix: PromiseOrValue<BytesLike>;
        prefix: PromiseOrValue<BytesLike>;
        contractMetadataRenderer: PromiseOrValue<string>;
        metadataRenderer: PromiseOrValue<string>;
        adminMinter: PromiseOrValue<string>;
        mintingSupply: PromiseOrValue<BigNumberish>;
        royaltyFraction: PromiseOrValue<BigNumberish>;
        tokenDescriptionKey: PromiseOrValue<BytesLike>;
        allowRendererSwapping: PromiseOrValue<boolean>;
        tokenDescription: PromiseOrValue<BytesLike>;
    };
    type InitConfigStructOutput = [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        string,
        boolean,
        string
    ] & {
        name: string;
        symbol: string;
        seed: string;
        contractMetadataPropsPrefix: string;
        contractMetadataPropsSuffix: string;
        suffix: string;
        prefix: string;
        contractMetadataRenderer: string;
        metadataRenderer: string;
        adminMinter: string;
        mintingSupply: BigNumber;
        royaltyFraction: BigNumber;
        tokenDescriptionKey: string;
        allowRendererSwapping: boolean;
        tokenDescription: string;
    };
}
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
export interface ERC721ZFactoryInterface extends utils.Interface {
    functions: {
        "abfMinterImplementation()": FunctionFragment;
        "createNFT((string,string,bytes32,bytes,bytes,bytes,bytes,address,address,address,uint256,uint96,bytes32,bool,bytes),(uint256,uint96,address))": FunctionFragment;
        "erc721zImplementation()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "abfMinterImplementation" | "createNFT" | "erc721zImplementation"): FunctionFragment;
    encodeFunctionData(functionFragment: "abfMinterImplementation", values?: undefined): string;
    encodeFunctionData(functionFragment: "createNFT", values: [
        ERC721Z.InitConfigStruct,
        AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct
    ]): string;
    encodeFunctionData(functionFragment: "erc721zImplementation", values?: undefined): string;
    decodeFunctionResult(functionFragment: "abfMinterImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erc721zImplementation", data: BytesLike): Result;
    events: {
        "CreatedNFT(address,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CreatedNFT"): EventFragment;
}
export interface CreatedNFTEventObject {
    nft: string;
    minter: string;
    creator: string;
}
export declare type CreatedNFTEvent = TypedEvent<[
    string,
    string,
    string
], CreatedNFTEventObject>;
export declare type CreatedNFTEventFilter = TypedEventFilter<CreatedNFTEvent>;
export interface ERC721ZFactory extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ERC721ZFactoryInterface;
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
        abfMinterImplementation(overrides?: CallOverrides): Promise<[string]>;
        createNFT(config: ERC721Z.InitConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        erc721zImplementation(overrides?: CallOverrides): Promise<[string]>;
    };
    abfMinterImplementation(overrides?: CallOverrides): Promise<string>;
    createNFT(config: ERC721Z.InitConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    erc721zImplementation(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        abfMinterImplementation(overrides?: CallOverrides): Promise<string>;
        createNFT(config: ERC721Z.InitConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: CallOverrides): Promise<[string, string]>;
        erc721zImplementation(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "CreatedNFT(address,address,address)"(nft?: null, minter?: null, creator?: null): CreatedNFTEventFilter;
        CreatedNFT(nft?: null, minter?: null, creator?: null): CreatedNFTEventFilter;
    };
    estimateGas: {
        abfMinterImplementation(overrides?: CallOverrides): Promise<BigNumber>;
        createNFT(config: ERC721Z.InitConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        erc721zImplementation(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        abfMinterImplementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createNFT(config: ERC721Z.InitConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        erc721zImplementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ERC721ZFactory.d.ts.map