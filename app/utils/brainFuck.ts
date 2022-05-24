import { BigNumber, BytesLike, utils } from 'ethers';

const TAPE_SIZE = 256;
const LOOPING_STACK_SIZE = 2056;

const SEED_CONSTANTS_TYPE_MASK =
  '0x0000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

export const getTokenSeed = (
  seed: BytesLike,
  tokenId: BigNumber,
  inputConstants: string,
) => {
  const hash = utils.solidityKeccak256(['bytes', 'uint256'], [seed, tokenId]);
  return `0x${inputConstants.slice(2).padEnd(16, '0')}${hash.slice(18)}`;
};

export const runBrainFuckCode = (code: string, input: number[]) => {
  let out = '';
  const tape = [...Array(TAPE_SIZE)].map((_) => 0);

  let readIndex = 0;
  let ptr = 0;
  let isLooping = false;
  let innerLoops = 0;
  let loopingStack = [...Array(LOOPING_STACK_SIZE)];
  let loopingStackIndex = 0;

  for (let i = 0; i < code.length; ++i) {
    const opcode = '0x' + code[i].charCodeAt(0).toString(16).toUpperCase();
    console.log(i, opcode);
    if (isLooping) {
      // [
      if (opcode === '0x5B') {
        innerLoops++;
      }
      // ]
      if (opcode === '0x5D') {
        if (innerLoops === 0) isLooping = false;
        else innerLoops--;
      }
    } else {
      // +
      if (opcode === '0x2B') {
        tape[ptr]++;
      }
      // -
      if (opcode === '0x2D') {
        tape[ptr]--;
      }
      // ,
      if (opcode === '0x2C') {
        tape[ptr] = readIndex < input.length ? input[readIndex] : 0;
        readIndex++;
      }
      // .
      if (opcode === '0x2E') {
        out += String.fromCharCode(tape[ptr]);
      }
      // >
      if (opcode === '0x3E') {
        ptr++;
      }
      // <
      if (opcode === '0x3C') {
        ptr--;
      }
      // [
      if (opcode === '0x5B') {
        if (tape[ptr] == 0x0) {
          isLooping = true;
        } else {
          loopingStack[loopingStackIndex] = i;
          loopingStackIndex++;
        }
      }
      // ]
      if (opcode === '0x5D') {
        if (tape[ptr] != 0x00) {
          i = loopingStack[loopingStackIndex - 1];
        } else {
          loopingStack[loopingStackIndex--] = 0;
        }
      }
    }
  }

  return out;
};
