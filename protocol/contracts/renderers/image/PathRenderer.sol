// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../../interfaces/IRenderer.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../../libraries/ERC721ZUtils.sol';

contract PathRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  function name() public pure override returns (string memory) {
    return 'Path';
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
    return 'ipfs://bafkreih2jlxxhzdf3zpwvmto25apcsuo4kengs2h7panvotm5lwoppce24';
  }

  function renderType() external pure override returns (string memory) {
    return ERC721ZUtils.IMAGE_DATA_KEY;
  }

  function renderRaw(bytes calldata props)
    public
    pure
    override
    returns (bytes memory)
  {
    string memory content = '';
    uint256 i = 0;
    while ((i * 3 + 2) < props.length) {
      if (
        props[i * 3] == 0x4C ||
        props[i * 3] == 0x4D ||
        props[i * 3] == 0x6C ||
        props[i * 3] == 0x6D
      ) {
        content = string(
          abi.encodePacked(
            content,
            ' ',
            props[i * 3],
            (uint256(uint8(props[i * 3 + 1])) + 16).toString(),
            ' ',
            (uint256(uint8(props[i * 3 + 2])) + 16).toString()
          )
        );
      }
      i++;
    }
    return
      abi.encodePacked(
        '<svg xmlns="http://www.w3.org/2000/svg" width="288" height="288" style="background:#F1F1F1"><path fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="',
        content,
        '" /> </svg>'
      );
  }

  function render(bytes calldata props)
    external
    pure
    override
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          ERC721ZUtils.SVG_DATA_BASE_64_PREFIX,
          Base64.encode(bytes(renderRaw(props)))
        )
      );
  }
}
