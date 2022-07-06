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
      renderer: '0x32ce7999',
    },
    pob: {
      multisig: '0x28558Ba4343FeB2709ed7A9531B72402a7794D8D',
    },
  },
  5: {
    core: {
      factory: '0x63939e6F3043294753fACA9923BFcF1d404D5603',
    },
    renderers: {
      debug: '0x5B1b723F6619bf110E83FE315943F28560a0aC3A',
      dotMatrix: '0x8151eFeBd2D48DE96f06372d0C77D1EC67108128',
      // path: '0x8E397cf230763F7E29Ef0cE5a6e4e94F4cF08E5e',
      pixelGrid8: '0x74eB501872d7F3DB25B19f6Ef7c593e93AA4d026',
      pixelGrid16: '0x3815baCB6b0161aa4598A70616F55007EcD72A7D',
      pixelGrid24: '0xEE752f0eC43Ed6e138e43db5D7068d70ca980CE4',
      monoPixelGrid8: '0xAbAcd6137E088d0600760bb59bbd2F02C9dd022f',
      monoPixelGrid16: '0xD94ef232b562609a84f4c80455C077DAe3B19e93',
      monoPixelGrid24: '0x0CD410939F2cAbAEDC5b12aB4d072BA1F3E13095',
    },
    registries: {
      renderer: '0x9E150e10F0a866C99c66A6955DDf9568AC9309b5',
    },
    libraries: {
      vm: '0xA0FFF5ecFab911b8A000eE377A0C31c0052Adf5D',
      uriConstructor: '0x255f2a7712CC06944AEef4Ea78349C54C22ffe1f',
      svgUtils: '0x59a3148D164469FB872983fB7efe22D784a30651',
    },
    interfaceID: {
      renderer: '0x32ce7999',
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
