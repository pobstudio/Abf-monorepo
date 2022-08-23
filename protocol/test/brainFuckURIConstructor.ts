import { expect } from 'chai';
import { BigNumber, Signer } from 'ethers';
import { ethers } from 'hardhat';
import {
  BrainFuckURIConstructor,
  BrainFuckVM,
  IdentityRenderer,
} from '../typechain-types';

const TOKEN_ID_ZERO = BigNumber.from(0);
const ZERO = BigNumber.from(0);
const ONE_TOKEN_IN_BASE_UNITS = ethers.utils.parseEther('1');
const ONE_MWEI = ethers.utils.parseUnits('1', 'mwei');
const ONE_GWEI = ethers.utils.parseUnits('1', 'gwei');

const convertToHexStr = (code: string) => {
  let hexStr = '0x';
  for (const c of code) {
    hexStr += c.charCodeAt(0).toString(16);
  }
  return hexStr;
};

const convertHexStrToAscii = (hexStr: string) => {
  let asciiStr = '';
  for (let i = 2; i < hexStr.length; i += 2) {
    const byte = hexStr.slice(i, i + 2);
    asciiStr += String.fromCharCode(BigNumber.from('0x' + byte).toNumber());
  }
  return asciiStr;
};

const NAME = 'Absolute Brain Fuck';
const SYMBOL = 'ABF';
const CONSTANTS = '0xaabbccddeeff0000';
const CODE = convertToHexStr(
  '>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.',
);
const TEST_URI = 'ipfs://test';
const SEED = '0xab';
const MINTING_SUPPLY = BigNumber.from(10);
const PRICE = ethers.utils.parseEther('0.01');
const RENDERER_ROYALTY_FRACTION = 0;

describe('BrainFuck', function () {
  // constant values used in transfer tests
  let brainFuckVM: BrainFuckVM;
  let brainFuckURIConstructor: BrainFuckURIConstructor;

  let debugRenderer: IdentityRenderer;
  let owner: Signer;
  let artist: Signer;
  let rando: Signer;
  let receiver1: Signer;
  let receiver2: Signer;

  before(async function () {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    artist = accounts[1];
    rando = accounts[2];
    receiver1 = accounts[3];
    receiver2 = accounts[4];
  });

  beforeEach(async function () {
    const IdentityRenderer = await ethers.getContractFactory(
      'IdentityRenderer',
    );
    debugRenderer = (await IdentityRenderer.deploy()) as IdentityRenderer;
    await debugRenderer.deployed();

    const BrainFuckVM = await ethers.getContractFactory('BrainFuckVM');
    brainFuckVM = (await BrainFuckVM.deploy()) as BrainFuckVM;
    await brainFuckVM.deployed();

    const BrainFuckURIConstructor = await ethers.getContractFactory(
      'BrainFuckURIConstructor',
      {
        libraries: {
          BrainFuckVM: brainFuckVM.address,
        },
      },
    );
    brainFuckURIConstructor =
      (await BrainFuckURIConstructor.deploy()) as BrainFuckURIConstructor;
    await brainFuckURIConstructor.deployed();
  });

  describe('tokenSeed', () => {
    it('should construct tokenSeed correctly', async function () {
      const inputConstants =
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
      const seed = '0xFF';
      const tokenId = 0;
      const tokenSeed = await brainFuckURIConstructor.tokenSeed(
        seed,
        tokenId,
        inputConstants,
      );
      expect(tokenSeed.startsWith(inputConstants));
      const randomBytes = ethers.utils.solidityKeccak256(
        ['bytes', 'uint256'],
        [seed, tokenId],
      );
      expect(randomBytes.slice(2)).to.eq(tokenSeed.slice(66));
    });
  });
});