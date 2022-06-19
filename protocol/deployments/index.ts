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
      renderer: '0x7258682b',
    },
    pob: {
      multisig: '0x28558Ba4343FeB2709ed7A9531B72402a7794D8D',
    },
  },
  5: {
    core: {
      factory: '0x52f2B8F641cF9461b4A929faBFf4e7E612104EAf',
    },
    renderers: {
      debug: '0x50F30B303E99170FbFbd166d0d65faB27256Dc01',
      dotMatrix: '0x9Ed6FB352aEa5FF0d01cc1E5a156EEC8B6475b7d',
      path: '0xD79b9af989df5B1D4b1D7487296E06892DA8dEa6',
      pixelGrid8: '0x65cf0fc059457d3f8571474fa969fe21d829d530',
      pixelGrid16: '0x31faE4306c768CA3BcFF5b7b6b4d338d7FC97ADd',
      pixelGrid24: '0xe2C8a0EF257573d65ba599dBBb8130C94388566C',
      monoPixelGrid8: '0x75817EB037338FD3A78B2A4c46A833F3dee2748E',
      monoPixelGrid16: '0x1F45d83DD3907A37F90b42385E9b18774085495F',
      monoPixelGrid24: '0x9071044edcAFB1693b5E8b9734B7943F3AE9F6AA',
    },
    registries: {
      renderer: '0x33Af38068F1dD98c0175CA47a7d8A2c4ACe63910',
    },
    libraries: {
      vm: '0x8e275d199cA4469293c24bDED7a428E758b53886',
      uriConstructor: '0x345711cAA44207896453f3864b5C189B0FD33f59',
      svgUtils: '0x8C4F73B85B4B8fA3AAccE05a1Bf7f2820E3E7bdd',
    },
    interfaceID: {
      renderer: '0x7258682b',
    },
    pob: {
      multisig: '0x00',
    },
  },
};

export const RENDERER_LOCAL_IPFS_CID: { [renderer: string]: string } = {
  dotMatrix: 'bafkreibmk2xdb6dlacgfic6g2zsz6vjlep4j5klctflwopl62hqpxvn3ii',
  pixelGrid8: 'bafkreia3wfctuvolqks25cpbk4ddqcmtrogpmtkmr2vmmttepswnjymvza',
  monoPixelGrid8: 'bafkreifhpchsv7gjyllzmacwor7logavr5wvu2d66onq6sdjtuyrbg6ntq',
};
