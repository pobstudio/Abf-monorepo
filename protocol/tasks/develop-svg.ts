import { task } from 'hardhat/config';
import { getSvgHotLoadingServer } from '../utils/svg';
import { PathRenderer, PixelGridRenderer, SvgUtils } from '../typechain-types';
import { BigNumber } from 'ethers';

task('develop-svg', 'Watches and hot-loads svg', async (args, hre) => {
  await hre.run('compile');

  const SvgUtils = await hre.ethers.getContractFactory('SvgUtils');
  const svgUtils = (await SvgUtils.deploy()) as SvgUtils;
  await svgUtils.deployed();

  const GRADIENT_BYTES =
    '0x' +
    [...Array(256)].reduce(
      (a, c, i) => a + BigNumber.from(i).toHexString().slice(2),
      '',
    );

  const GRAYSCALE_BYTES =
    '0x' +
    [...Array(256)].reduce(
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
    ) +
    '000000';

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

    const PixelGridRenderer = await hre.ethers.getContractFactory(
      'PixelGridRenderer',
      {
        libraries: {
          SvgUtils: svgUtils.address,
        },
      },
    );

    // const PathRenderer = await hre.ethers.getContractFactory('PathRenderer', {
    //   // libraries: {
    //   //   SvgUtils: svgUtils.address,
    //   // },
    // });
    const renderer = (await PixelGridRenderer.deploy()) as PathRenderer;
    await renderer.deployed();
    const res = await renderer.renderRaw(GRAYSCALE_BYTES);
    const estimation = await renderer.estimateGas.renderRaw(GRAYSCALE_BYTES);
    console.log('Gas used for call:', estimation.toNumber());
    return res;
  });

  console.log(server);
});
