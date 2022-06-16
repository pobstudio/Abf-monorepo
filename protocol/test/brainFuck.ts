import { expect } from 'chai';
import { BigNumber, Signer } from 'ethers';
import { ethers } from 'hardhat';
import {
  BrainFuck,
  BrainFuckURIConstructor,
  BrainFuckVM,
  DebugRenderer,
} from '../typechain-types';

const TOKEN_ID_ZERO = BigNumber.from(0);
const ZERO = BigNumber.from(0);
const ONE_TOKEN_IN_BASE_UNITS = ethers.utils.parseEther('1');
const ONE_MWEI = ethers.utils.parseUnits('1', 'mwei');
const ONE_GWEI = ethers.utils.parseUnits('1', 'gwei');
const HUNDRED_PERCENT_BPS = 10000;

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
const CONSTANTS =
  '0xaabbccddeeff0000aabbccddeeff0000aabbccddeeff0000aabbccddeeff0000';
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
  let brainFuck: BrainFuck;
  let brainFuckURIConstructor: BrainFuckURIConstructor;

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

    const BrainFuck = await ethers.getContractFactory('BrainFuck', {
      libraries: {
        BrainFuckURIConstructor: brainFuckURIConstructor.address,
      },
    });

    brainFuck = (await BrainFuck.deploy(
      NAME,
      SYMBOL,
      TEST_URI,
      SEED,
      CONSTANTS,
      CODE,
      debugRenderer.address,
      MINTING_SUPPLY,
      PRICE,
      RENDERER_ROYALTY_FRACTION,
    )) as BrainFuck;
    await brainFuck.deployed();
  });

  describe('parameters', () => {
    it('check parameters are valid', async function () {
      expect(await brainFuck.name()).to.eq(NAME);
      expect(await brainFuck.symbol()).to.eq(SYMBOL);
      expect(await brainFuck.isActive()).to.eq(false);
      expect(await brainFuck.additionalMetadataURI()).to.eq(TEST_URI);
      expect(await brainFuck.seed()).to.eq(SEED);
      expect(await brainFuck.code()).to.eq(CODE);
      expect(await brainFuck.renderer()).to.eq(debugRenderer.address);
      expect(await brainFuck.mintingSupply()).to.eq(MINTING_SUPPLY);
      expect(await brainFuck.price()).to.eq(PRICE);
    });
  });

  describe('contractURI', () => {
    it('returns correct value', async () => {
      const contractURIOut = await brainFuck.contractURI();
      const contractJsonStr = Buffer.from(
        contractURIOut.slice(29),
        'base64',
      ).toString('ascii');
      const contractMetadata = JSON.parse(contractJsonStr);
      console.log(contractMetadata);
      expect(contractMetadata.name).to.eq('Absolute Brain Fuck');
      expect(contractMetadata.description).to.eq(
        'On-chain generative art written in the esoteric programming language BrainFuck.',
      );
      expect(contractMetadata.external_link).to.eq(
        `https://abf.dev/project/${brainFuck.address.toLowerCase()}`,
      );
    });
  });

  describe('supportsInterface', () => {
    it('supports ERC2981', async () => {
      expect(await brainFuck.supportsInterface('0x2a55205a')).to.eq(true);
    });
    it('supports ERC721', async () => {
      expect(await brainFuck.supportsInterface('0x80ac58cd')).to.eq(true);
    });
    it('supports ERC721Metadata', async () => {
      expect(await brainFuck.supportsInterface('0x5b5e139f')).to.eq(true);
    });
  });

  describe('setRoyalty', () => {
    it('owner can set royalty', async () => {
      await brainFuck.connect(owner).setIsActive(true);
      await brainFuck.mint(await owner.getAddress(), 1, {
        value: PRICE,
      });
      await brainFuck.connect(owner).setRoyalty(await rando.getAddress(), 1000);
      const royaltyData = await brainFuck.royaltyInfo(
        0,
        ethers.utils.parseEther('1'),
      );
      expect(royaltyData[0]).to.eq(await rando.getAddress());
      expect(royaltyData[1]).to.eq(ethers.utils.parseEther('0.1'));
    });
    it('cannot mint if exceeds supply (v1)', async () => {
      await expect(
        brainFuck.connect(rando).setRoyalty(await rando.getAddress(), 1000),
      ).to.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('setIsActive', () => {
    it('owner can set isActive', async () => {
      await brainFuck.connect(owner).setIsActive(true);
      expect(await brainFuck.isActive()).to.eq(true);
    });
    it('rando can not set isActive', async () => {
      await expect(brainFuck.connect(rando).setIsActive(true)).to.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('mint', () => {
    beforeEach(async () => {});
    it('correctly mints quantity for each address', async () => {
      await brainFuck
        .connect(owner)
        .airdropMint([await owner.getAddress(), await rando.getAddress()], 5);
      expect(await brainFuck.ownerOf(0)).to.eq(await owner.getAddress());
      expect(await brainFuck.ownerOf(4)).to.eq(await owner.getAddress());
      expect(await brainFuck.ownerOf(5)).to.eq(await rando.getAddress());
      expect(await brainFuck.ownerOf(9)).to.eq(await rando.getAddress());
    });
    it('rando can not call airdropMint', async () => {
      await expect(
        brainFuck
          .connect(rando)
          .airdropMint([await owner.getAddress(), await rando.getAddress()], 5),
      ).to.revertedWith('Ownable: caller is not the owner');
    });
    it('airdropMint can not exceed total allotted supply', async () => {
      await expect(
        brainFuck
          .connect(owner)
          .airdropMint([await owner.getAddress(), await rando.getAddress()], 6),
      ).to.revertedWith('exceeded max supply');
    });
  });

  describe('mint', () => {
    let tippingBrainFuck: BrainFuck;

    const TIPPING_RENDERER_ROYALTY_FRACTION = 1000;

    beforeEach(async () => {
      const BrainFuck = await ethers.getContractFactory('BrainFuck', {
        libraries: {
          BrainFuckURIConstructor: brainFuckURIConstructor.address,
        },
      });

      tippingBrainFuck = (await BrainFuck.connect(rando).deploy(
        NAME,
        SYMBOL,
        TEST_URI,
        SEED,
        CONSTANTS,
        CODE,
        debugRenderer.address,
        MINTING_SUPPLY,
        PRICE,
        TIPPING_RENDERER_ROYALTY_FRACTION,
      )) as BrainFuck;
      await tippingBrainFuck.deployed();
      await tippingBrainFuck.connect(rando).setIsActive(true);

      await brainFuck.connect(owner).setIsActive(true);
    });
    it('correctly mints for given price', async () => {
      await brainFuck.mint(await owner.getAddress(), 5, {
        value: PRICE.mul(5),
      });
      await brainFuck.mint(await rando.getAddress(), 5, {
        value: PRICE.mul(5),
      });
      expect(await brainFuck.ownerOf(0)).to.eq(await owner.getAddress());
      expect(await brainFuck.ownerOf(4)).to.eq(await owner.getAddress());
      expect(await brainFuck.ownerOf(5)).to.eq(await rando.getAddress());
      expect(await brainFuck.ownerOf(9)).to.eq(await rando.getAddress());
    });
    it('cannot mint if not active', async () => {
      await brainFuck.connect(owner).setIsActive(false);
      await expect(
        brainFuck.mint(await rando.getAddress(), 1, { value: PRICE.mul(1) }),
      ).to.revertedWith('minting needs to be active to mint');
    });
    it('cannot mint if exceeds supply (v2)', async () => {
      await brainFuck.mint(await owner.getAddress(), 5, {
        value: PRICE.mul(5),
      });
      await expect(
        brainFuck.mint(await rando.getAddress(), 6, { value: PRICE.mul(6) }),
      ).to.revertedWith('exceeded max supply');
    });
    it('cannot mint if exceeds supply (v1)', async () => {
      await brainFuck.mint(await owner.getAddress(), 5, {
        value: PRICE.mul(5),
      });
      await brainFuck.mint(await rando.getAddress(), 5, {
        value: PRICE.mul(5),
      });
      await expect(
        brainFuck.mint(await rando.getAddress(), 1, { value: PRICE.mul(1) }),
      ).to.revertedWith('exceeded max supply');
    });
    it('correctly mints for given price', async () => {
      const beforeBalance = await owner.getBalance();
      await brainFuck
        .connect(rando)
        .mint(await rando.getAddress(), 4, { value: PRICE.mul(11) });
      await brainFuck
        .connect(rando)
        .mint(await rando.getAddress(), 6, { value: PRICE.mul(11) });
      const afterBalance = await owner.getBalance();
      expect(afterBalance.sub(beforeBalance)).to.eq(PRICE.mul(10));
    });
    it('correctly mints and routes tip to renderer owner', async () => {
      const beforeBalanceRendererOwner = await owner.getBalance();
      const beforeBalanceOwner = await rando.getBalance();
      await tippingBrainFuck
        .connect(receiver1)
        .mint(await rando.getAddress(), 4, { value: PRICE.mul(11) });
      const afterBalanceRendererOwner = await owner.getBalance();
      const afterBalanceOwner = await rando.getBalance();
      expect(afterBalanceOwner.sub(beforeBalanceOwner)).to.eq(
        PRICE.mul(4)
          .mul(HUNDRED_PERCENT_BPS - TIPPING_RENDERER_ROYALTY_FRACTION)
          .div(HUNDRED_PERCENT_BPS),
      );
      expect(afterBalanceRendererOwner.sub(beforeBalanceRendererOwner)).to.eq(
        PRICE.mul(4)
          .mul(TIPPING_RENDERER_ROYALTY_FRACTION)
          .div(HUNDRED_PERCENT_BPS),
      );
    });
    it('cant mint more than 7 in a single call', async () => {
      await expect(
        brainFuck.mint(await rando.getAddress(), 7, { value: PRICE.mul(7) }),
      ).to.revertedWith('exceeded number of mint in single call');
    });
  });

  describe('tokenURI', () => {
    beforeEach(async () => {
      await brainFuck.connect(owner).setIsActive(true);
      await brainFuck.mint(await owner.getAddress(), 1, { value: PRICE });
    });

    it('should run correctly', async function () {
      const tokenId = 0;
      const metadataDataURI = await brainFuck.tokenURI(tokenId);
      const metadataJsonStr = Buffer.from(
        metadataDataURI.slice(29),
        'base64',
      ).toString('ascii');
      const metadata = JSON.parse(metadataJsonStr);
      console.log('metadataJsonStr', metadataJsonStr);
      console.log(metadata);
      expect(metadata.name).to.eq(`${NAME} #${tokenId}`);
      expect(metadata.description).to.eq(
        `Generative art written in BrainFuck.`,
      );
      expect(metadata.image).to.eq('Hello, World!'); // running hello world brain fuck code
      expect(metadata.aspect_ratio).to.eq(1);
      const rendererAttribute = metadata.attributes.find(
        (a: any) => a.trait_type === 'Renderer',
      );
      expect(rendererAttribute?.value).to.eq(
        debugRenderer.address.toLowerCase(),
      );
      const dataLengthAttribute = metadata.attributes.find(
        (a: any) => a.trait_type === 'Data Length',
      );
      expect(dataLengthAttribute?.value).to.eq(13);
    });
  });

  describe('seed', () => {
    beforeEach(async () => {
      const BrainFuck = await ethers.getContractFactory('BrainFuck', {
        libraries: {
          BrainFuckURIConstructor: brainFuckURIConstructor.address,
        },
      });

      brainFuck = (await BrainFuck.deploy(
        NAME,
        SYMBOL,
        TEST_URI,
        '0x',
        CONSTANTS,
        CODE,
        debugRenderer.address,
        MINTING_SUPPLY,
        PRICE,
        RENDERER_ROYALTY_FRACTION,
      )) as BrainFuck;
      await brainFuck.deployed();
      await brainFuck.connect(owner).setIsActive(true);
    });
    it('if seed is still zero, tokenURI reverts as unrevealed.', async function () {
      await brainFuck.mint(await owner.getAddress(), 1, { value: PRICE });
      await expect(brainFuck.tokenURI(0)).to.revertedWith(
        'BrainFuck: Seed is not set yet',
      );
    });
    it('if seed is zero, allow seed to be set by owner later', async function () {
      await brainFuck.setSeed(SEED);
      expect(await brainFuck.seed()).to.eq(SEED);
    });
    it('cant setSeed after seed was set', async () => {
      await brainFuck.setSeed(SEED);
      await expect(brainFuck.setSeed(SEED)).to.revertedWith(
        'BrainFuck: Seed is already set',
      );
    });
    it('cant setSeed if rando', async () => {
      await expect(brainFuck.connect(rando).setSeed(SEED)).to.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('tokenSeed', () => {
    beforeEach(async () => {
      await brainFuck.connect(owner).setIsActive(true);
      await brainFuck.mint(await owner.getAddress(), 1, { value: PRICE });
    });

    it('should construct tokenSeed correctly', async function () {
      const BrainFuck = await ethers.getContractFactory('BrainFuck', {
        libraries: {
          BrainFuckURIConstructor: brainFuckURIConstructor.address,
        },
      });

      const brainFuck = (await BrainFuck.deploy(
        NAME,
        SYMBOL,
        TEST_URI,
        SEED,
        '0x68656c6c6f21212168656c6c6f21212168656c6c6f21212168656c6c6f212121',
        convertToHexStr('++++++++[>,.<-]'),
        debugRenderer.address,
        MINTING_SUPPLY,
        PRICE,
        RENDERER_ROYALTY_FRACTION,
      )) as BrainFuck;
      await brainFuck.deployed();

      await brainFuck.connect(owner).setIsActive(true);
      await brainFuck.mint(await owner.getAddress(), 1, { value: PRICE });

      const tokenId = 0;
      const metadataDataURI = await brainFuck.tokenURI(tokenId);
      const metadataJsonStr = Buffer.from(
        metadataDataURI.slice(29),
        'base64',
      ).toString('ascii');
      const metadata = JSON.parse(metadataJsonStr);
      console.log('metadata', metadata);
    });
  });
});
