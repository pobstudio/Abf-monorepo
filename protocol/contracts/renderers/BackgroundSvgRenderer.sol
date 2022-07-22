// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "../libraries/SvgUtils.sol";
import "../libraries/BytesUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract BackgroundSvgRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  function owner() public override(Ownable, IRenderer) view returns (address) {
    return super.owner();
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function propsSize() external override pure returns (uint256) {
    return 7;
  }
  
  function additionalMetadataURI() external override pure returns (string memory) {
    return "ipfs://bafkreihd75rookps7excbzcztryjpx4brtvrsz3kvfehz5lsx5xq364u6a";
  }

  function renderAttributeKey() external override pure returns (string memory) {
    return "image";
  }

  function name() public override pure returns (string memory) {
    return 'Background Svg';
  }

  function renderRaw(bytes calldata props) public override pure returns (bytes memory) {
    uint16 width = BytesUtils.toUint16(props, 0);
    uint16 height = BytesUtils.toUint16(props, 2);
    return abi.encodePacked(
      '<svg xmlns="http://www.w3.org/2000/svg" width="', uint256(width).toString(),'" height="', uint256(height).toString(), '" style="background:', SvgUtils.toColorHexStringByBytes(props[4], props[5], props[6]),'"></svg>'
    );
  }

  function render(bytes calldata props) external override pure returns (string memory) {
    return string(
      abi.encodePacked(
        'data:image/svg+xml;base64,',
        Base64.encode(renderRaw(props)) 
      )
    );
  }

  function attributes(bytes calldata props) external override pure returns (string memory) {
    uint i = 0;
    while(props[i] != 0x00) {
      i++;
    }
      return string(
            abi.encodePacked(
              '{"trait_type": "Data Length", "value":', i.toString(), '}'
            )
          );
  }
}