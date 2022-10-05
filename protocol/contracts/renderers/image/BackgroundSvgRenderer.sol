// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../../interfaces/IRenderer.sol';
import '../../libraries/SvgUtils.sol';
import '../../libraries/BytesUtils.sol';
import '../../libraries/ERC721ZUtils.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract BackgroundSvgRenderer is IRenderer, Ownable, ERC165 {
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
    return 7;
  }

  function additionalMetadataURI()
    external
    pure
    override
    returns (string memory)
  {
    return 'ipfs://bafkreihd75rookps7excbzcztryjpx4brtvrsz3kvfehz5lsx5xq364u6a';
  }

  function renderType() external pure override returns (string memory) {
    return ERC721ZUtils.IMAGE_DATA_KEY;
  }

  function name() public pure override returns (string memory) {
    return 'BackgroundSvg';
  }

  function renderRaw(bytes calldata props)
    public
    pure
    override
    returns (bytes memory)
  {
    uint16 width = BytesUtils.toUint16(props, 0);
    uint16 height = BytesUtils.toUint16(props, 2);
    return
      abi.encodePacked(
        '<svg xmlns="http://www.w3.org/2000/svg" width="',
        uint256(width).toString(),
        '" height="',
        uint256(height).toString(),
        '" style="background:',
        SvgUtils.toColorHexStringByBytes(props[4], props[5], props[6]),
        '"></svg>'
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
          Base64.encode(renderRaw(props))
        )
      );
  }
}
