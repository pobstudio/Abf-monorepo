import { ethers } from 'hardhat';
import { BigNumber, Signer } from 'ethers';
import {
  BrainFuckVM,
  BrainFuck,
  DebugRenderer,
  BrainFuckURIConstructor,
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
      CODE,
      debugRenderer.address,
      MINTING_SUPPLY,
      PRICE,
    )) as BrainFuck;
    await brainFuck.deployed();
  });

  describe('parameters', () => {
    it('check parameters are valid', async function () {
      expect(await brainFuck.name()).to.eq(NAME);
      expect(await brainFuck.symbol()).to.eq(SYMBOL);
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

  describe('mint', () => {
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
    it('cannot mint if exceeds supply (v2)', async () => {
      await brainFuck.mint(await owner.getAddress(), 5, {
        value: PRICE.mul(5),
      });
      await expect(
        brainFuck.mint(await rando.getAddress(), 6, { value: PRICE.mul(6) }),
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
    it('cant mint more than 7 in a single call', async () => {
      await expect(
        brainFuck.mint(await rando.getAddress(), 7, { value: PRICE.mul(7) }),
      ).to.revertedWith('exceeded number of mint in single call');
    });
  });

  describe('tokenURI', () => {
    beforeEach(async () => {
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
});
