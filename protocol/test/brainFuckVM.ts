import { ethers } from 'hardhat';
import { BigNumber, Signer } from 'ethers';

import { BrainFuckVM } from '../typechain-types';
import { expect } from 'chai';
import { getAddress } from '@ethersproject/address';

const TOKEN_ID_ZERO = BigNumber.from(0);

const ONE_TOKEN_IN_BASE_UNITS = ethers.utils.parseEther('1');
const ONE_MWEI = ethers.utils.parseUnits('1', 'mwei');
const ONE_GWEI = ethers.utils.parseUnits('1', 'gwei');

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
    brainFuckVM = (await BrainFuckVM.deploy(
    )) as BrainFuckVM;
    await brainFuckVM.deployed();
  });

  describe('runBrainFuckCode', () => {
    it('should run correctly', async function () {
      const code = convertToHexStr('>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.');
      const input = '0xF3';

      console.log(code);

      const out = await brainFuckVM.runBrainFuckCode(code, input, 256);

      console.log(out, convertHexStrToAscii(out))
    });
  });
});
