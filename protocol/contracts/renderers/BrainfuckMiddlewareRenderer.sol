// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IRenderer.sol';
import '../libraries/BytesUtils.sol';
import '../vms/BrainFuckVM.sol';
import '../AbsBrainFuckURIConstructor.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/AbsBrainFuckConstants.sol';

contract BrainfuckMiddlewareRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  BrainFuckVM vm;

  constructor(address _vm) {
    vm = BrainFuckVM(_vm);
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
    return 'Brainfuck Middleware';
  }

  function tokenSeed(
    bytes32 seed,
    uint256 tokenId,
    bytes32 constants
  ) public pure returns (bytes memory) {
    return
      abi.encodePacked(constants, keccak256(abi.encodePacked(seed, tokenId)));
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    (, uint256 tokenId, bytes32 seed) = AbsBrainFuckURIConstructor.decodeProps(
      props
    );
    bytes32 constants = bytes32(BytesUtils.toUint256(props, 20 + 32 + 32));

    return
      vm.run(props[20 + 32 + 32 + 32:], tokenSeed(seed, tokenId, constants));
  }

  function render(bytes calldata props)
    external
    view
    override
    returns (string memory)
  {
    return string(renderRaw(props));
  }
}
