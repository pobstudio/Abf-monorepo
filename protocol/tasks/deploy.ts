import { task } from 'hardhat/config';
import {
  BrainFuckFactory,
  BrainFuckURIConstructor,
  BrainFuckVM,
  DebugRenderer,
  DotMatrixRenderer,
  PathRenderer,
  PixelGrid16Renderer,
  PixelGrid24Renderer,
  RendererRegistry,
  SvgUtils,
} from '../typechain-types';

task('deploy', 'Deploys BrainFuck Contracts', async (args, hre) => {
  const owner = (await hre.ethers.getSigners())[0];

  await hre.run('compile');

  console.log(`deploying with ${await owner.getAddress()}`);

  const BrainFuckVM = await hre.ethers.getContractFactory('BrainFuckVM');
  const brainFuckVM = (await BrainFuckVM.deploy()) as BrainFuckVM;
  await brainFuckVM.deployed();

  console.log('BrainFuckVM address deployed to:', brainFuckVM.address);

  const BrainFuckURIConstructor = await hre.ethers.getContractFactory(
    'BrainFuckURIConstructor',
    {
      libraries: {
        BrainFuckVM: brainFuckVM.address,
      },
    },
  );
  const brainFuckURIConstructor =
    (await BrainFuckURIConstructor.deploy()) as BrainFuckURIConstructor;
  await brainFuckURIConstructor.deployed();

  console.log(
    'BrainFuckURIConstructor address deployed to:',
    brainFuckURIConstructor.address,
  );

  const SvgUtils = await hre.ethers.getContractFactory('SvgUtils');
  const svgUtils = (await SvgUtils.deploy()) as SvgUtils;
  await svgUtils.deployed();

  console.log('SvgUtils address deployed to:', svgUtils.address);

  const BrainFuckFactory = await hre.ethers.getContractFactory(
    'BrainFuckFactory',
    {
      libraries: {
        BrainFuckURIConstructor: brainFuckURIConstructor.address,
      },
    },
  );
  const brainFuckFactory =
    (await BrainFuckFactory.deploy()) as BrainFuckFactory;
  await brainFuckFactory.deployed();

  console.log(
    'BrainFuckFactory address deployed to:',
    brainFuckFactory.address,
  );

  const RendererRegistry = await hre.ethers.getContractFactory(
    'RendererRegistry',
    {},
  );
  const rendererRegistry =
    (await RendererRegistry.deploy()) as RendererRegistry;
  await rendererRegistry.deployed();

  console.log(
    'RendererRegistry address deployed to:',
    rendererRegistry.address,
  );

  const DebugRenderer = await hre.ethers.getContractFactory('DebugRenderer', {
    // libraries: {
    //   SvgUtils: svgUtils.address,
    // },
  });
  const debugRenderer = (await DebugRenderer.deploy()) as DebugRenderer;
  await debugRenderer.deployed();

  console.log('DebugRenderer address deployed to:', debugRenderer.address);

  const DotMatrixRenderer = await hre.ethers.getContractFactory(
    'DotMatrixRenderer',
    {
      libraries: {
        SvgUtils: svgUtils.address,
      },
    },
  );
  const dotMatrixRenderer =
    (await DotMatrixRenderer.deploy()) as DotMatrixRenderer;
  await dotMatrixRenderer.deployed();

  console.log(
    'DotMatrixRenderer address deployed to:',
    dotMatrixRenderer.address,
  );

  const PathRenderer = await hre.ethers.getContractFactory('PathRenderer', {});
  const pathRenderer = (await PathRenderer.deploy()) as PathRenderer;
  await pathRenderer.deployed();

  console.log('PathRenderer address deployed to:', pathRenderer.address);

  const PixelGrid16Renderer = await hre.ethers.getContractFactory(
    'PixelGrid16Renderer',
    {
      libraries: {
        SvgUtils: svgUtils.address,
      },
    },
  );
  const pixelGrid16Renderer =
    (await PixelGrid16Renderer.deploy()) as PixelGrid16Renderer;
  await pixelGrid16Renderer.deployed();

  console.log(
    'PixelGrid16Renderer address deployed to:',
    pixelGrid16Renderer.address,
  );

  const PixelGrid24Renderer = await hre.ethers.getContractFactory(
    'PixelGrid24Renderer',
    {
      libraries: {
        SvgUtils: svgUtils.address,
      },
    },
  );
  const pixelGrid24Renderer =
    (await PixelGrid24Renderer.deploy()) as PixelGrid24Renderer;
  await pixelGrid24Renderer.deployed();

  console.log(
    'PixelGrid24Renderer address deployed to:',
    pixelGrid24Renderer.address,
  );

  console.log('Registering renderers');
  await (await rendererRegistry.registerRenderer(debugRenderer.address)).wait();
  await (
    await rendererRegistry.registerRenderer(dotMatrixRenderer.address)
  ).wait();
  await (await rendererRegistry.registerRenderer(pathRenderer.address)).wait();
  await (
    await rendererRegistry.registerRenderer(pixelGrid16Renderer.address)
  ).wait();
  await (
    await rendererRegistry.registerRenderer(pixelGrid24Renderer.address)
  ).wait();
});
