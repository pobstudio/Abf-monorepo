import { task } from 'hardhat/config';
import { getSvgHotLoadingServer } from '../utils/svg';
import { DotMatrixBFR } from '../typechain-types';

task('develop-svg', 'Watches and hot-loads svg', async (args, hre) => {
  const server = await getSvgHotLoadingServer(async () => {
    await hre.run('compile');

    const DotMatrixBFR = await hre.ethers.getContractFactory('DotMatrixBFR');
    const bfr = (await DotMatrixBFR.deploy()) as DotMatrixBFR;
    await bfr.deployed();
    const res = await bfr.renderRaw('0x00');
    return res;
  });

  console.log(server);
});
