import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import {
  DebugRenderer,
  DotMatrixRenderer,
  MonoPixelGrid16Renderer,
  MonoPixelGrid24Renderer,
  MonoPixelGrid8Renderer,
  PixelGrid16Renderer,
  PixelGrid24Renderer,
  PixelGrid8Renderer,
  RendererRegistry,
} from '../typechain-types';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

task('deploy-renderers', 'Deploys Renderer Contracts', async (args, hre) => {
  const owner = (await hre.ethers.getSigners())[0];

  await hre.run('compile');

  console.log(`deploying with ${await owner.getAddress()}`);

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
        SvgUtils:
          deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
            .svgUtils,
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

  // const PathRenderer = await hre.ethers.getContractFactory('PathRenderer', {});
  // const pathRenderer = (await PathRenderer.deploy()) as PathRenderer;
  // await pathRenderer.deployed();

  // console.log('PathRenderer address deployed to:', pathRenderer.address);

  const PixelGrid8Renderer = await hre.ethers.getContractFactory(
    'PixelGrid8Renderer',
    {
      libraries: {
        SvgUtils:
          deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
            .svgUtils,
      },
    },
  );
  const pixelGrid8Renderer =
    (await PixelGrid8Renderer.deploy()) as PixelGrid8Renderer;
  await pixelGrid8Renderer.deployed();

  console.log(
    'PixelGrid8Renderer address deployed to:',
    pixelGrid8Renderer.address,
  );

  const PixelGrid16Renderer = await hre.ethers.getContractFactory(
    'PixelGrid16Renderer',
    {
      libraries: {
        SvgUtils:
          deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
            .svgUtils,
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
        SvgUtils:
          deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
            .svgUtils,
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

  const MonoPixelGrid8Renderer = await hre.ethers.getContractFactory(
    'MonoPixelGrid8Renderer',
    {
      libraries: {
        SvgUtils:
          deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
            .svgUtils,
      },
    },
  );
  const monoPixelGrid8Renderer =
    (await MonoPixelGrid8Renderer.deploy()) as MonoPixelGrid8Renderer;
  await monoPixelGrid8Renderer.deployed();

  console.log(
    'MonoPixelGrid8Renderer address deployed to:',
    monoPixelGrid8Renderer.address,
  );

  const MonoPixelGrid16Renderer = await hre.ethers.getContractFactory(
    'MonoPixelGrid16Renderer',
    {
      libraries: {
        SvgUtils:
          deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
            .svgUtils,
      },
    },
  );
  const monoPixelGrid16Renderer =
    (await MonoPixelGrid16Renderer.deploy()) as MonoPixelGrid16Renderer;
  await monoPixelGrid16Renderer.deployed();

  console.log(
    'MonoPixelGrid16Renderer address deployed to:',
    monoPixelGrid16Renderer.address,
  );

  const MonoPixelGrid24Renderer = await hre.ethers.getContractFactory(
    'MonoPixelGrid24Renderer',
    {
      libraries: {
        SvgUtils:
          deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
            .svgUtils,
      },
    },
  );
  const monoPixelGrid24Renderer =
    (await MonoPixelGrid24Renderer.deploy()) as MonoPixelGrid24Renderer;
  await monoPixelGrid24Renderer.deployed();

  console.log(
    'MonoPixelGrid24Renderer address deployed to:',
    monoPixelGrid24Renderer.address,
  );

  console.log('Registering renderers');
  await (await rendererRegistry.registerRenderer(debugRenderer.address)).wait();
  await (
    await rendererRegistry.registerRenderer(dotMatrixRenderer.address)
  ).wait();
  // await (await rendererRegistry.registerRenderer(pathRenderer.address)).wait();
  await (
    await rendererRegistry.registerRenderer(monoPixelGrid8Renderer.address)
  ).wait();
  await (
    await rendererRegistry.registerRenderer(monoPixelGrid16Renderer.address)
  ).wait();
  await (
    await rendererRegistry.registerRenderer(monoPixelGrid24Renderer.address)
  ).wait();
  await (
    await rendererRegistry.registerRenderer(pixelGrid8Renderer.address)
  ).wait();
  await (
    await rendererRegistry.registerRenderer(pixelGrid16Renderer.address)
  ).wait();
  await (
    await rendererRegistry.registerRenderer(pixelGrid24Renderer.address)
  ).wait();
});
