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
      factory: '0x4a597DbD7a6C1DE06A9f3CDEA2946f8d1929c31A',
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
      vm: '0xE18a32192ED95b0FE9D70D19e5025f103475d7BA',
      uriConstructor: '0xaeb18fB50e9fb01c79e40fB4D3f3633c7339d2E0',
      svgUtils: '0x68FbfBEf1c3A69EC7F0B503D00F6Bf962F8B3aa4',
    },
    interfaceID: {
      renderer: '0x100045ab',
    },
    pob: {
      multisig: '0x00',
    },
  },
};
