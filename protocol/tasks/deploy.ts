import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { BrainFuck, BrainFuckFactory } from '../typechain-types';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

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

  // const SvgUtils = await hre.ethers.getContractFactory('SvgUtils');
  // const svgUtils = (await SvgUtils.deploy()) as SvgUtils;
  // await svgUtils.deployed();

  // console.log('SvgUtils address deployed to:', svgUtils.address);

  const BrainFuck = await hre.ethers.getContractFactory('BrainFuck', {
    libraries: {
      BrainFuckURIConstructor:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
          .uriConstructor,
    },
  });
  const brainFuck = (await BrainFuck.deploy()) as BrainFuck;
  await brainFuck.deployed();

  console.log('BrainFuck address deployed to:', brainFuck.address);

  const BrainFuckFactory = await hre.ethers.getContractFactory(
    'BrainFuckFactory',
  );
  const brainFuckFactory = (await BrainFuckFactory.deploy(
    brainFuck.address,
  )) as BrainFuckFactory;
  await brainFuckFactory.deployed();

  console.log(
    'BrainFuckFactory address deployed to:',
    brainFuckFactory.address,
  );
});
