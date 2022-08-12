import { task } from 'hardhat/config';
import {
  CompactMiddlewareRenderer,
  ConfiguredGifImageRenderer,
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

    const GifImageRenderer = await hre.ethers.getContractFactory(
      'GifImageRenderer',
    );

    const gifRenderer = (await GifImageRenderer.deploy()) as GifImageRenderer;
    await gifRenderer.deployed();

    const ConfiguredGifImageRenderer = await hre.ethers.getContractFactory(
      'ConfiguredGifImageRenderer',
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
    await configuredGifRenderer.addConfiguration({
      width: 4,
      height: 4,
      colors: '0xFF1E00E8F9FD59CE8F000000',
    });
    const LayerCompositeRenderer = await hre.ethers.getContractFactory(
      'LayerCompositeRenderer',
      {
        libraries: {},
      },
    );

    const layerRenderer =
      (await LayerCompositeRenderer.deploy()) as LayerCompositeRenderer;
    await layerRenderer.deployed();

    const BYTES_1 =
      '0x0404042C3333395B64A5C9CAE7F6F201010101020202020303030304040404';

    const BYTES_2 =
      '0x040404FF1E00E8F9FD59CE8F00000000000000030303030000000000000000';

    // const BYTES = await layerRenderer.encodeProps(
    //   [gifRenderer.address, gifRenderer.address],
    //   [BYTES_2, BYTES_1],
    // );

    const CompactMiddlewareRenderer = await hre.ethers.getContractFactory(
      'CompactMiddlewareRenderer',
      {
        libraries: {},
      },
    );

    const compactRenderer =
      (await CompactMiddlewareRenderer.deploy()) as CompactMiddlewareRenderer;
    await compactRenderer.deployed();

    const BYTES =
      '0x6f6cAf3012896bA475838eC0a8A273776828ff3A004004000003000101ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff01ff014001';

    const OUT = await compactRenderer.convertProps(BYTES);

    console.log(OUT.slice(2).length / 2);
    // console.log(OUT)

    // const res = await layerRenderer.render(BYTES);

    const estimation = await compactRenderer.estimateGas.convertProps(BYTES);
    console.log('Gas used for call:', estimation.toNumber());
    return `<img width="500" height="500" src="${''}"></img>`;
  });

  console.log(server);
});
