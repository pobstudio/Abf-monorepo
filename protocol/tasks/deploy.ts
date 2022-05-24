import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import {
  PixelGridRenderer,
  PathRenderer,
  DotMatrixRenderer,
  DebugRenderer,
  RendererRegistry,
  BrainFuckFactory,
  BrainFuckURIConstructor,
  BrainFuckVM,
  SvgUtils,
} from '../typechain-types';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

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

  // const RendererRegistry = await hre.ethers.getContractFactory(
  //   'RendererRegistry',
  //   {},
  // );
  // const rendererRegistry =
  //   (await RendererRegistry.deploy()) as RendererRegistry;
  // await rendererRegistry.deployed();

  // console.log(
  //   'RendererRegistry address deployed to:',
  //   rendererRegistry.address,
  // );

  // const DebugRenderer = await hre.ethers.getContractFactory('DebugRenderer', {
  //   // libraries: {
  //   //   SvgUtils: svgUtils.address,
  //   // },
  // });
  // const debugRenderer = (await DebugRenderer.deploy()) as DebugRenderer;
  // await debugRenderer.deployed();

  // console.log('DebugRenderer address deployed to:', debugRenderer.address);

  // const DotMatrixRenderer = await hre.ethers.getContractFactory(
  //   'DotMatrixRenderer',
  //   {
  //     libraries: {
  //       SvgUtils: svgUtils.address,
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

  // const PixelGridRenderer = await hre.ethers.getContractFactory(
  //   'PixelGridRenderer',
  //   {
  //     libraries: {
  //       SvgUtils: svgUtils.address,
  //     },
  //   },
  // );
  // const pixelGridRenderer =
  //   (await PixelGridRenderer.deploy()) as PixelGridRenderer;
  // await pixelGridRenderer.deployed();

  // console.log(
  //   'PixelGridRenderer address deployed to:',
  //   pixelGridRenderer.address,
  // );

  console.log('Registering renderers');
  // await rendererRegistry.registerRenderer(debugRenderer.address);
  // await rendererRegistry.registerRenderer(dotMatrixRenderer.address);
  // await rendererRegistry.registerRenderer(pathRenderer.address);
  // await rendererRegistry.registerRenderer(pixelGridRenderer.address);
});
