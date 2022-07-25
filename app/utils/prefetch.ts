import { BrainFuck__factory } from '@abf-monorepo/protocol';
import { BigNumber } from 'ethers';
import { PROVIDER } from '../clients/provider';
import {
  getTokenSeed,
  runBrainFuckCode,
  tokenSeedToInputTape,
} from './brainFuck';

const getCollectionSampleOutput = (
  brainfuckCode: string,
  constants: string,
  seed: string,
  sampleTokenId: number = 0,
) => {
  const tokenSeed =
    constants && seed
      ? getTokenSeed(seed, BigNumber.from(sampleTokenId), constants)
      : undefined;
  if (!brainfuckCode || !tokenSeed) {
    return undefined;
  }
  try {
    const output = runBrainFuckCode(
      brainfuckCode,
      tokenSeedToInputTape(tokenSeed),
    );
    return output;
  } catch (e: any) {
    return undefined;
  }
};

export const getPrefetchDataForCollection = async (address: string) => {
  const contract = BrainFuck__factory.connect(address, PROVIDER);

  if (!contract) {
    return undefined;
  }

  const name = await contract.name();
  const code = await contract.code();
  const renderer = await contract.renderer();
  const constants = await contract.constants();
  const seed = await contract.seed();

  return {
    address,
    name,
    code,
    renderer,
    constants,
    seed,
    output: getCollectionSampleOutput(code, constants, seed),
  };
};
