import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import {
  ConfiguredGifImageRenderer,
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
  const rendererRegistry = (await RendererRegistry.attach(
    deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].registries.renderer,
  )) as RendererRegistry;
  await rendererRegistry.deployed();

  console.log(
    'RendererRegistry address deployed to:',
    rendererRegistry.address,
  );

  // const CompactMiddlewareRenderer = await hre.ethers.getContractFactory(
  //   'CompactMiddlewareRenderer',
  //   {
  //     libraries: {},
  //   },
  // );
  // const compactDataMiddlewareRenderer =
  //   (await CompactMiddlewareRenderer.deploy()) as CompactMiddlewareRenderer;
  // await compactDataMiddlewareRenderer.deployed();

  // console.log(
  //   'CompactMiddlewareRenderer address deployed to:',
  //   compactDataMiddlewareRenderer.address,
  // );

  // const LayerCompositeRenderer = await hre.ethers.getContractFactory(
  //   'LayerCompositeRenderer',
  //   {
  //     libraries: {},
  //   },
  // );
  // const layerCompositeRenderer =
  //   (await LayerCompositeRenderer.deploy()) as LayerCompositeRenderer;
  // await layerCompositeRenderer.deployed();

  // console.log(
  //   'LayerCompositeRenderer address deployed to:',
  //   layerCompositeRenderer.address,
  // );

  // const AlphaFilterRenderer = await hre.ethers.getContractFactory(
  //   'AlphaFilterRenderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const alphaFilterRenderer =
  //   (await AlphaFilterRenderer.deploy()) as AlphaFilterRenderer;
  // await alphaFilterRenderer.deployed();

  // console.log(
  //   'AlphaFilterRenderer address deployed to:',
  //   alphaFilterRenderer.address,
  // );

  // const BackgroundSvgRenderer = await hre.ethers.getContractFactory(
  //   'BackgroundSvgRenderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const backgroundSvgRenderer =
  //   (await BackgroundSvgRenderer.deploy()) as BackgroundSvgRenderer;
  // await backgroundSvgRenderer.deployed();

  // console.log(
  //   'BackgroundSvgRenderer address deployed to:',
  //   backgroundSvgRenderer.address,
  // );

  // const HSLPixelGrid8Renderer = await hre.ethers.getContractFactory(
  //   'HSLPixelGrid8Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const hsl8Renderer =
  //   (await HSLPixelGrid8Renderer.deploy()) as HSLPixelGrid8Renderer;
  // await hsl8Renderer.deployed();

  // console.log(
  //   'HSLPixelGrid8Renderer address deployed to:',
  //   hsl8Renderer.address,
  // );

  // const HSLPixelGrid16Renderer = await hre.ethers.getContractFactory(
  //   'HSLPixelGrid16Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const hsl16Renderer =
  //   (await HSLPixelGrid16Renderer.deploy()) as HSLPixelGrid16Renderer;
  // await hsl8Renderer.deployed();

  // console.log(
  //   'HSLPixelGrid16Renderer address deployed to:',
  //   hsl16Renderer.address,
  // );

  // const HSLPixelGrid24Renderer = await hre.ethers.getContractFactory(
  //   'HSLPixelGrid24Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const hsl24Renderer =
  //   (await HSLPixelGrid24Renderer.deploy()) as HSLPixelGrid24Renderer;
  // await hsl8Renderer.deployed();

  // console.log(
  //   'HSLPixelGrid24Renderer address deployed to:',
  //   hsl24Renderer.address,
  // );
  // const IdentityRenderer = await hre.ethers.getContractFactory(
  //   'IdentityRenderer',
  //   {
  //     // libraries: {
  //     //   SvgUtils: svgUtils.address,
  //     // },
  //   },
  // );
  // const identityRenderer =
  //   (await IdentityRenderer.deploy()) as IdentityRenderer;
  // await identityRenderer.deployed();

  // console.log(
  //   'IdentityRenderer address deployed to:',
  //   identityRenderer.address,
  // );

  // const DotMatrixRenderer = await hre.ethers.getContractFactory(
  //   'DotMatrixRenderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const dotMatrixRenderer =
  //   (await DotMatrixRenderer.deploy()) as DotMatrixRenderer;
  // await dotMatrixRenderer.deployed();

  // console.log(
  //   'DotMatrixRenderer address deployed to:',
  //   dotMatrixRenderer.address,
  // );

  // const PathRenderer = await hre.ethers.getContractFactory('PathRenderer', {});
  // const pathRenderer = (await PathRenderer.deploy()) as PathRenderer;
  // await pathRenderer.deployed();

  // console.log('PathRenderer address deployed to:', pathRenderer.address);

  // const PixelGrid8Renderer = await hre.ethers.getContractFactory(
  //   'PixelGrid8Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const pixelGrid8Renderer =
  //   (await PixelGrid8Renderer.deploy()) as PixelGrid8Renderer;
  // await pixelGrid8Renderer.deployed();

  // console.log(
  //   'PixelGrid8Renderer address deployed to:',
  //   pixelGrid8Renderer.address,
  // );

  // const PixelGrid16Renderer = await hre.ethers.getContractFactory(
  //   'PixelGrid16Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const pixelGrid16Renderer =
  //   (await PixelGrid16Renderer.deploy()) as PixelGrid16Renderer;
  // await pixelGrid16Renderer.deployed();

  // console.log(
  //   'PixelGrid16Renderer address deployed to:',
  //   pixelGrid16Renderer.address,
  // );

  // const PixelGrid24Renderer = await hre.ethers.getContractFactory(
  //   'PixelGrid24Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const pixelGrid24Renderer =
  //   (await PixelGrid24Renderer.deploy()) as PixelGrid24Renderer;
  // await pixelGrid24Renderer.deployed();

  // console.log(
  //   'PixelGrid24Renderer address deployed to:',
  //   pixelGrid24Renderer.address,
  // );

  // const MonoPixelGrid8Renderer = await hre.ethers.getContractFactory(
  //   'MonoPixelGrid8Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const monoPixelGrid8Renderer =
  //   (await MonoPixelGrid8Renderer.deploy()) as MonoPixelGrid8Renderer;
  // await monoPixelGrid8Renderer.deployed();

  // console.log(
  //   'MonoPixelGrid8Renderer address deployed to:',
  //   monoPixelGrid8Renderer.address,
  // );

  // const MonoPixelGrid16Renderer = await hre.ethers.getContractFactory(
  //   'MonoPixelGrid16Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const monoPixelGrid16Renderer =
  //   (await MonoPixelGrid16Renderer.deploy()) as MonoPixelGrid16Renderer;
  // await monoPixelGrid16Renderer.deployed();

  // console.log(
  //   'MonoPixelGrid16Renderer address deployed to:',
  //   monoPixelGrid16Renderer.address,
  // );

  // const MonoPixelGrid24Renderer = await hre.ethers.getContractFactory(
  //   'MonoPixelGrid24Renderer',
  //   {
  //     libraries: {
  //       SvgUtils:
  //         deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
  //           .svgUtils,
  //     },
  //   },
  // );
  // const monoPixelGrid24Renderer =
  //   (await MonoPixelGrid24Renderer.deploy()) as MonoPixelGrid24Renderer;
  // await monoPixelGrid24Renderer.deployed();

  // console.log(
  //   'MonoPixelGrid24Renderer address deployed to:',
  //   monoPixelGrid24Renderer.address,
  // );

  // const GifImageRenderer = await hre.ethers.getContractFactory(
  //   'GifImageRenderer',
  //   {
  //     libraries: {},
  //   },
  // );
  // const gifImageRenderer =
  //   (await GifImageRenderer.deploy()) as GifImageRenderer;
  // await gifImageRenderer.deployed();

  // console.log(
  //   'GifImageRenderer address deployed to:',
  //   gifImageRenderer.address,
  // );

  const ConfiguredGifImageRenderer = await hre.ethers.getContractFactory(
    'ConfiguredGifImageRenderer',
    {
      libraries: {},
    },
  );
  const configuredGifImageRenderer = (await ConfiguredGifImageRenderer.deploy(
    '0xaAabf4cE8EEB5F332b3d49e4914F38D55dc923c4',
  )) as ConfiguredGifImageRenderer;
  await configuredGifImageRenderer.deployed();
  // await configuredGifImageRenderer.addConfiguration({
  //   width: 4,
  //   height: 4,
  //   colors: '0x0000002C3333395B64A5C9CAE7F6F2',
  // });
  console.log(
    'ConfiguredGifImageRenderer address deployed to:',
    configuredGifImageRenderer.address,
  );

  console.log('Registering renderers');
  // await (
  //   await rendererRegistry.editRenderer('0xcFEB5e2157CaAbfdA75faFF764f51180a66F3409', compactDataMiddlewareRenderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(layerCompositeRenderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(compactDataMiddlewareRenderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(backgroundSvgRenderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(identityRenderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(dotMatrixRenderer.address)
  // ).wait();
  // await (await rendererRegistry.registerRenderer(pathRenderer.address)).wait();
  // await (
  //   await rendererRegistry.registerRenderer(monoPixelGrid8Renderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(monoPixelGrid16Renderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(monoPixelGrid24Renderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(pixelGrid8Renderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(pixelGrid16Renderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(pixelGrid24Renderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(gifImageRenderer.address)
  // ).wait();
  // await (
  //   await rendererRegistry.registerRenderer(configuredGifImageRenderer.address)
  // ).wait();
});
