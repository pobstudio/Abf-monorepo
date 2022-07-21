import { BigNumber } from 'ethers';
import { task } from 'hardhat/config';
import { GifImageRenderer, SvgUtils } from '../typechain-types';
import { getSvgHotLoadingServer } from '../utils/svg';

task('develop-svg', 'Watches and hot-loads svg', async (args, hre) => {
  await hre.run('compile');

  const SvgUtils = await hre.ethers.getContractFactory('SvgUtils');
  const svgUtils = (await SvgUtils.deploy()) as SvgUtils;
  await svgUtils.deployed();

  // const BytesUtils = await hre.ethers.getContractFactory('BytesUtils');
  // const bytesUtils = (await BytesUtils.deploy()) as BytesUtils;
  // await bytesUtils.deployed();

  const GRADIENT_BYTES =
    '0x' +
    [...Array(256)].reduce(
      (a, c, i) => a + BigNumber.from(i).toHexString().slice(2),
      '',
    );

  const MONO_GRAYSCALE_BYTES =
    '0x' +
    [...Array(256)].reduce(
      (a, c, i) => a + BigNumber.from(i).toHexString().slice(2),
      '',
    );

  const GRAYSCALE_BYTES =
    '0x' +
    [...Array(64)].reduce(
      (a, c, i) =>
        a +
        BigNumber.from(i).toHexString().slice(2) +
        BigNumber.from(i).toHexString().slice(2) +
        BigNumber.from(i).toHexString().slice(2),
      '',
    );

  const LINE_BYTES =
    '0x4D0000' +
    [...Array(16)].reduce(
      (a, c, i) =>
        a +
        'L'.charCodeAt(0).toString(16) +
        BigNumber.from(i * 16)
          .toHexString()
          .slice(2) +
        (i % 2 === 1 ? '00' : 'ff'),
      '',
    );

  const server = await getSvgHotLoadingServer(async () => {
    await hre.run('compile');

    // const DotMatrixRenderer = await hre.ethers.getContractFactory(
    //   'DotMatrixRenderer',
    //   {
    //     libraries: {
    //       SvgUtils: svgUtils.address,
    //     },
    //   },
    // );
    // const Renderer = (await DotMatrixRenderer.deploy()) as DotMatrixRenderer;

    // const MonoPixelGrid8Renderer = await hre.ethers.getContractFactory(
    //   'MonoPixelGrid8Renderer',
    //   {
    //     libraries: {
    //       SvgUtils: svgUtils.address,
    //     },
    //   },
    // );

    const BackgroundSvgRenderer = await hre.ethers.getContractFactory(
      'BackgroundSvgRenderer',
      {
        libraries: {
          // BytesUtils: bytesUtils.address,
          SvgUtils: svgUtils.address,
        },
      },
    );

    const GifImageRenderer = await hre.ethers.getContractFactory(
      'GifImageRenderer',
      {
        libraries: {
          // BytesUtils: bytesUtils.address,
          // SvgUtils: svgUtils.address,
        },
      },
    );

    const BYTES =
      '0x0405042C3333395B64A5C9CAE7F6F2' +
      '00'.repeat(4) +
      '01'.repeat(4) +
      '02'.repeat(4) +
      '03'.repeat(4) +
      '04'.repeat(4);

    const renderer = (await GifImageRenderer.deploy()) as GifImageRenderer;
    await renderer.deployed();

    console.log(BYTES);
    try {
      // console.log(await renderer.renderRaw(BYTES));
    } catch (e) {
      console.log(e);
    }
    const res = await renderer.render(BYTES);
    const estimation = await renderer.estimateGas.renderRaw(BYTES);
    console.log('Gas used for call:', estimation.toNumber());
    return `<img width="500" height="500" src="${res}"></img>`;
  });

  console.log(server);
});
