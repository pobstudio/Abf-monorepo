import { BigNumber } from 'ethers';

// const abi = new utils.Interface([
//   'function approve(address _approved, uint256 _tokenId) external payable',
//   'function setApprovalForAll(address _operator, bool _approved) external',
// ]);

// console.log(abi.getFunction('setApprovalForAll'));
// console.log(abi.getSighash('setApprovalForAll'));

// const contractMetadata = {
//   name: 'Abs Brain Fuck',
//   description: 'On-chain generative art written in BrainFuck. Why? Who knows.',
// };

// console.log(JSON.stringify(contractMetadata));

const GRAYSCALE_BYTES =
  '0x' +
  [...Array(256)].reduce(
    (a, c, i) => a + i.toString(16).padStart(2, '0'),
    // i.toString(16).padStart(2, '0') +
    // i.toString(16).padStart(2, '0') +
    '',
  ) +
  [...Array(256)].reduce(
    (a, c, i) => a + i.toString(16).padStart(2, '0'),
    // i.toString(16).padStart(2, '0') +
    // i.toString(16).padStart(2, '0') +
    '',
  ) +
  [...Array(64)].reduce(
    (a, c, i) => a + i.toString(16).padStart(2, '0'),
    // i.toString(16).padStart(2, '0') +
    // i.toString(16).padStart(2, '0') +
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

console.log(LINE_BYTES);
