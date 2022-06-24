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
      factory: '0x9FB2167ACcaf576F16990D49AA665885218c5F51',
    },
    renderers: {
      debug: '0xC32f21aFc1317a17F9522e2DD3A7B21BeF6c8B54',
      dotMatrix: '0x0Cb0475C7CEb543f1292965b1CB4899410584189',
      // path: '0x8E397cf230763F7E29Ef0cE5a6e4e94F4cF08E5e',
      pixelGrid8: '0xdc4324dd4A4998aeED035bcb1339E1D1aB823B3E',
      pixelGrid16: '0xfd90057A326557520Ac40BF88ACf322617594c6B',
      pixelGrid24: '0xb26C0DD52E383cfF6eE0680b210Fe057C86BCD0E',
      monoPixelGrid8: '0x52aBcf54A83f968a0fAF9Df75CF956C9cEe189cD',
      monoPixelGrid16: '0xE658B09f9d9BAf240Ae06506d85190186FeA3932',
      monoPixelGrid24: '0x1eB73B76467C9F05B178d6cc1798a8FcCA3E83D1',
    },
    registries: {
      renderer: '0x75AdDdA954c14446303865D968961F10e3436B04',
    },
    libraries: {
      vm: '0xdE42371247e0BbCE02312E69D9De8cFAF17FaF6B',
      uriConstructor: '0xCE0b1438d0f5F67E7874e73C593FCd3d5324c538',
      svgUtils: '0x71C0bE0Db072f94954086b9B365BaC017c548549',
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
  debug: 'bafkreihr36qxterrstglrcflg256cgd3ki7akvqn633m3tmoubgpapjsnu',
  dotMatrix: 'bafkreicjep2quvpcieqfx7vunky7oez3ppfqq4r64atopzu4ptw3pdcq2u',
  // path: 'bafkreihiv6ghb32wnx65czsq6ufhiojreai5m35m5ouy445bzuepudinqa',
  pixelGrid8: 'bafkreiabzwvptb7vv6j73qemafui7eztiig3ywntifddepsu53tv63bqmu',
  pixelGrid16: 'bafkreiekrwsczhkr56szlzxi6e3mj5je62grye6nxlivmvin6pe3xiheby',
  pixelGrid24: 'bafkreifn7nfxbb5du4c7tyvbicqvh5t4kzlbbbe7flr3iswedlxdbd3qdq',
  monoPixelGrid8: 'bafkreigqow75ec5b7ei3majzwf3zvyv7o4won3pkyqy2bclfqjvdrcdkxe',
  monoPixelGrid16:
    'bafkreib7mkx3c7owpn5uwkqtviddhspu376t52u2wljh3o5gnz2kfmn7de',
  monoPixelGrid24:
    'bafkreibwqrjl52gn2n7tbtry4q5uogf2b6tpohfine3f3nu6ydtfqatqiq',
};
