// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '../interfaces/IRendererPayable.sol';
import '../interfaces/IRenderer.sol';
import '../interfaces/ISplitMain.sol';
import '../libraries/BytesUtils.sol';
import '../libraries/SSTORE2Map.sol';
import '../libraries/SvgUtils.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '../libraries/AbsBrainFuckConstants.sol';
import '../libraries/AbsBrainFuckTreasuryUtils.sol';

contract MiddlewareRenderer is IRenderer, IRendererPayable, Ownable, ERC165 {
  using Strings for uint256;

  ISplitMain public splitMain;

  constructor(address _splitMain) {
    splitMain = ISplitMain(_splitMain);
  }

  function owner() public view override(Ownable, IRenderer) returns (address) {
    return super.owner();
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC165, IERC165)
    returns (bool)
  {
    return
      interfaceId == type(IRenderer).interfaceId ||
      interfaceId == type(IRendererPayable).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function propsSize() external pure override returns (uint256) {
    return 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
  }

  function additionalMetadataURI()
    external
    pure
    override
    returns (string memory)
  {
    return 'ipfs://TODO';
  }

  function renderType() external pure override returns (string memory) {
    return AbsBrainFuckConstants.MIDDLEWARE_RENDER_TYPE;
  }

  function name() public pure override returns (string memory) {
    return 'Middleware';
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    (address[] memory renderers, ) = AbsBrainFuckTreasuryUtils
      .decodeRenderersAndFees(props);
    bytes memory output = props[(1 +
      renderers.length *
      20 +
      renderers.length *
      4):];

    for (uint256 i = 0; i < renderers.length; i += 0) {
      if (renderers[i] != address(0)) {
        IRenderer renderer = IRenderer(renderers[i]);
        output = renderer.renderRaw(output);
      }
    }

    return output;
  }

  function render(bytes calldata props)
    external
    view
    override
    returns (string memory)
  {
    (address[] memory renderers, ) = AbsBrainFuckTreasuryUtils
      .decodeRenderersAndFees(props);

    bytes memory output = props[(1 +
      renderers.length *
      20 +
      renderers.length *
      4):];
    // start from index 1, 0th index uses to self-referentially provide fees
    for (uint256 i = 1; i < renderers.length; i += 0) {
      if (renderers[i] != address(0)) {
        IRenderer renderer = IRenderer(renderers[i]);
        output = bytes(renderer.render(output));
      }
    }
    return string(output);
  }

  function treasury(bytes calldata props)
    external
    view
    override
    returns (address)
  {
    (
      address[] memory sortedAccounts,
      uint32[] memory sortedFees,
      uint32 distributorFee
    ) = AbsBrainFuckTreasuryUtils.getSplitParams(props);
    return
      splitMain.predictImmutableSplitAddress(
        sortedAccounts,
        sortedFees,
        distributorFee
      );
  }

  function createTreasury(bytes calldata props)
    external
    override
    returns (address)
  {
    (
      address[] memory sortedAccounts,
      uint32[] memory sortedFees,
      uint32 distributorFee
    ) = AbsBrainFuckTreasuryUtils.getSplitParams(props);
    return
      splitMain.createSplit(
        sortedAccounts,
        sortedFees,
        distributorFee,
        address(0)
      );
  }
}
