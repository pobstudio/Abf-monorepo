import { ethers } from 'hardhat';
import { BigNumber, Signer } from 'ethers';
import { BrainFuckVM, BrainFuck, DebugBFR } from '../typechain-types';
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
    hexStr += c.charCodeAt(0).toString(16)
  }
  return hexStr
}

const convertHexStrToAscii = (hexStr: string) => {
  let asciiStr = '';
  for (let i = 2; i < hexStr.length; i += 2) {
    const byte = hexStr.slice(i, i + 2);
    asciiStr += String.fromCharCode(BigNumber.from('0x' + byte).toNumber());
  }
  return asciiStr 
}

describe('BrainFuck', function () {
  // constant values used in transfer tests
  let brainFuckVM: BrainFuckVM;
  let brainFuck: BrainFuck;
  let debugBFR: DebugBFR;
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
    const DebugBFR = await ethers.getContractFactory('DebugBFR');
    debugBFR = (await DebugBFR.deploy(
    )) as DebugBFR;
    await debugBFR.deployed();

    const BrainFuckVM = await ethers.getContractFactory('BrainFuckVM');
    brainFuckVM = (await BrainFuckVM.deploy(
    )) as BrainFuckVM;
    await brainFuckVM.deployed();

    const BrainFuck = await ethers.getContractFactory('BrainFuck');
    brainFuck = (await BrainFuck.deploy(
      'Absolute Brain FucK',
      'ABF',
      brainFuckVM.address,
    )) as BrainFuck;
    await brainFuck.deployed();
  });

  describe('createGenerator', () => {
    it('should create generator config correctly', async function () {
      const config = {
        name: "Test Generator",
        additionalMetadataURI: "ipfs://test",
        sourceChaos: '0xab',
        code: "0x00",
        renderer: debugBFR.address,
        mintingSupply: 10,
        price: ZERO
      }
      await brainFuck.createGenerator(await owner.getAddress(), config);
      const returnedConfig = await brainFuck.idToGeneratorConfig(GENERATOR_INDEX_ONE);
      const returnedOwner = await brainFuck.idToOwner(GENERATOR_INDEX_ONE);
      expect(returnedOwner).to.eq(await owner.getAddress());
      expect(returnedConfig.name).to.eq(config.name);
      expect(returnedConfig.additionalMetadataURI).to.eq(config.additionalMetadataURI);
      expect(returnedConfig.code).to.eq(config.code);
      expect(returnedConfig.renderer).to.eq(config.renderer);
      expect(returnedConfig.mintingSupply.toNumber()).to.eq(config.mintingSupply);
      expect(returnedConfig.price).to.eq(config.price);
      expect(returnedConfig.sourceChaos).to.eq(config.sourceChaos);

      const config2 = {
        name: "Test Generator 2",
        additionalMetadataURI: "ipfs://test",
        code: "0x00",
        sourceChaos: '0x01',
        renderer: debugBFR.address,
        mintingSupply: 10,
        price: ZERO
      }
      await brainFuck.createGenerator(await rando.getAddress(), config2);
      expect(await brainFuck.idToOwner(GENERATOR_INDEX_TWO)).to.eq(await rando.getAddress());
      expect((await brainFuck.idToGeneratorConfig(GENERATOR_INDEX_TWO)).name).to.eq(config2.name);
    });
    it('should not create generator if exceeds 10000 supply', async function () {
      const config = {
        name: "Test Generator",
        additionalMetadataURI: "ipfs://test",
        code: "0x00",
        sourceChaos: '0x00',
        renderer: debugBFR.address,
        mintingSupply: 10000,
        price: ZERO
      }
      await expect(
        brainFuck.createGenerator(await rando.getAddress(), config)
      ).to.revertedWith('Exceeds max minting mintingSupply');
    });
  });

  describe('tokenURI', () => {
    beforeEach(async () => {
      const config = {
        name: "Test Generator",
        additionalMetadataURI: "ipfs://test",
        code: convertToHexStr('>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.'),
        renderer: debugBFR.address,
        sourceChaos: '0x00',
        mintingSupply: 10,
        price: ZERO
      }
      await brainFuck.createGenerator(await owner.getAddress(), config);
      await brainFuck.mint(GENERATOR_INDEX_ONE, [await owner.getAddress()]);
    });

    it('should run correctly', async function () {
      const metadata = await brainFuck.tokenURI(BigNumber.from(GENERATOR_INDEX_ONE).add(1));
      const metadataJsonStr = Buffer.from(metadata.slice(29),'base64').toString('ascii');
      console.log('metadataJsonStr', metadataJsonStr)
      console.log(JSON.parse(metadataJsonStr));
    });
  });
});
