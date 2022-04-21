import { task } from 'hardhat/config';
import { getSvgHotLoadingServer } from '../utils/svg';
import { DotMatrixRenderer, SvgUtils } from '../typechain-types';
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

  console.log(GRADIENT_BYTES);

  const server = await getSvgHotLoadingServer(async () => {
    await hre.run('compile');

    const DotMatrixRenderer = await hre.ethers.getContractFactory(
      'DotMatrixRenderer',
      {
        libraries: {
          SvgUtils: svgUtils.address,
        },
      },
    );
    const Renderer = (await DotMatrixRenderer.deploy()) as DotMatrixRenderer;
    await Renderer.deployed();
    const res = await Renderer.renderRaw(GRADIENT_BYTES);
    return res;
  });

  console.log(server);
});
