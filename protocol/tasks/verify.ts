import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

task(
  'verify-contracts',
  'Verifies contracts on Etherscan',
  async (args, hre) => {
    const owner = (await hre.ethers.getSigners())[0];

    // await hre.run("verify:verify", {
    //   address: deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].core.factory,
    //   constructorArguments: [
    //   ],
    // });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].registries
          .renderer,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries.vm,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
          .uriConstructor,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries.svgUtils,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers.debug,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
          .dotMatrix,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
          .pixelGrid8,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
          .pixelGrid16,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
          .pixelGrid24,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
          .monoPixelGrid8,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
          .monoPixelGrid16,
      constructorArguments: [],
    });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
          .monoPixelGrid24,
      constructorArguments: [],
    });
  },
);
