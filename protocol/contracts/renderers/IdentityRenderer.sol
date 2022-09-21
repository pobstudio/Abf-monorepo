// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IRenderer.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/AbsBrainFuckConstants.sol';

contract IdentityRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

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
    return 'ipfs://bafkreicxqdlbjlnrjqvcxvlz5x2swhrp5hahxvelvs2i4qxvn7hxqdtwga';
  }

  function renderType() external pure override returns (string memory) {
    return AbsBrainFuckConstants.IMAGE_RENDER_TYPE;
  }

  function name() public pure override returns (string memory) {
    return 'Identity';
  }

  function renderRaw(bytes calldata props)
    public
    pure
    override
    returns (bytes memory)
  {
    bytes memory output = '';
    uint256 i = 0;
    while (i < props.length) {
      output = abi.encodePacked(output, props[i]);
      i++;
    }
    return output;
  }

  function render(bytes calldata props)
    external
    pure
    override
    returns (string memory)
  {
    return string(renderRaw(props));
  }
}
