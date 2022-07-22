import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

task(
  'verify-contracts',
  'Verifies contracts on Etherscan',
  async (args, hre) => {
    const owner = (await hre.ethers.getSigners())[0];

    // await hre.run('verify:verify', {
    //   address: '0x2862aec293260037c502d218e4b7c16b165446d1',
    //   constructorArguments: [
    //     'TST',
    //     'T',
    //     '0x6accc03d0447003c5638c5',
    //     '0xFF00000000000000000000000000000000000000000000000000000000000000',
    //     '0x2c5b2e2d5d2e',
    //     '0xedA4D0a68751Dfb95f06419bB7482D694124B013',
    //     4,
    //     '0x00',
    //     0,
    //     '0x0000000000000000000000000000000000000000',
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
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].core.factory,
      constructorArguments: [],
    });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers.debug,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
    //       .dotMatrix,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
    //       .pixelGrid8,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
    //       .pixelGrid16,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
    //       .pixelGrid24,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
    //       .monoPixelGrid8,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
    //       .monoPixelGrid16,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
    //       .monoPixelGrid24,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
    //       .gifImage,
    //   constructorArguments: [],
    // });

    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers
          .configuredGifImage,
      constructorArguments: [
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].renderers.gifImage,
      ],
    });
  },
);
