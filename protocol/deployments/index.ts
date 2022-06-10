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
      factory: '0x75A810958A04D82cDAFFcFa8e70026D1086Ea8C2',
    },
    renderers: {
      debug: '0x76cbD284668E16A9e5801DdB0237FfB8b215C7CB',
      dotMatrix: '0xE04d7b5D9E6634A0EF7894C80303E3740CEE5cb3',
      path: '0xA6BAaeE7efAA91F9Bae3Af5F0d13623D7f130F3B',
      pixelGrid8: '0x4d50D9E57faa76Ba0C9DE333fbfa048736991e6a',
      pixelGrid16: '0x17f52368fCae0550c0cA7F64C06B13b8e0fEc459',
      pixelGrid24: '0x2e95494A484a83E615E3540EC7C66364DD4A9867',
    },
    registries: {
      renderer: '0x3E62fFD8499a810f8CAE426640369F54eed55c16',
    },
    libraries: {
      vm: '0xD83Be186AE2021c5BBd9C1b22025aeDc4d90deba',
      uriConstructor: '0x3Dbc4D243Cd20ff99D640DEA8D5b361106F50bB5',
      svgUtils: '0x8C4F73B85B4B8fA3AAccE05a1Bf7f2820E3E7bdd',
    },
    interfaceID: {
      renderer: '0x100045ab',
    },
    pob: {
      multisig: '0x00',
    },
  },
};
