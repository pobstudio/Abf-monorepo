// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "../libraries/SvgUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

contract PixelGrid16Renderer is IRenderer, ERC165 {
  using Strings for uint256;

  string rectPrefix = '<rect width="35" height="35"';
  string rectSuffix = '" />';

  string[256] rects = [
    'x="0" y="0"',
    'x="0" y="35"',
    'x="0" y="70"',
    'x="0" y="105"',
    'x="0" y="140"',
    'x="0" y="175"',
    'x="0" y="210"',
    'x="0" y="245"',
    'x="0" y="280"',
    'x="0" y="315"',
    'x="0" y="350"',
    'x="0" y="385"',
    'x="0" y="420"',
    'x="0" y="455"',
    'x="0" y="490"',
    'x="0" y="525"',
    'x="35" y="0"',
    'x="35" y="35"',
    'x="35" y="70"',
    'x="35" y="105"',
    'x="35" y="140"',
    'x="35" y="175"',
    'x="35" y="210"',
    'x="35" y="245"',
    'x="35" y="280"',
    'x="35" y="315"',
    'x="35" y="350"',
    'x="35" y="385"',
    'x="35" y="420"',
    'x="35" y="455"',
    'x="35" y="490"',
    'x="35" y="525"',
    'x="70" y="0"',
    'x="70" y="35"',
    'x="70" y="70"',
    'x="70" y="105"',
    'x="70" y="140"',
    'x="70" y="175"',
    'x="70" y="210"',
    'x="70" y="245"',
    'x="70" y="280"',
    'x="70" y="315"',
    'x="70" y="350"',
    'x="70" y="385"',
    'x="70" y="420"',
    'x="70" y="455"',
    'x="70" y="490"',
    'x="70" y="525"',
    'x="105" y="0"',
    'x="105" y="35"',
    'x="105" y="70"',
    'x="105" y="105"',
    'x="105" y="140"',
    'x="105" y="175"',
    'x="105" y="210"',
    'x="105" y="245"',
    'x="105" y="280"',
    'x="105" y="315"',
    'x="105" y="350"',
    'x="105" y="385"',
    'x="105" y="420"',
    'x="105" y="455"',
    'x="105" y="490"',
    'x="105" y="525"',
    'x="140" y="0"',
    'x="140" y="35"',
    'x="140" y="70"',
    'x="140" y="105"',
    'x="140" y="140"',
    'x="140" y="175"',
    'x="140" y="210"',
    'x="140" y="245"',
    'x="140" y="280"',
    'x="140" y="315"',
    'x="140" y="350"',
    'x="140" y="385"',
    'x="140" y="420"',
    'x="140" y="455"',
    'x="140" y="490"',
    'x="140" y="525"',
    'x="175" y="0"',
    'x="175" y="35"',
    'x="175" y="70"',
    'x="175" y="105"',
    'x="175" y="140"',
    'x="175" y="175"',
    'x="175" y="210"',
    'x="175" y="245"',
    'x="175" y="280"',
    'x="175" y="315"',
    'x="175" y="350"',
    'x="175" y="385"',
    'x="175" y="420"',
    'x="175" y="455"',
    'x="175" y="490"',
    'x="175" y="525"',
    'x="210" y="0"',
    'x="210" y="35"',
    'x="210" y="70"',
    'x="210" y="105"',
    'x="210" y="140"',
    'x="210" y="175"',
    'x="210" y="210"',
    'x="210" y="245"',
    'x="210" y="280"',
    'x="210" y="315"',
    'x="210" y="350"',
    'x="210" y="385"',
    'x="210" y="420"',
    'x="210" y="455"',
    'x="210" y="490"',
    'x="210" y="525"',
    'x="245" y="0"',
    'x="245" y="35"',
    'x="245" y="70"',
    'x="245" y="105"',
    'x="245" y="140"',
    'x="245" y="175"',
    'x="245" y="210"',
    'x="245" y="245"',
    'x="245" y="280"',
    'x="245" y="315"',
    'x="245" y="350"',
    'x="245" y="385"',
    'x="245" y="420"',
    'x="245" y="455"',
    'x="245" y="490"',
    'x="245" y="525"',
    'x="280" y="0"',
    'x="280" y="35"',
    'x="280" y="70"',
    'x="280" y="105"',
    'x="280" y="140"',
    'x="280" y="175"',
    'x="280" y="210"',
    'x="280" y="245"',
    'x="280" y="280"',
    'x="280" y="315"',
    'x="280" y="350"',
    'x="280" y="385"',
    'x="280" y="420"',
    'x="280" y="455"',
    'x="280" y="490"',
    'x="280" y="525"',
    'x="315" y="0"',
    'x="315" y="35"',
    'x="315" y="70"',
    'x="315" y="105"',
    'x="315" y="140"',
    'x="315" y="175"',
    'x="315" y="210"',
    'x="315" y="245"',
    'x="315" y="280"',
    'x="315" y="315"',
    'x="315" y="350"',
    'x="315" y="385"',
    'x="315" y="420"',
    'x="315" y="455"',
    'x="315" y="490"',
    'x="315" y="525"',
    'x="350" y="0"',
    'x="350" y="35"',
    'x="350" y="70"',
    'x="350" y="105"',
    'x="350" y="140"',
    'x="350" y="175"',
    'x="350" y="210"',
    'x="350" y="245"',
    'x="350" y="280"',
    'x="350" y="315"',
    'x="350" y="350"',
    'x="350" y="385"',
    'x="350" y="420"',
    'x="350" y="455"',
    'x="350" y="490"',
    'x="350" y="525"',
    'x="385" y="0"',
    'x="385" y="35"',
    'x="385" y="70"',
    'x="385" y="105"',
    'x="385" y="140"',
    'x="385" y="175"',
    'x="385" y="210"',
    'x="385" y="245"',
    'x="385" y="280"',
    'x="385" y="315"',
    'x="385" y="350"',
    'x="385" y="385"',
    'x="385" y="420"',
    'x="385" y="455"',
    'x="385" y="490"',
    'x="385" y="525"',
    'x="420" y="0"',
    'x="420" y="35"',
    'x="420" y="70"',
    'x="420" y="105"',
    'x="420" y="140"',
    'x="420" y="175"',
    'x="420" y="210"',
    'x="420" y="245"',
    'x="420" y="280"',
    'x="420" y="315"',
    'x="420" y="350"',
    'x="420" y="385"',
    'x="420" y="420"',
    'x="420" y="455"',
    'x="420" y="490"',
    'x="420" y="525"',
    'x="455" y="0"',
    'x="455" y="35"',
    'x="455" y="70"',
    'x="455" y="105"',
    'x="455" y="140"',
    'x="455" y="175"',
    'x="455" y="210"',
    'x="455" y="245"',
    'x="455" y="280"',
    'x="455" y="315"',
    'x="455" y="350"',
    'x="455" y="385"',
    'x="455" y="420"',
    'x="455" y="455"',
    'x="455" y="490"',
    'x="455" y="525"',
    'x="490" y="0"',
    'x="490" y="35"',
    'x="490" y="70"',
    'x="490" y="105"',
    'x="490" y="140"',
    'x="490" y="175"',
    'x="490" y="210"',
    'x="490" y="245"',
    'x="490" y="280"',
    'x="490" y="315"',
    'x="490" y="350"',
    'x="490" y="385"',
    'x="490" y="420"',
    'x="490" y="455"',
    'x="490" y="490"',
    'x="490" y="525"',
    'x="525" y="0"',
    'x="525" y="35"',
    'x="525" y="70"',
    'x="525" y="105"',
    'x="525" y="140"',
    'x="525" y="175"',
    'x="525" y="210"',
    'x="525" y="245"',
    'x="525" y="280"',
    'x="525" y="315"',
    'x="525" y="350"',
    'x="525" y="385"',
    'x="525" y="420"',
    'x="525" y="455"',
    'x="525" y="490"',
    'x="525" y="525"'
  ];

  // function name() external override pure returns (string memory) {
  //   return "DOT MATRIX";
  // }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function outSize() external override pure returns (uint256) {
    return 256 * 3;
  }
  
  function additionalMetadataURI() external override pure returns (string memory) {
    return "";
  }

  function renderRaw(bytes calldata out) public override view returns (string memory) {
    string memory content = '';
    for (uint i = 0; i < 256; ++i) {
      content = string(abi.encodePacked(content, rectPrefix, rects[i], ' fill="', SvgUtils.toColorHexStringByBytes(out[i * 3], out[i * 3 + 1], out[i * 3 + 2]), rectSuffix));
    }

    return string(abi.encodePacked(
      '<svg xmlns="http://www.w3.org/2000/svg" width="560" height="560" style="background:#F1F1F1">',
        content,
      '</svg>'
      )
    );
  }

  function render(bytes calldata out) external override view returns (string memory) {
    return string(
      abi.encodePacked(
        'data:application/json;base64,',
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