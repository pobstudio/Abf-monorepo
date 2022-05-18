import { ethers } from 'hardhat';
import { BigNumber, Signer } from 'ethers';
import {
  BrainFuckVM,
  BrainFuck,
  DebugRenderer,
  BrainFuckURIConstructor,
  BrainFuckFactory,
} from '../typechain-types';
import { expect } from 'chai';

const TOKEN_ID_ZERO = BigNumber.from(0);
const ZERO = BigNumber.from(0);
const ONE_TOKEN_IN_BASE_UNITS = ethers.utils.parseEther('1');
const ONE_MWEI = ethers.utils.parseUnits('1', 'mwei');
const ONE_GWEI = ethers.utils.parseUnits('1', 'gwei');

const GENERATOR_INDEX_STEP = 10000;
const GENERATOR_INDEX_ONE = GENERATOR_INDEX_STEP * 1;
const GENERATOR_INDEX_TWO = GENERATOR_INDEX_STEP * 2;

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

const CODE = convertToHexStr(
  '>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.',
);

describe('BrainFuckFactory', function () {
  // constant values used in transfer tests
  let brainFuckVM: BrainFuckVM;
  let brainFuckURIConstructor: BrainFuckURIConstructor;
  let brainFuckFactory: BrainFuckFactory;

  let debugRenderer: DebugRenderer;
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
    const DebugRenderer = await ethers.getContractFactory('DebugRenderer');
    debugRenderer = (await DebugRenderer.deploy()) as DebugRenderer;
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

    const BrainFuckFactory = await ethers.getContractFactory(
      'BrainFuckFactory',
      {
        libraries: {
          BrainFuckURIConstructor: brainFuckURIConstructor.address,
        },
      },
    );
    brainFuckFactory = (await BrainFuckFactory.deploy()) as BrainFuckFactory;
    await brainFuckFactory.deployed();
  });

  describe('createNFT', () => {
    it('correctly creates a new BrainFuck contract', async () => {
      const config = {
        name: 'TEST',
        symbol: 'ABF',
        additionalMetadataURI: 'ipfs://test',
        seed: '0x01',
        constants: '0xaabbccddeeff0000',
        code: '0x02',
        renderer: debugRenderer.address,
        mintingSupply: BigNumber.from(100),
        price: ethers.utils.parseEther('0.1'),
      };
      await brainFuckFactory.createNFT(config);
      expect(await brainFuckFactory.projectIdIndex()).to.eq(BigNumber.from(1));
      const brainFuckAddress = await brainFuckFactory.projectIdToAddress(
        BigNumber.from(1),
      );
      expect(await brainFuckFactory.addressToProjectId(brainFuckAddress)).to.eq(
        BigNumber.from(1),
      );

      const BrainFuck = await ethers.getContractFactory('BrainFuck', {
        libraries: {
          BrainFuckURIConstructor: brainFuckURIConstructor.address,
        },
      });

      const brainFuck = (await BrainFuck.attach(brainFuckAddress)) as BrainFuck;
      await brainFuck.deployed();

      expect(await brainFuck.name()).to.eq(config.name);
      expect(await brainFuck.symbol()).to.eq(config.symbol);
      expect(await brainFuck.additionalMetadataURI()).to.eq(
        config.additionalMetadataURI,
      );
      expect(await brainFuck.seed()).to.eq(config.seed);
      expect(await brainFuck.code()).to.eq(config.code);
      expect(await brainFuck.renderer()).to.eq(config.renderer);
      expect(await brainFuck.mintingSupply()).to.eq(config.mintingSupply);
      expect(await brainFuck.price()).to.eq(config.price);
    });
  });
});
