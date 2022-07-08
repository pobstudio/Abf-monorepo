// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "../libraries/SvgUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MonoPixelGrid16Renderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  string rectPrefix = '<rect width="1.05" height="1.05" ';
  string rectSuffix = '" />';

  string[256] rects = [
    'y="0" x="0"',
    'y="0" x="1"',
    'y="0" x="2"',
    'y="0" x="3"',
    'y="0" x="4"',
    'y="0" x="5"',
    'y="0" x="6"',
    'y="0" x="7"',
    'y="0" x="8"',
    'y="0" x="9"',
    'y="0" x="10"',
    'y="0" x="11"',
    'y="0" x="12"',
    'y="0" x="13"',
    'y="0" x="14"',
    'y="0" x="15"',
    'y="1" x="0"',
    'y="1" x="1"',
    'y="1" x="2"',
    'y="1" x="3"',
    'y="1" x="4"',
    'y="1" x="5"',
    'y="1" x="6"',
    'y="1" x="7"',
    'y="1" x="8"',
    'y="1" x="9"',
    'y="1" x="10"',
    'y="1" x="11"',
    'y="1" x="12"',
    'y="1" x="13"',
    'y="1" x="14"',
    'y="1" x="15"',
    'y="2" x="0"',
    'y="2" x="1"',
    'y="2" x="2"',
    'y="2" x="3"',
    'y="2" x="4"',
    'y="2" x="5"',
    'y="2" x="6"',
    'y="2" x="7"',
    'y="2" x="8"',
    'y="2" x="9"',
    'y="2" x="10"',
    'y="2" x="11"',
    'y="2" x="12"',
    'y="2" x="13"',
    'y="2" x="14"',
    'y="2" x="15"',
    'y="3" x="0"',
    'y="3" x="1"',
    'y="3" x="2"',
    'y="3" x="3"',
    'y="3" x="4"',
    'y="3" x="5"',
    'y="3" x="6"',
    'y="3" x="7"',
    'y="3" x="8"',
    'y="3" x="9"',
    'y="3" x="10"',
    'y="3" x="11"',
    'y="3" x="12"',
    'y="3" x="13"',
    'y="3" x="14"',
    'y="3" x="15"',
    'y="4" x="0"',
    'y="4" x="1"',
    'y="4" x="2"',
    'y="4" x="3"',
    'y="4" x="4"',
    'y="4" x="5"',
    'y="4" x="6"',
    'y="4" x="7"',
    'y="4" x="8"',
    'y="4" x="9"',
    'y="4" x="10"',
    'y="4" x="11"',
    'y="4" x="12"',
    'y="4" x="13"',
    'y="4" x="14"',
    'y="4" x="15"',
    'y="5" x="0"',
    'y="5" x="1"',
    'y="5" x="2"',
    'y="5" x="3"',
    'y="5" x="4"',
    'y="5" x="5"',
    'y="5" x="6"',
    'y="5" x="7"',
    'y="5" x="8"',
    'y="5" x="9"',
    'y="5" x="10"',
    'y="5" x="11"',
    'y="5" x="12"',
    'y="5" x="13"',
    'y="5" x="14"',
    'y="5" x="15"',
    'y="6" x="0"',
    'y="6" x="1"',
    'y="6" x="2"',
    'y="6" x="3"',
    'y="6" x="4"',
    'y="6" x="5"',
    'y="6" x="6"',
    'y="6" x="7"',
    'y="6" x="8"',
    'y="6" x="9"',
    'y="6" x="10"',
    'y="6" x="11"',
    'y="6" x="12"',
    'y="6" x="13"',
    'y="6" x="14"',
    'y="6" x="15"',
    'y="7" x="0"',
    'y="7" x="1"',
    'y="7" x="2"',
    'y="7" x="3"',
    'y="7" x="4"',
    'y="7" x="5"',
    'y="7" x="6"',
    'y="7" x="7"',
    'y="7" x="8"',
    'y="7" x="9"',
    'y="7" x="10"',
    'y="7" x="11"',
    'y="7" x="12"',
    'y="7" x="13"',
    'y="7" x="14"',
    'y="7" x="15"',
    'y="8" x="0"',
    'y="8" x="1"',
    'y="8" x="2"',
    'y="8" x="3"',
    'y="8" x="4"',
    'y="8" x="5"',
    'y="8" x="6"',
    'y="8" x="7"',
    'y="8" x="8"',
    'y="8" x="9"',
    'y="8" x="10"',
    'y="8" x="11"',
    'y="8" x="12"',
    'y="8" x="13"',
    'y="8" x="14"',
    'y="8" x="15"',
    'y="9" x="0"',
    'y="9" x="1"',
    'y="9" x="2"',
    'y="9" x="3"',
    'y="9" x="4"',
    'y="9" x="5"',
    'y="9" x="6"',
    'y="9" x="7"',
    'y="9" x="8"',
    'y="9" x="9"',
    'y="9" x="10"',
    'y="9" x="11"',
    'y="9" x="12"',
    'y="9" x="13"',
    'y="9" x="14"',
    'y="9" x="15"',
    'y="10" x="0"',
    'y="10" x="1"',
    'y="10" x="2"',
    'y="10" x="3"',
    'y="10" x="4"',
    'y="10" x="5"',
    'y="10" x="6"',
    'y="10" x="7"',
    'y="10" x="8"',
    'y="10" x="9"',
    'y="10" x="10"',
    'y="10" x="11"',
    'y="10" x="12"',
    'y="10" x="13"',
    'y="10" x="14"',
    'y="10" x="15"',
    'y="11" x="0"',
    'y="11" x="1"',
    'y="11" x="2"',
    'y="11" x="3"',
    'y="11" x="4"',
    'y="11" x="5"',
    'y="11" x="6"',
    'y="11" x="7"',
    'y="11" x="8"',
    'y="11" x="9"',
    'y="11" x="10"',
    'y="11" x="11"',
    'y="11" x="12"',
    'y="11" x="13"',
    'y="11" x="14"',
    'y="11" x="15"',
    'y="12" x="0"',
    'y="12" x="1"',
    'y="12" x="2"',
    'y="12" x="3"',
    'y="12" x="4"',
    'y="12" x="5"',
    'y="12" x="6"',
    'y="12" x="7"',
    'y="12" x="8"',
    'y="12" x="9"',
    'y="12" x="10"',
    'y="12" x="11"',
    'y="12" x="12"',
    'y="12" x="13"',
    'y="12" x="14"',
    'y="12" x="15"',
    'y="13" x="0"',
    'y="13" x="1"',
    'y="13" x="2"',
    'y="13" x="3"',
    'y="13" x="4"',
    'y="13" x="5"',
    'y="13" x="6"',
    'y="13" x="7"',
    'y="13" x="8"',
    'y="13" x="9"',
    'y="13" x="10"',
    'y="13" x="11"',
    'y="13" x="12"',
    'y="13" x="13"',
    'y="13" x="14"',
    'y="13" x="15"',
    'y="14" x="0"',
    'y="14" x="1"',
    'y="14" x="2"',
    'y="14" x="3"',
    'y="14" x="4"',
    'y="14" x="5"',
    'y="14" x="6"',
    'y="14" x="7"',
    'y="14" x="8"',
    'y="14" x="9"',
    'y="14" x="10"',
    'y="14" x="11"',
    'y="14" x="12"',
    'y="14" x="13"',
    'y="14" x="14"',
    'y="14" x="15"',
    'y="15" x="0"',
    'y="15" x="1"',
    'y="15" x="2"',
    'y="15" x="3"',
    'y="15" x="4"',
    'y="15" x="5"',
    'y="15" x="6"',
    'y="15" x="7"',
    'y="15" x="8"',
    'y="15" x="9"',
    'y="15" x="10"',
    'y="15" x="11"',
    'y="15" x="12"',
    'y="15" x="13"',
    'y="15" x="14"',
    'y="15" x="15"' 
  ];

  function owner() public override(Ownable, IRenderer) view returns (address) {
    return super.owner();
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function propsSize() external override pure returns (uint256) {
    return 256;
  }
  
  function additionalMetadataURI() external override pure returns (string memory) {
    return "ipfs://bafkreib7mkx3c7owpn5uwkqtviddhspu376t52u2wljh3o5gnz2kfmn7de";
  }

  function renderAttributeKey() external override pure returns (string memory) {
    return "image";
  }

  function renderRaw(bytes calldata props) public override view returns (string memory) {
    string memory content = '';
    for (uint i = 0; i < 256; ++i) {
      content = string(abi.encodePacked(content, rectPrefix, rects[i], ' fill="', SvgUtils.toColorHexStringByBytes(props[i], props[i], props[i]), rectSuffix));
    }

    return string(abi.encodePacked(
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="background:#F1F1F1">',
        content,
      '</svg>'
      )
    );
  }

  function render(bytes calldata props) external override view returns (string memory) {
    return string(
      abi.encodePacked(
        'data:image/svg+xml;base64,',
        Base64.encode(bytes(renderRaw(props))) 
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
              '{"trait_type": "Data Length", "value":', i.toString(), '},'
            )
          );
  }
}