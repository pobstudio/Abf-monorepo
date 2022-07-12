import { task } from 'hardhat/config';

task(
  'verify-contracts',
  'Verifies contracts on Etherscan',
  async (args, hre) => {
    const owner = (await hre.ethers.getSigners())[0];

    // await hre.run('verify:verify', {
    //   address: '0xE7C1E84eA85cabE031cb884229A32030D780CDA6',
    //   constructorArguments: [
    //     'TST',
    //     'T',
    //     '0x5224e84d916bcea637e8c4',
    //     '0xFF00000000000000000000000000000000000000000000000000000000000000',
    //     '0x2c5b2e2d5d2e',
    //     '0xD94ef232b562609a84f4c80455C077DAe3B19e93',
    //     4,
    //     '0x00',
    //     0,
    //     '0x0000000000000000000000000000000000000000',
    //   ],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].registries
    //       .renderer,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries.vm,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries
    //       .uriConstructor,
    //   constructorArguments: [],
    // });

    // await hre.run('verify:verify', {
    //   address:
    //     deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].libraries.svgUtils,
    //   constructorArguments: [],
    // });

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
  },
);
