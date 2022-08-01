import { task } from 'hardhat/config';
import {
  AlphaFilterRenderer,
  ConfiguredGifImageRenderer,
  GifImageRenderer,
  ImageTupleDataMiddlewareRenderer,
  SvgUtils,
} from '../typechain-types';
import { getSvgHotLoadingServer } from '../utils/svg';

task('develop-svg', 'Watches and hot-loads svg', async (args, hre) => {
  await hre.run('compile');

  const SvgUtils = await hre.ethers.getContractFactory('SvgUtils');
  const svgUtils = (await SvgUtils.deploy()) as SvgUtils;
  await svgUtils.deployed();

  const LINE_BYTES =
    '0x' +
    [...Array(16)].reduce((a, c, i) => {
      console.log(255 - i * 16, (255 - i * 16).toString(16).padStart(2, '2'));
      return (
        a +
        '4d' +
        (i * 16).toString(16).padStart(2, '0') +
        '00' +
        '4c' +
        (i * 16).toString(16).padStart(2, '0') +
        (255 - i * 16).toString(16).padStart(2, '0') +
        '4c' +
        'ff' +
        (255 - i * 16).toString(16).padStart(2, '0')
      );
    }, '');

  const HSL_BYTES =
    '0x' +
    [...Array(576)].reduce((a, c, i) => {
      return a + (i % 256).toString(16).padStart(2, '0') + 'FF80';
    }, '');

  const server = await getSvgHotLoadingServer(async () => {
    await hre.run('compile');

    const GifImageRenderer = await hre.ethers.getContractFactory(
      'GifImageRenderer',
      {
        libraries: {
          // BytesUtils: bytesUtils.address,
          // SvgUtils: svgUtils.address,
        },
      },
    );

    const gifRenderer = (await GifImageRenderer.deploy()) as GifImageRenderer;
    await gifRenderer.deployed();

    const ConfiguredGifImageRenderer = await hre.ethers.getContractFactory(
      'ConfiguredGifImageRenderer',
      {
        libraries: {
          // BytesUtils: bytesUtils.address,
          // SvgUtils: svgUtils.address,
        },
      },
    );

    const configuredGifRenderer = (await ConfiguredGifImageRenderer.deploy(
      gifRenderer.address,
    )) as ConfiguredGifImageRenderer;
    await configuredGifRenderer.deployed();
    await configuredGifRenderer.addConfiguration({
      width: 4,
      height: 4,
      colors: '0x2C3333395B64A5C9CAE7F6F2',
    });

    const ImageTupleDataMiddlewareRenderer =
      await hre.ethers.getContractFactory('ImageTupleDataMiddlewareRenderer', {
        libraries: {},
      });

    const imageTupleDataMiddlewareRenderer =
      (await ImageTupleDataMiddlewareRenderer.deploy()) as ImageTupleDataMiddlewareRenderer;
    await imageTupleDataMiddlewareRenderer.deployed();

    const BYTES =
      '0x' +
      '80' +
      imageTupleDataMiddlewareRenderer.address.slice(2) +
      configuredGifRenderer.address.slice(2) +
      '0300' +
      '0101' +
      '0401' +
      '0402' +
      '0403' +
      '0404';

    const AlphaFilterRenderer = await hre.ethers.getContractFactory(
      'AlphaFilterRenderer',
      {
        libraries: {
          SvgUtils: svgUtils.address,
        },
      },
    );

    const renderer =
      (await AlphaFilterRenderer.deploy()) as AlphaFilterRenderer;
    await renderer.deployed();

    console.log(BYTES);
    console.log(
      'wt',
      configuredGifRenderer.address,
      imageTupleDataMiddlewareRenderer.address,
    );
    console.log('hello', await renderer.convertProps(BYTES));
    console.log('raw', await renderer.render(BYTES));

    const res = await renderer.render(BYTES);

    const estimation = await renderer.estimateGas.renderRaw(BYTES);
    console.log('Gas used for call:', estimation.toNumber());
    return `<img width="500" height="500" src="${res}"></img>`;
  });

  console.log(server);
});
