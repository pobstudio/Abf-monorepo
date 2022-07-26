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

const HSL_BYTES =
  '0x' +
  [...Array(256)].reduce((a, c, i) => {
    return a + (i % 256).toString(16).padStart(2, '0') + 'FF80';
  }, '');

console.log(HSL_BYTES);
// for (let i = 128; i < 255; ++i) {
//   console.log(
//     "'" + i + "': () => `${createTemplateInsert('" + (i + 1) + "')}-`,",
//   );
// }
