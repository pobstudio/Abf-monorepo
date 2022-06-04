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
      factory: '0x7D43B6eC231b3310100643f80C7f060a4Cfbb01a',
    },
    renderers: {
      debug: '0x97b235246D96df453173c642B2e442d9F675947E',
      dotMatrix: '0x49C44cd6A9d998372472ce66540659E1680BF50e',
      path: '0xC33462Bf4c17d2239104D0617900Ac606a3e197c',
      pixelGrid16: '0x6d336181E672632Ef27Db957b5C2a3C611e7e56C',
      pixelGrid24: '0x8dfEd53aFEd3e57Cee3B5135F5fc3EE5100d3207',
    },
    registries: {
      renderer: '0xD056E4F9c2624f82A470427Ee754F355acf0feae',
    },
    libraries: {
      vm: '0xeaa088ebcD550B3C2C7fd1F996a9e3853CA0Dd1b',
      uriConstructor: '0x89Ceac7c868779719E269638f36020CE17829D79',
      svgUtils: '0xA1aFC0031396E53C73D78cd18CaE849088AB20ec',
    },
    interfaceID: {
      renderer: '0x100045ab',
    },
    pob: {
      multisig: '0x00',
    },
  },
};
