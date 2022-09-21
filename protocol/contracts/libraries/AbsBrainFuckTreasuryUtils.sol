// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '../interfaces/IRenderer.sol';
import '../interfaces/IRendererPayable.sol';
import './BytesUtils.sol';

library AbsBrainFuckTreasuryUtils {
  uint32 public constant DISTRIBUTOR_FEE = 1000; // 0.1%

  function encodeRenderersAndFees(
    address[] memory renderers,
    uint32[] memory fees
  ) public pure returns (bytes memory output) {
    output = abi.encodePacked(renderers.length);
    for (uint256 i = 0; i < renderers.length; ++i) {
      output = abi.encodePacked(output, renderers[i], fees[i]);
    }
  }

  function decodeRenderersAndFees(bytes memory props)
    public
    pure
    returns (address[] memory renderers, uint32[] memory fees)
  {
    uint256 len = uint256(uint8(props[0]));
    fees = new uint32[](len);
    renderers = new address[](len);
    for (uint256 i = 0; i < renderers.length; i++) {
      renderers[i] = BytesUtils.toAddress(props, i * 24 + 1);
      fees[i] = BytesUtils.toUint32(props, i * 24 + 1 + 20);
    }
  }

  function getSplitParams(bytes calldata props)
    public
    view
    returns (
      address[] memory,
      uint32[] memory,
      uint32
    )
  {
    (address[] memory renderers, uint32[] memory fees) = decodeRenderersAndFees(
      props
    );
    address[] memory accounts = new address[](renderers.length);

    for (uint256 i = 1; i < accounts.length; ++i) {
      IRenderer renderer = IRenderer(renderers[i]);
      if (renderer.supportsInterface(type(IRendererPayable).interfaceId)) {
        accounts[i] = IRendererPayable(renderers[i]).treasury(props);
      } else {
        accounts[i] = renderer.owner();
      }
    }

    (address[] memory sortedAccounts, uint32[] memory sortedFees) = sort(
      accounts,
      fees
    );

    return (sortedAccounts, sortedFees, DISTRIBUTOR_FEE);
  }

  function sort(address[] memory accounts, uint32[] memory fees)
    internal
    pure
    returns (address[] memory sortedAccounts, uint32[] memory sortedFees)
  {
    uint256[] memory uintAccounts = new uint256[](accounts.length);
    for (uint256 i = 0; i < accounts.length; ++i) {
      uintAccounts[i] = uint256(uint160(accounts[i]));
    }
    quickSort(uintAccounts, fees, uint256(0), uint256(accounts.length - 1));
    sortedAccounts = new address[](accounts.length);
    for (uint256 i = 0; i < accounts.length; ++i) {
      sortedAccounts[i] = address(uint160(accounts[i]));
    }
    sortedFees = fees;
  }

  function quickSort(
    uint256[] memory accounts,
    uint32[] memory fees,
    uint256 left,
    uint256 right
  ) internal pure {
    uint256 i = left;
    uint256 j = right;
    if (i == j) return;
    uint256 pivot = accounts[uint256(left + (right - left) / 2)];
    while (i <= j) {
      while (accounts[uint256(i)] < pivot) i++;
      while (pivot < accounts[uint256(j)]) j--;
      if (i <= j) {
        (accounts[uint256(i)], accounts[uint256(j)]) = (
          accounts[uint256(j)],
          accounts[uint256(i)]
        );
        (fees[uint256(i)], fees[uint256(j)]) = (
          fees[uint256(j)],
          fees[uint256(i)]
        );
        i++;
        j--;
      }
    }
    if (left < j) quickSort(accounts, fees, left, j);
    if (i < right) quickSort(accounts, fees, i, right);
  }
}
