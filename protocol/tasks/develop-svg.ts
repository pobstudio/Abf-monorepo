import { task } from 'hardhat/config';
import {
  ConfiguredGifImageRenderer,
  GifImageRenderer,
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

    const BACKGROUND_SVG_BYTES = '0x00FF00FF2C3333';

    const BYTES =
      '0x00000001' +
      '01'.repeat(4) +
      '02'.repeat(4) +
      '03'.repeat(4) +
      '04'.repeat(4);

    const renderer = (await ConfiguredGifImageRenderer.deploy(
      gifRenderer.address,
    )) as ConfiguredGifImageRenderer;
    await renderer.deployed();
    await renderer.addConfiguration({
      width: 4,
      height: 4,
      colors: '0x2C3333395B64A5C9CAE7F6F2',
    });
    console.log(BYTES);
    console.log(await renderer.getConfiguration(1));
    console.log('raw', await renderer.renderRaw(BYTES));
    const res = await renderer.render(BYTES);
    const estimation = await renderer.estimateGas.renderRaw(BYTES);
    console.log('Gas used for call:', estimation.toNumber());
    return `<img width="500" height="500" src="${res}"></img>`;
  });

  console.log(server);
});
