import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from "../common";
export interface AbsBrainFuckURIConstructorInterface extends utils.Interface {
    functions: {
        "contractURI(string,address)": FunctionFragment;
        "decodeProps(bytes)": FunctionFragment;
        "tokenURI(uint256,bytes,bytes,bytes32,IRenderer,IRenderer)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "contractURI" | "decodeProps" | "tokenURI"): FunctionFragment;
    encodeFunctionData(functionFragment: "contractURI", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "decodeProps", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    decodeFunctionResult(functionFragment: "contractURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decodeProps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    events: {};
}
export interface AbsBrainFuckURIConstructor extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AbsBrainFuckURIConstructorInterface;
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
        contractURI(name: PromiseOrValue<string>, nft: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        decodeProps(props: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            string
        ] & {
            nft: string;
            tokenId: BigNumber;
            seed: string;
        }>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, propsPrefix: PromiseOrValue<BytesLike>, propsSuffix: PromiseOrValue<BytesLike>, seed: PromiseOrValue<BytesLike>, renderer: PromiseOrValue<string>, metadataRenderer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
    };
    contractURI(name: PromiseOrValue<string>, nft: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    decodeProps(props: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
        string,
        BigNumber,
        string
    ] & {
        nft: string;
        tokenId: BigNumber;
        seed: string;
    }>;
    tokenURI(tokenId: PromiseOrValue<BigNumberish>, propsPrefix: PromiseOrValue<BytesLike>, propsSuffix: PromiseOrValue<BytesLike>, seed: PromiseOrValue<BytesLike>, renderer: PromiseOrValue<string>, metadataRenderer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        contractURI(name: PromiseOrValue<string>, nft: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        decodeProps(props: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            string
        ] & {
            nft: string;
            tokenId: BigNumber;
            seed: string;
        }>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, propsPrefix: PromiseOrValue<BytesLike>, propsSuffix: PromiseOrValue<BytesLike>, seed: PromiseOrValue<BytesLike>, renderer: PromiseOrValue<string>, metadataRenderer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        contractURI(name: PromiseOrValue<string>, nft: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        decodeProps(props: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, propsPrefix: PromiseOrValue<BytesLike>, propsSuffix: PromiseOrValue<BytesLike>, seed: PromiseOrValue<BytesLike>, renderer: PromiseOrValue<string>, metadataRenderer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        contractURI(name: PromiseOrValue<string>, nft: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        decodeProps(props: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, propsPrefix: PromiseOrValue<BytesLike>, propsSuffix: PromiseOrValue<BytesLike>, seed: PromiseOrValue<BytesLike>, renderer: PromiseOrValue<string>, metadataRenderer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=AbsBrainFuckURIConstructor.d.ts.map