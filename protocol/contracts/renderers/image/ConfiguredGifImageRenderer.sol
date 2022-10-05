// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../../libraries/SSTORE2Map.sol';
import '../../libraries/BytesUtils.sol';
import '../../interfaces/IRenderer.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../../libraries/ERC721ZUtils.sol';

contract ConfiguredGifImageRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  IRenderer gifImageRenderer;

  uint256 public maxConfigurationIndex = 1;

  uint256 public constant MAX_NUM_CONFIGURATIONS = 0xFFFFFFFF;

  struct Configuration {
    uint8 width;
    uint8 height;
    bytes colors;
  }

  event AddedConfiguration(uint256 index);

  constructor(address _gifImageRenderer) {
    gifImageRenderer = IRenderer(_gifImageRenderer);
  }

  function owner() public view override(Ownable, IRenderer) returns (address) {
    return super.owner();
  }

  function addConfiguration(Configuration memory config)
    public
    returns (uint256)
  {
    require(config.colors.length % 3 == 0, 'colors must come in r,g,b tuples');
    SSTORE2Map.write(
      bytes32(maxConfigurationIndex),
      abi.encodePacked(
        config.width,
        config.height,
        uint8(config.colors.length / 3),
        config.colors
      )
    );
    emit AddedConfiguration(maxConfigurationIndex);
    maxConfigurationIndex++;
    require(
      maxConfigurationIndex <= MAX_NUM_CONFIGURATIONS,
      'Max number of configurations allowed.'
    );
    return maxConfigurationIndex;
  }

  function batchAddConfiguration(Configuration[] memory configs)
    public
    returns (uint256)
  {
    for (uint256 i = 0; i < configs.length; ++i) {
      Configuration memory config = configs[i];
      require(
        config.colors.length % 3 == 0,
        'colors must come in r,g,b tuples'
      );
      SSTORE2Map.write(
        bytes32(maxConfigurationIndex),
        abi.encodePacked(
          config.width,
          config.height,
          uint8(config.colors.length / 3),
          config.colors
        )
      );
      emit AddedConfiguration(maxConfigurationIndex);
      maxConfigurationIndex++;
      require(
        maxConfigurationIndex <= MAX_NUM_CONFIGURATIONS,
        'Max number of configurations allowed.'
      );
    }
    return maxConfigurationIndex;
  }

  function getConfiguration(uint256 index) public view returns (bytes memory) {
    return SSTORE2Map.read(bytes32(index));
  }

  function name() public pure override returns (string memory) {
    return 'ConfiguredGifImage';
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
    return 'ipfs://bafkreihcz67yvvlotbn4x3p35wdbpde27rldihlzoqg2klbme7u6lehxna';
  }

  function renderType() external pure override returns (string memory) {
    return ERC721ZUtils.IMAGE_DATA_KEY;
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    return
      gifImageRenderer.renderRaw(
        abi.encodePacked(
          SSTORE2Map.read(bytes32(uint256(BytesUtils.toUint32(props, 0)))),
          props[4:props.length]
        )
      );
  }

  function render(bytes calldata props)
    external
    view
    override
    returns (string memory)
  {
    return
      gifImageRenderer.render(
        abi.encodePacked(
          SSTORE2Map.read(bytes32(uint256(BytesUtils.toUint32(props, 0)))),
          props[4:props.length]
        )
      );
  }
}
