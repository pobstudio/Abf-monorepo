import { expect } from 'chai';
import { BigNumber, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { DebugRenderer } from '../typechain-types';

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
const CODE = convertToHexStr(
  '>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.',
);
const TEST_URI = 'ipfs://test';
const SEED = '0xab';
const MINTING_SUPPLY = BigNumber.from(10);
const PRICE = ethers.utils.parseEther('0.01');

describe('Renderer', function () {
  // constant values used in transfer tests

  let debugRenderer: DebugRenderer;
  let owner: Signer;
  let rando: Signer;

  before(async function () {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    rando = accounts[2];
  });

  beforeEach(async function () {
    const DebugRenderer = await ethers.getContractFactory('DebugRenderer');
    debugRenderer = (await DebugRenderer.deploy()) as DebugRenderer;
    await debugRenderer.deployed();
  });

  describe('introspection', () => {
    it('ERC165 standard check', async function () {
      expect(await debugRenderer.supportsInterface('0x32ce7999')).to.eq(true);
    });
  });
  describe('owner', () => {
    it('owner should be set to deployer', async function () {
      expect(await debugRenderer.owner()).to.eq(await owner.getAddress());
    });
  });
});
