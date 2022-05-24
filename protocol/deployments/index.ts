import { Deployments } from './types';

export const deployments: Deployments = {
  1: {
    core: {
      factory: '0x6db3EAF299e7062BBCe62E199260a6e1C44F146D',
    },
    renderers: {},
    registries: {
      renderer: '',
    },
    libraries: {
      vm: '0x5ed8863740F4C5845EF33E6e2C505b48d09711Ae',
      uriConstructor: '0x5ed8863740F4C5845EF33E6e2C505b48d09711Ae',
      svgUtils: '0x445E3b9a05F81F8fFBa8c84c9D71AF840Ebd7c8C',
    },
    interfaceID: {
      renderer: '0x100045ab',
    },
    pob: {
      multisig: '0x28558Ba4343FeB2709ed7A9531B72402a7794D8D',
    },
  },
  5: {
    core: {
      factory: '0xe1a8244e7e330Ee57017FbcbDF3f401e31abB261',
    },
    renderers: {
      debug: '0x31732da9A5e498dAc53Df670db9aa9e7aeb2C3ec',
      dotMatrix: '0x5E94Da066F4C94dF80ff461FA3b58066f3f7d885',
      path: '0xE4B49D2b77dBbBeB65e0C5f49Af734D7E8803494',
      pixelGrid: '0xb883CD6348aEA68f9b050F0bA0CFd09E702304a0',
    },
    registries: {
      renderer: '0x8c8F8fCcC22d1A95B3278013bd6aFBab1Abb4cD6',
    },
    libraries: {
      vm: '0x2336cfDE94c30C88c193bB392726A747d471d3bC',
      uriConstructor: '0x29ca58d4a0857Ae3F0608a546cdE5f254A3F867a',
      svgUtils: '0x6E30508b6C0aB7B083A5346287838CB18Ce50F41',
    },
    interfaceID: {
      renderer: '0x100045ab',
    },
    pob: {
      multisig: '0x00',
    },
  },
};
