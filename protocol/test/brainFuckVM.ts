import { expect } from 'chai';
import { BigNumber, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { BrainFuckVM } from '../typechain-types';

const TOKEN_ID_ZERO = BigNumber.from(0);

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
  const prunedHexStr = pruneHexStr(hexStr);
  let asciiStr = '';
  for (let i = 2; i < prunedHexStr.length; i += 2) {
    const byte = prunedHexStr.slice(i, i + 2);
    const asciiChar = String.fromCharCode(
      BigNumber.from('0x' + byte).toNumber(),
    );
    asciiStr += asciiChar;
  }
  return asciiStr;
};

const pruneHexStr = (hexStr: string) => {
  let prunedHexStr = '0x';
  for (let i = 2; i < hexStr.length; i += 2) {
    const byte = hexStr.slice(i, i + 2);
    if (byte === '00') {
      continue;
    }
    prunedHexStr += byte;
  }
  return prunedHexStr;
};

describe('BrainFuckVM', function () {
  // constant values used in transfer tests
  let brainFuckVM: BrainFuckVM;
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
    const BrainFuckVM = await ethers.getContractFactory('BrainFuckVM');
    brainFuckVM = (await BrainFuckVM.deploy()) as BrainFuckVM;
    await brainFuckVM.deployed();
  });

  describe('runBrainFuckCode', () => {
    it('Hello, World!', async function () {
      const code = convertToHexStr(
        '>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.',
      );
      const input = '0xF3';

      const out = await brainFuckVM.runBrainFuckCode(code, input);

      expect(convertHexStrToAscii(out)).to.eq('Hello, World!');
    });
    it('reverse string', async function () {
      const code = convertToHexStr('+[>,]<-[+.<-]');
      const input = '0x0123456789ABCDEF';

      const out = await brainFuckVM.runBrainFuckCode(code, input);

      expect(pruneHexStr(out)).to.eq('0xefcdab89674523');
    });
    it('666', async function () {
      const code = convertToHexStr('>+++++++++[<++++++>-]<...>++++++++++.');
      const input = '0x0123456789ABCDEF';
      const out = await brainFuckVM.runBrainFuckCode(code, input);
      const estimation = await brainFuckVM.estimateGas.runBrainFuckCode(
        code,
        input,
      );
      console.log('Gas used for call:', estimation.toNumber());
      expect(convertHexStrToAscii(out)).to.eq('666\n');
    });
    it('overflow', async function () {
      const code = convertToHexStr(',+.');
      const input = '0xFF';
      const out = await brainFuckVM.runBrainFuckCode(code, input);
      const estimation = await brainFuckVM.estimateGas.runBrainFuckCode(
        code,
        input,
      );
      console.log('Gas used for call:', estimation.toNumber());
      console.log(out);
      expect(out).to.eq('0x00');
    });
    it('underflow', async function () {
      const code = convertToHexStr(',-.');
      const input = '0x00';
      const out = await brainFuckVM.runBrainFuckCode(code, input);
      const estimation = await brainFuckVM.estimateGas.runBrainFuckCode(
        code,
        input,
      );
      console.log('Gas used for call:', estimation.toNumber());
      console.log(out);
      expect(out).to.eq('0xff');
    });
  });
});
