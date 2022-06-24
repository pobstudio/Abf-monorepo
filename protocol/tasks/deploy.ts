import { task } from 'hardhat/config';
import { SvgUtils } from '../typechain-types';

task('deploy', 'Deploys BrainFuck Contracts', async (args, hre) => {
  const owner = (await hre.ethers.getSigners())[0];

  await hre.run('compile');

  console.log(`deploying with ${await owner.getAddress()}`);

  // const BrainFuckVM = await hre.ethers.getContractFactory('BrainFuckVM');
  // const brainFuckVM = (await BrainFuckVM.deploy()) as BrainFuckVM;
  // await brainFuckVM.deployed();

  // console.log('BrainFuckVM address deployed to:', brainFuckVM.address);

  // const BrainFuckURIConstructor = await hre.ethers.getContractFactory(
  //   'BrainFuckURIConstructor',
  //   {
  //     libraries: {
  //       BrainFuckVM: brainFuckVM.address,
  //     },
  //   },
  // );
  // const brainFuckURIConstructor =
  //   (await BrainFuckURIConstructor.deploy()) as BrainFuckURIConstructor;
  // await brainFuckURIConstructor.deployed();

  // console.log(
  //   'BrainFuckURIConstructor address deployed to:',
  //   brainFuckURIConstructor.address,
  // );

  const SvgUtils = await hre.ethers.getContractFactory('SvgUtils');
  const svgUtils = (await SvgUtils.deploy()) as SvgUtils;
  await svgUtils.deployed();

  console.log('SvgUtils address deployed to:', svgUtils.address);

  // const BrainFuckFactory = await hre.ethers.getContractFactory(
  //   'BrainFuckFactory',
  //   {
  //     libraries: {
  //       BrainFuckURIConstructor: brainFuckURIConstructor.address,
  //     },
  //   },
  // );
  // const brainFuckFactory =
  //   (await BrainFuckFactory.deploy()) as BrainFuckFactory;
  // await brainFuckFactory.deployed();

  // console.log(
  //   'BrainFuckFactory address deployed to:',
  //   brainFuckFactory.address,
  // );
});
