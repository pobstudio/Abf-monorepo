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
    '0xA317112c3f3fF2D003Cc21243505a6F3C1113C9D',
  )) as BrainFuck;
  await brainFuck.deployed();

  console.log(await brainFuck.owner());
  try {
    console.log(await brainFuck.tokenURI(0));
  } catch {}

  console.log(await brainFuck.mintingSupply());
  console.log(await brainFuck.seed());
  console.log(await brainFuck.name());
  console.log(await brainFuck.symbol());
  console.log(await brainFuck.renderer());
  // await brainFuck.setIsActive(true);
  // await brainFuck.mint(await owner.getAddress(), 1, { value: await brainFuck.price() })
});
