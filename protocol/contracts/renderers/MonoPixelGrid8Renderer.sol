// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "../libraries/SvgUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

contract MonoPixelGrid8Renderer is IRenderer, ERC165 {
  using Strings for uint256;

  string rectPrefix = '<rect width="1.05" height="1.05" ';
  string rectSuffix = '" />';

  string[64] rects = [
    'x="0" y="0"',
    'x="0" y="1"',
    'x="0" y="2"',
    'x="0" y="3"',
    'x="0" y="4"',
    'x="0" y="5"',
    'x="0" y="6"',
    'x="0" y="7"',
    'x="1" y="0"',
    'x="1" y="1"',
    'x="1" y="2"',
    'x="1" y="3"',
    'x="1" y="4"',
    'x="1" y="5"',
    'x="1" y="6"',
    'x="1" y="7"',
    'x="2" y="0"',
    'x="2" y="1"',
    'x="2" y="2"',
    'x="2" y="3"',
    'x="2" y="4"',
    'x="2" y="5"',
    'x="2" y="6"',
    'x="2" y="7"',
    'x="3" y="0"',
    'x="3" y="1"',
    'x="3" y="2"',
    'x="3" y="3"',
    'x="3" y="4"',
    'x="3" y="5"',
    'x="3" y="6"',
    'x="3" y="7"',
    'x="4" y="0"',
    'x="4" y="1"',
    'x="4" y="2"',
    'x="4" y="3"',
    'x="4" y="4"',
    'x="4" y="5"',
    'x="4" y="6"',
    'x="4" y="7"',
    'x="5" y="0"',
    'x="5" y="1"',
    'x="5" y="2"',
    'x="5" y="3"',
    'x="5" y="4"',
    'x="5" y="5"',
    'x="5" y="6"',
    'x="5" y="7"',
    'x="6" y="0"',
    'x="6" y="1"',
    'x="6" y="2"',
    'x="6" y="3"',
    'x="6" y="4"',
    'x="6" y="5"',
    'x="6" y="6"',
    'x="6" y="7"',
    'x="7" y="0"',
    'x="7" y="1"',
    'x="7" y="2"',
    'x="7" y="3"',
    'x="7" y="4"',
    'x="7" y="5"',
    'x="7" y="6"',
    'x="7" y="7"'
  ];

  address public override owner; 

  constructor() {
    owner = msg.sender;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function outSize() external override pure returns (uint256) {
    return 64;
  }
  
  function additionalMetadataURI() external override pure returns (string memory) {
    return "";
  }

  function renderAttributeKey() external override pure returns (string memory) {
    return "image";
  }

  function renderRaw(bytes calldata out) public override view returns (string memory) {
    string memory content = '';
    for (uint i = 0; i < 64; ++i) {
      content = string(abi.encodePacked(content, rectPrefix, rects[i], ' fill="', SvgUtils.toColorHexStringByBytes(out[i], out[i], out[i]), rectSuffix));
    }

    return string(abi.encodePacked(
      '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" style="background:#F1F1F1">',
        content,
      '</svg>'
      )
    );
  }

  function render(bytes calldata out) external override view returns (string memory) {
    return string(
      abi.encodePacked(
        'data:image/svg+xml;base64,',
        Base64.encode(bytes(renderRaw(out))) 
      )
    );
  }

  function attributes(bytes calldata out) external override pure returns (string memory) {
    uint i = 0;
    while(out[i] != 0x00) {
      i++;
    }
      return string(
            abi.encodePacked(
              '{"trait_type": "Data Length", "value":', i.toString(), '},'
            )
          );
  }
}