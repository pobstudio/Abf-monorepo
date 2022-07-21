// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../libraries/SSTORE2Map.sol";
import "../interfaces/IRenderer.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ConfiguredGifImageRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  IRenderer gifImageRenderer;

  uint public maxConfigurationIndex = 1;

  struct Configuration {
    uint8 width; 
    uint8 height;
    bytes colors;
  }

  constructor(address _gifImageRenderer) {
    gifImageRenderer = IRenderer(_gifImageRenderer);
  }

  function owner() public override(Ownable, IRenderer) view returns (address) {
    return super.owner();
  }

  function addConfiguration(Configuration memory config) public returns (uint) {
    require (config.colors.length % 3 == 0, "colors must come in r,g,b tuples");
    SSTORE2Map.write(bytes32(maxConfigurationIndex), abi.encodePacked(config.width, config.height, uint8(config.colors.length / 3), config.colors));
    return maxConfigurationIndex;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function propsSize() external override pure returns (uint256) {
    return 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
  }
  
  function additionalMetadataURI() external override pure returns (string memory) {
    return "ipfs://bafkreiaowcb6vqtrrpvgldihr6cbb4vlexrhhxocnyh2fel7q4fku7aruu";
  }
  
  function renderAttributeKey() external override pure returns (string memory) {
    return "image";
  }

  function renderRaw(bytes calldata props) public override view returns (string memory) {
    return gifImageRenderer.renderRaw(abi.encode(SSTORE2Map.read(bytes32(props[0])), props[1: props.length]));
  }

  function render(bytes calldata props) external override view returns (string memory) {
    return renderRaw(props);
  }

  function attributes(bytes calldata props) external override pure returns (string memory) {
    return string(
            abi.encodePacked(
              '{"trait_type": "Data Length", "value":', props.length.toString(), '}'
            )
          );
  }
}