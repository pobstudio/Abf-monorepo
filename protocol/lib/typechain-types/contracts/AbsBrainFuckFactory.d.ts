import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../common";
export declare namespace AbsBrainFuck {
    type CreateAbsBrainFuckConfigStruct = {
        name: PromiseOrValue<string>;
        symbol: PromiseOrValue<string>;
        seed: PromiseOrValue<BytesLike>;
        suffix: PromiseOrValue<BytesLike>;
        prefix: PromiseOrValue<BytesLike>;
        renderer: PromiseOrValue<string>;
        metadataRenderer: PromiseOrValue<string>;
        adminMinter: PromiseOrValue<string>;
        mintingSupply: PromiseOrValue<BigNumberish>;
        royaltyFraction: PromiseOrValue<BigNumberish>;
        tokenDescriptionKey: PromiseOrValue<BytesLike>;
        allowRendererSwapping: PromiseOrValue<boolean>;
        tokenDescription: PromiseOrValue<BytesLike>;
    };
    type CreateAbsBrainFuckConfigStructOutput = [
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
        suffix: string;
        prefix: string;
        renderer: string;
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
export interface AbsBrainFuckFactoryInterface extends utils.Interface {
    functions: {
        "abfImplementation()": FunctionFragment;
        "abfMinterImplementation()": FunctionFragment;
        "createNFT((string,string,bytes32,bytes,bytes,address,address,address,uint256,uint96,bytes32,bool,bytes),(uint256,uint96,address))": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "abfImplementation" | "abfMinterImplementation" | "createNFT"): FunctionFragment;
    encodeFunctionData(functionFragment: "abfImplementation", values?: undefined): string;
    encodeFunctionData(functionFragment: "abfMinterImplementation", values?: undefined): string;
    encodeFunctionData(functionFragment: "createNFT", values: [
        AbsBrainFuck.CreateAbsBrainFuckConfigStruct,
        AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct
    ]): string;
    decodeFunctionResult(functionFragment: "abfImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "abfMinterImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createNFT", data: BytesLike): Result;
    events: {
        "CreatedAbsBrainFuckNFT(address,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CreatedAbsBrainFuckNFT"): EventFragment;
}
export interface CreatedAbsBrainFuckNFTEventObject {
    nft: string;
    minter: string;
    creator: string;
}
export declare type CreatedAbsBrainFuckNFTEvent = TypedEvent<[
    string,
    string,
    string
], CreatedAbsBrainFuckNFTEventObject>;
export declare type CreatedAbsBrainFuckNFTEventFilter = TypedEventFilter<CreatedAbsBrainFuckNFTEvent>;
export interface AbsBrainFuckFactory extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AbsBrainFuckFactoryInterface;
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
        abfImplementation(overrides?: CallOverrides): Promise<[string]>;
        abfMinterImplementation(overrides?: CallOverrides): Promise<[string]>;
        createNFT(config: AbsBrainFuck.CreateAbsBrainFuckConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    abfImplementation(overrides?: CallOverrides): Promise<string>;
    abfMinterImplementation(overrides?: CallOverrides): Promise<string>;
    createNFT(config: AbsBrainFuck.CreateAbsBrainFuckConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        abfImplementation(overrides?: CallOverrides): Promise<string>;
        abfMinterImplementation(overrides?: CallOverrides): Promise<string>;
        createNFT(config: AbsBrainFuck.CreateAbsBrainFuckConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: CallOverrides): Promise<[string, string]>;
    };
    filters: {
        "CreatedAbsBrainFuckNFT(address,address,address)"(nft?: null, minter?: null, creator?: null): CreatedAbsBrainFuckNFTEventFilter;
        CreatedAbsBrainFuckNFT(nft?: null, minter?: null, creator?: null): CreatedAbsBrainFuckNFTEventFilter;
    };
    estimateGas: {
        abfImplementation(overrides?: CallOverrides): Promise<BigNumber>;
        abfMinterImplementation(overrides?: CallOverrides): Promise<BigNumber>;
        createNFT(config: AbsBrainFuck.CreateAbsBrainFuckConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        abfImplementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        abfMinterImplementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createNFT(config: AbsBrainFuck.CreateAbsBrainFuckConfigStruct, minterConfig: AbsBrainFuckMinter.CreateAbsBrainFuckMinterConfigStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=AbsBrainFuckFactory.d.ts.map