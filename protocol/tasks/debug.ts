import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { BrainFuck, BrainFuckURIConstructor } from '../typechain-types';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

task('debug', 'Debug task', async (args, hre) => {
  const owner = (await hre.ethers.getSigners())[0];

  const BrainFuckURIConstructor = await hre.ethers.getContractFactory(
    'BrainFuckURIConstructor',
    {
      libraries: {
        BrainFuckVM:
          deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries.vm,
      },
    },
  );
  const brainFuckURIConstructor = (await BrainFuckURIConstructor.attach(
    deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
      .uriConstructor,
  )) as BrainFuckURIConstructor;
  await brainFuckURIConstructor.deployed();

  const BrainFuck = await hre.ethers.getContractFactory('BrainFuck', {
    libraries: {
      BrainFuckURIConstructor:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
          .uriConstructor,
    },
  });
  const brainFuck = (await BrainFuck.attach(
    '0x2862aec293260037c502d218E4B7c16b165446D1',
  )) as BrainFuck;
  await brainFuck.deployed();

  console.log(await brainFuck.owner());
  // console.log(await brainFuck.tokenURI(0));
  console.log(await brainFuck.mintingSupply());
  console.log(await brainFuck.seed());
  console.log(await brainFuck.price());
  // await brainFuck.setIsActive(true);
  // await brainFuck.mint(await owner.getAddress(), 1, { value: await brainFuck.price() })
  console.log(await brainFuck.ownerOf(0));
  console.log(await brainFuck.tokenURI(0));
});
