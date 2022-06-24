import { BigNumber } from 'ethers';
import clamp from 'lodash/clamp';
import { ZERO } from '../constants';

const DECIMALS = 4;
const ONE_UNIT = 10 ** 4;

export const svgUtils = {
  lerp: (min: number, max: number, scale: number) => {
    const boundedScale = clamp(scale, 0, 255);
    if (boundedScale === 0) return BigNumber.from(min).mul(ONE_UNIT);
    if (boundedScale === 255) return BigNumber.from(max).mul(ONE_UNIT);
    const delta = BigNumber.from(max)
      .sub(min)
      .mul(ONE_UNIT)
      .mul(scale)
      .div(255);
    return BigNumber.from(min).mul(ONE_UNIT).add(delta);
  },
  toDecimalString: (n: BigNumber) => {
    if (n.eq(ZERO)) return '0';
    return (
      n.div(ONE_UNIT).toString() +
      '.' +
      n.mod(DECIMALS).toString().padStart(DECIMALS, '0')
    );
  },
};
