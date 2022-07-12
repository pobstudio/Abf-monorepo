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
  4: {
    core: {
      factory: '0x4a597DbD7a6C1DE06A9f3CDEA2946f8d1929c31A',
    },
    renderers: {
      debug: '0xb883CD6348aEA68f9b050F0bA0CFd09E702304a0',
      dotMatrix: '0xb4DD948B5277f244a5e0FaF358DA191EDA7cA12b',
      pixelGrid8: '0x2E9fD819EB1CC6bB8812aB5ceec71461Dea05662',
      pixelGrid16: '0x3bFf11B683B94E8bD8f7e7F2775CbFEfc00807De',
      pixelGrid24: '0xc2Cad9f7cd0F19a0608fA8Db9AdBE1EDe9233e8d',
      monoPixelGrid8: '0x163F0b21EFE1400E089C662a181CE9eC716b4228',
      monoPixelGrid16: '0xedA4D0a68751Dfb95f06419bB7482D694124B013',
      monoPixelGrid24: '0x0525E64C8465afeb131BDD3aD092F23d8599cf35',
    },
    registries: {
      renderer: '0xE4B49D2b77dBbBeB65e0C5f49Af734D7E8803494',
    },
    libraries: {
      vm: '0xE18a32192ED95b0FE9D70D19e5025f103475d7BA',
      uriConstructor: '0xaeb18fB50e9fb01c79e40fB4D3f3633c7339d2E0',
      svgUtils: '0x68FbfBEf1c3A69EC7F0B503D00F6Bf962F8B3aa4',
    },
    interfaceID: {
      renderer: '0x32ce7999',
    },
    pob: {
      multisig: '0x00',
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
  debug: 'bafkreiaowcb6vqtrrpvgldihr6cbb4vlexrhhxocnyh2fel7q4fku7aruu',
  dotMatrix: 'bafkreihfszq76yxcmkux4xbvpx3pbdnrvo3aaporhfwft4xkvsno3ogzzq',
  // path: 'bafkreihiv6ghb32wnx65czsq6ufhiojreai5m35m5ouy445bzuepudinqa',
  pixelGrid8: 'bafkreiefwasohc2tghe5aug34hev6lqsubahng3vovaicrt3ljaykydcyu',
  pixelGrid16: 'bafkreifbr5qnfohid4qp3ar4drxes5yrx3c2z5ckfnx6am7erqe3pbvg6i',
  pixelGrid24: 'bafkreibcvbszypkoql6wrl7pzn6segwpkz5klw4nmap52q4lfyayaqybbi',
  monoPixelGrid8: 'bafkreiagbea4rsh5ytw5z2bm7s3nf23zsngt4iyhh4wh3b2hotdgm7xvym',
  monoPixelGrid16:
    'bafkreih3jlcbcofw4bq5x22luehji46bhvs7flqtkgs5nsdnfxwd2elxc4',
  monoPixelGrid24:
    'bafkreibu73vdkmxtgf3uqrhhuwt7l4nq7npcbga3x3ms32zwdxeurlibpq',
};
