// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IRenderer.sol';
import '../libraries/SvgUtils.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/AbsBrainFuckConstants.sol';

contract DotMatrixRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  uint256 public constant RADIUS_MIN = 4;
  uint256 public constant RADIUS_MAX = 16;

  string circlePrefix = '<circle fill="#000" ';
  string circleSuffix = '" />';

  string[256] circles = [
    'cy="60" cx="60"',
    'cy="60" cx="90"',
    'cy="60" cx="120"',
    'cy="60" cx="150"',
    'cy="60" cx="180"',
    'cy="60" cx="210"',
    'cy="60" cx="240"',
    'cy="60" cx="270"',
    'cy="60" cx="300"',
    'cy="60" cx="330"',
    'cy="60" cx="360"',
    'cy="60" cx="390"',
    'cy="60" cx="420"',
    'cy="60" cx="450"',
    'cy="60" cx="480"',
    'cy="60" cx="510"',
    'cy="90" cx="60"',
    'cy="90" cx="90"',
    'cy="90" cx="120"',
    'cy="90" cx="150"',
    'cy="90" cx="180"',
    'cy="90" cx="210"',
    'cy="90" cx="240"',
    'cy="90" cx="270"',
    'cy="90" cx="300"',
    'cy="90" cx="330"',
    'cy="90" cx="360"',
    'cy="90" cx="390"',
    'cy="90" cx="420"',
    'cy="90" cx="450"',
    'cy="90" cx="480"',
    'cy="90" cx="510"',
    'cy="120" cx="60"',
    'cy="120" cx="90"',
    'cy="120" cx="120"',
    'cy="120" cx="150"',
    'cy="120" cx="180"',
    'cy="120" cx="210"',
    'cy="120" cx="240"',
    'cy="120" cx="270"',
    'cy="120" cx="300"',
    'cy="120" cx="330"',
    'cy="120" cx="360"',
    'cy="120" cx="390"',
    'cy="120" cx="420"',
    'cy="120" cx="450"',
    'cy="120" cx="480"',
    'cy="120" cx="510"',
    'cy="150" cx="60"',
    'cy="150" cx="90"',
    'cy="150" cx="120"',
    'cy="150" cx="150"',
    'cy="150" cx="180"',
    'cy="150" cx="210"',
    'cy="150" cx="240"',
    'cy="150" cx="270"',
    'cy="150" cx="300"',
    'cy="150" cx="330"',
    'cy="150" cx="360"',
    'cy="150" cx="390"',
    'cy="150" cx="420"',
    'cy="150" cx="450"',
    'cy="150" cx="480"',
    'cy="150" cx="510"',
    'cy="180" cx="60"',
    'cy="180" cx="90"',
    'cy="180" cx="120"',
    'cy="180" cx="150"',
    'cy="180" cx="180"',
    'cy="180" cx="210"',
    'cy="180" cx="240"',
    'cy="180" cx="270"',
    'cy="180" cx="300"',
    'cy="180" cx="330"',
    'cy="180" cx="360"',
    'cy="180" cx="390"',
    'cy="180" cx="420"',
    'cy="180" cx="450"',
    'cy="180" cx="480"',
    'cy="180" cx="510"',
    'cy="210" cx="60"',
    'cy="210" cx="90"',
    'cy="210" cx="120"',
    'cy="210" cx="150"',
    'cy="210" cx="180"',
    'cy="210" cx="210"',
    'cy="210" cx="240"',
    'cy="210" cx="270"',
    'cy="210" cx="300"',
    'cy="210" cx="330"',
    'cy="210" cx="360"',
    'cy="210" cx="390"',
    'cy="210" cx="420"',
    'cy="210" cx="450"',
    'cy="210" cx="480"',
    'cy="210" cx="510"',
    'cy="240" cx="60"',
    'cy="240" cx="90"',
    'cy="240" cx="120"',
    'cy="240" cx="150"',
    'cy="240" cx="180"',
    'cy="240" cx="210"',
    'cy="240" cx="240"',
    'cy="240" cx="270"',
    'cy="240" cx="300"',
    'cy="240" cx="330"',
    'cy="240" cx="360"',
    'cy="240" cx="390"',
    'cy="240" cx="420"',
    'cy="240" cx="450"',
    'cy="240" cx="480"',
    'cy="240" cx="510"',
    'cy="270" cx="60"',
    'cy="270" cx="90"',
    'cy="270" cx="120"',
    'cy="270" cx="150"',
    'cy="270" cx="180"',
    'cy="270" cx="210"',
    'cy="270" cx="240"',
    'cy="270" cx="270"',
    'cy="270" cx="300"',
    'cy="270" cx="330"',
    'cy="270" cx="360"',
    'cy="270" cx="390"',
    'cy="270" cx="420"',
    'cy="270" cx="450"',
    'cy="270" cx="480"',
    'cy="270" cx="510"',
    'cy="300" cx="60"',
    'cy="300" cx="90"',
    'cy="300" cx="120"',
    'cy="300" cx="150"',
    'cy="300" cx="180"',
    'cy="300" cx="210"',
    'cy="300" cx="240"',
    'cy="300" cx="270"',
    'cy="300" cx="300"',
    'cy="300" cx="330"',
    'cy="300" cx="360"',
    'cy="300" cx="390"',
    'cy="300" cx="420"',
    'cy="300" cx="450"',
    'cy="300" cx="480"',
    'cy="300" cx="510"',
    'cy="330" cx="60"',
    'cy="330" cx="90"',
    'cy="330" cx="120"',
    'cy="330" cx="150"',
    'cy="330" cx="180"',
    'cy="330" cx="210"',
    'cy="330" cx="240"',
    'cy="330" cx="270"',
    'cy="330" cx="300"',
    'cy="330" cx="330"',
    'cy="330" cx="360"',
    'cy="330" cx="390"',
    'cy="330" cx="420"',
    'cy="330" cx="450"',
    'cy="330" cx="480"',
    'cy="330" cx="510"',
    'cy="360" cx="60"',
    'cy="360" cx="90"',
    'cy="360" cx="120"',
    'cy="360" cx="150"',
    'cy="360" cx="180"',
    'cy="360" cx="210"',
    'cy="360" cx="240"',
    'cy="360" cx="270"',
    'cy="360" cx="300"',
    'cy="360" cx="330"',
    'cy="360" cx="360"',
    'cy="360" cx="390"',
    'cy="360" cx="420"',
    'cy="360" cx="450"',
    'cy="360" cx="480"',
    'cy="360" cx="510"',
    'cy="390" cx="60"',
    'cy="390" cx="90"',
    'cy="390" cx="120"',
    'cy="390" cx="150"',
    'cy="390" cx="180"',
    'cy="390" cx="210"',
    'cy="390" cx="240"',
    'cy="390" cx="270"',
    'cy="390" cx="300"',
    'cy="390" cx="330"',
    'cy="390" cx="360"',
    'cy="390" cx="390"',
    'cy="390" cx="420"',
    'cy="390" cx="450"',
    'cy="390" cx="480"',
    'cy="390" cx="510"',
    'cy="420" cx="60"',
    'cy="420" cx="90"',
    'cy="420" cx="120"',
    'cy="420" cx="150"',
    'cy="420" cx="180"',
    'cy="420" cx="210"',
    'cy="420" cx="240"',
    'cy="420" cx="270"',
    'cy="420" cx="300"',
    'cy="420" cx="330"',
    'cy="420" cx="360"',
    'cy="420" cx="390"',
    'cy="420" cx="420"',
    'cy="420" cx="450"',
    'cy="420" cx="480"',
    'cy="420" cx="510"',
    'cy="450" cx="60"',
    'cy="450" cx="90"',
    'cy="450" cx="120"',
    'cy="450" cx="150"',
    'cy="450" cx="180"',
    'cy="450" cx="210"',
    'cy="450" cx="240"',
    'cy="450" cx="270"',
    'cy="450" cx="300"',
    'cy="450" cx="330"',
    'cy="450" cx="360"',
    'cy="450" cx="390"',
    'cy="450" cx="420"',
    'cy="450" cx="450"',
    'cy="450" cx="480"',
    'cy="450" cx="510"',
    'cy="480" cx="60"',
    'cy="480" cx="90"',
    'cy="480" cx="120"',
    'cy="480" cx="150"',
    'cy="480" cx="180"',
    'cy="480" cx="210"',
    'cy="480" cx="240"',
    'cy="480" cx="270"',
    'cy="480" cx="300"',
    'cy="480" cx="330"',
    'cy="480" cx="360"',
    'cy="480" cx="390"',
    'cy="480" cx="420"',
    'cy="480" cx="450"',
    'cy="480" cx="480"',
    'cy="480" cx="510"',
    'cy="510" cx="60"',
    'cy="510" cx="90"',
    'cy="510" cx="120"',
    'cy="510" cx="150"',
    'cy="510" cx="180"',
    'cy="510" cx="210"',
    'cy="510" cx="240"',
    'cy="510" cx="270"',
    'cy="510" cx="300"',
    'cy="510" cx="330"',
    'cy="510" cx="360"',
    'cy="510" cx="390"',
    'cy="510" cx="420"',
    'cy="510" cx="450"',
    'cy="510" cx="480"',
    'cy="510" cx="510"'
  ];

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
    return 256;
  }

  function additionalMetadataURI()
    external
    pure
    override
    returns (string memory)
  {
    return 'ipfs://bafkreicmtcd322kc6bfranu4nqipmpj7n2k3sc3btmuhgs6os3nar2xx6m';
  }

  function name() public pure override returns (string memory) {
    return 'Dot Matrix';
  }

  function renderType() external pure override returns (string memory) {
    return AbsBrainFuckConstants.IMAGE_RENDER_TYPE;
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    string memory content = '';
    for (uint256 i = 0; i < 256; ++i) {
      content = string(
        abi.encodePacked(
          content,
          circlePrefix,
          circles[i],
          ' r="',
          SvgUtils.toDecimalString(
            SvgUtils.lerpWithDecimals(RADIUS_MIN, RADIUS_MAX, props[i])
          ),
          circleSuffix
        )
      );
    }

    return
      abi.encodePacked(
        '<svg xmlns="http://www.w3.org/2000/svg" width="570" height="570" style="background:#F1F1F1">',
        content,
        '</svg>'
      );
  }

  function render(bytes calldata props)
    external
    view
    override
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          'data:image/svg+xml;base64,',
          Base64.encode(renderRaw(props))
        )
      );
  }
}
