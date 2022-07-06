import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { DebugRenderer, RendererRegistry } from '../typechain-types';

describe('RendererRegistry', function () {
  // constant values used in transfer tests
  let rendererRegistry: RendererRegistry;
  let debugRenderer1: DebugRenderer;
  let debugRenderer2: DebugRenderer;
  let owner: Signer;
  let rando: Signer;

  before(async function () {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    rando = accounts[2];
  });

  beforeEach(async function () {
    const DebugRenderer = await ethers.getContractFactory('DebugRenderer');
    debugRenderer1 = (await DebugRenderer.deploy()) as DebugRenderer;
    await debugRenderer1.deployed();
    debugRenderer2 = (await DebugRenderer.deploy()) as DebugRenderer;
    await debugRenderer2.deployed();
    const RendererRegistry = await ethers.getContractFactory(
      'RendererRegistry',
    );
    rendererRegistry = (await RendererRegistry.deploy()) as RendererRegistry;
    await rendererRegistry.deployed();
  });

  describe('Registry correctly registers new renderer', () => {
    it('Sequentially indexes', async function () {
      await rendererRegistry.registerRenderer(debugRenderer1.address);
      await rendererRegistry.registerRenderer(debugRenderer2.address);
      expect(await rendererRegistry.idToAddress(1)).to.eq(
        debugRenderer1.address,
      );
      expect(await rendererRegistry.addressToId(debugRenderer1.address)).to.eq(
        1,
      );
      expect(await rendererRegistry.idToAddress(2)).to.eq(
        debugRenderer2.address,
      );
      expect(await rendererRegistry.addressToId(debugRenderer2.address)).to.eq(
        2,
      );
    });
    it('Can not register same registry', async function () {
      await rendererRegistry.registerRenderer(debugRenderer1.address);
      await expect(
        rendererRegistry.registerRenderer(debugRenderer1.address),
      ).to.revertedWith('Already registered');
    });
  });
  describe('Registry correctly allows editing by owner', () => {
    it('Owner can edit registry index to new renderer', async function () {
      await rendererRegistry.registerRenderer(debugRenderer1.address);
      expect(await rendererRegistry.idToAddress(1)).to.eq(
        debugRenderer1.address,
      );
      expect(await rendererRegistry.addressToId(debugRenderer1.address)).to.eq(
        1,
      );
      await rendererRegistry.editRenderer(
        debugRenderer1.address,
        debugRenderer2.address,
      );
      expect(await rendererRegistry.idToAddress(1)).to.eq(
        debugRenderer2.address,
      );
      expect(await rendererRegistry.addressToId(debugRenderer2.address)).to.eq(
        1,
      );
    });
    it('Can not edit if new address already registered', async function () {
      await rendererRegistry.registerRenderer(debugRenderer1.address);
      await rendererRegistry.registerRenderer(debugRenderer2.address);

      await expect(
        rendererRegistry.editRenderer(
          debugRenderer1.address,
          debugRenderer2.address,
        ),
      ).to.revertedWith('New renderer already registered');
    });
    it('Can not edit if not owner of oldRegister', async function () {
      await rendererRegistry.registerRenderer(debugRenderer1.address);

      await expect(
        rendererRegistry
          .connect(rando)
          .editRenderer(debugRenderer1.address, debugRenderer2.address),
      ).to.revertedWith('Not owner of old renderer');
    });
  });
});
