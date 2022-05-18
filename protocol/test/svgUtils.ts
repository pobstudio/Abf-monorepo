import { ethers } from 'hardhat';
import { BigNumber, Signer } from 'ethers';
import {
  BrainFuckVM,
  BrainFuck,
  DebugRenderer,
  BrainFuckURIConstructor,
  SvgUtils,
} from '../typechain-types';
import { expect } from 'chai';

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

describe('SvgUtils', function () {
  let svgUtils: SvgUtils;

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
    const SvgUtils = await ethers.getContractFactory('SvgUtils');
    svgUtils = (await SvgUtils.deploy()) as SvgUtils;
    await svgUtils.deployed();
  });

  describe('padZeros', () => {
    it('correctly return values', async function () {
      expect(await svgUtils.padZeros('1', 4)).to.equal('0001');
      expect(await svgUtils.padZeros('11', 4)).to.equal('0011');
      expect(await svgUtils.padZeros('111', 4)).to.equal('0111');
      expect(await svgUtils.padZeros('1111', 4)).to.equal('1111');
      expect(await svgUtils.padZeros('11111', 4)).to.equal('11111');
    });
  });

  describe('wholeNumber', () => {
    it('correctly return values as decimal string', async function () {
      expect(await svgUtils.wholeNumber(0)).to.equal(0);
      expect(await svgUtils.wholeNumber(1)).to.equal(0);
      expect(await svgUtils.wholeNumber(11)).to.equal(0);
      expect(await svgUtils.wholeNumber(111)).to.equal(0);
      expect(await svgUtils.wholeNumber(1111)).to.equal(0);
      expect(await svgUtils.wholeNumber(11111)).to.equal(1);
      expect(await svgUtils.wholeNumber(111111)).to.equal(11);
    });
  });

  describe('decimals', () => {
    it('correctly return values as decimal string', async function () {
      expect(await svgUtils.decimals(0)).to.equal(0);
      expect(await svgUtils.decimals(1)).to.equal(1);
      expect(await svgUtils.decimals(11)).to.equal(11);
      expect(await svgUtils.decimals(111)).to.equal(111);
      expect(await svgUtils.decimals(1111)).to.equal(1111);
      expect(await svgUtils.decimals(11111)).to.equal(1111);
      expect(await svgUtils.decimals(111111)).to.equal(1111);
    });
  });

  describe('toDecimalString', () => {
    it('correctly return values as decimal string', async function () {
      expect(await svgUtils.toDecimalString(0)).to.equal('0');
      expect(await svgUtils.toDecimalString(1)).to.equal('0.0001');
      expect(await svgUtils.toDecimalString(11)).to.equal('0.0011');
      expect(await svgUtils.toDecimalString(111)).to.equal('0.0111');
      expect(await svgUtils.toDecimalString(1111)).to.equal('0.1111');
      expect(await svgUtils.toDecimalString(11111)).to.equal('1.1111');
      expect(await svgUtils.toDecimalString(111111)).to.equal('11.1111');
    });
  });

  describe('lerpWithDecimals', () => {
    it('correctly return values as decimal string', async function () {
      const ONE_UNIT = await svgUtils.ONE_UNIT();
      expect(await svgUtils.lerpWithDecimals(10, 110, '0x00')).to.equal(
        '100000',
      );
      expect(await svgUtils.lerpWithDecimals(10, 110, '0x01')).to.equal(
        '103906',
      );
      expect(await svgUtils.lerpWithDecimals(10, 110, '0x11')).to.equal(
        '166406',
      );
      expect(await svgUtils.lerpWithDecimals(10, 110, '0xFF')).to.equal(
        '1100000',
      );
    });
  });

  describe('toColorHexString', () => {
    it('correctly return value as color hex code from uint', async function () {
      expect(await svgUtils.toColorHexString('0xffffff')).to.equal('#ffffff');
      expect(await svgUtils.toColorHexString('0xab3dcd')).to.equal('#ab3dcd');
    });
  });
  describe('toColorHexStringByBytes', () => {
    it('correctly return value as color hex code from bytes', async function () {
      expect(
        await svgUtils.toColorHexStringByBytes('0xff', '0xff', '0xff'),
      ).to.equal('#ffffff');
      expect(
        await svgUtils.toColorHexStringByBytes('0xab', '0x3d', '0xcd'),
      ).to.equal('#ab3dcd');
    });
  });
});
