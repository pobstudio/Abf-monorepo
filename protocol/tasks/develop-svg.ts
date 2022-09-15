import { task } from 'hardhat/config';
import {
  CompactMiddlewareRenderer,
  AnimatedGifImageRenderer,
  GifImageRenderer,
  LayerCompositeRenderer,
  SvgUtils,
} from '../typechain-types';
import { getSvgHotLoadingServer } from '../utils/svg';

task('develop-svg', 'Watches and hot-loads svg', async (args, hre) => {
  await hre.run('compile');

  const SvgUtils = await hre.ethers.getContractFactory('SvgUtils');
  const svgUtils = (await SvgUtils.deploy()) as SvgUtils;
  await svgUtils.deployed();

  const server = await getSvgHotLoadingServer(async () => {
    await hre.run('compile');

    const AnimatedGifImageRenderer = await hre.ethers.getContractFactory(
      'AnimatedGifImageRenderer',
    );

    const animatedGifImageRenderer = (await AnimatedGifImageRenderer.deploy()) as AnimatedGifImageRenderer;
    await animatedGifImageRenderer.deployed();

    const HEADER_BYTES =
      '0x0404042C3333395B64A5C9CAE7F6F2';

    const FRAME_1 = '01010101020202020303030304040404';
    const FRAME_2 = '02020202030303030404040401010101';
    const FRAME_3 = '03030303040404040101010102020202';
    const FRAME_4 = '04040404010101010202020203030303';

    const BYTES = HEADER_BYTES + FRAME_1 + FRAME_2 + FRAME_3 + FRAME_4;

    const res = await animatedGifImageRenderer.render(BYTES);

    return `<img style="image-rendering: pixelated;" width="500" height="500" src="${res}"></img>`;
  });

  console.log(server);
});
