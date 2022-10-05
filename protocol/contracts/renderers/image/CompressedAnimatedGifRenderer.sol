// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../../libraries/SSTORE2Map.sol';
import '../../libraries/BytesUtils.sol';
import '../../interfaces/IRenderer.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../../libraries/ERC721ZUtils.sol';

contract CompressedAnimatedGifRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  IRenderer animatedGifImageRenderer;

  uint256 public maxConfigurationIndex = 1;

  uint256 public constant MAX_NUM_CONFIGURATIONS = 0xFFFFFFFF;

  uint256 public constant WIDTH_INDEX = 0;
  uint256 public constant HEIGHT_INDEX = 1;
  uint256 public constant COLOR_CONFIGURATION_INDEX = 2;
  uint256 public constant COMPRESSED_DATA_MIN_INDEX = 128;
  uint256 public constant IMAGE_DATA_START_INDEX = 6;

  event AddedConfiguration(uint256 index);

  constructor(address _animatedGifImageRenderer) {
    animatedGifImageRenderer = IRenderer(_animatedGifImageRenderer);
  }

  function owner() public view override(Ownable, IRenderer) returns (address) {
    return super.owner();
  }

  function name() public pure override returns (string memory) {
    return 'CompressedAnimatedGif';
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

  function batchAddColorTables(bytes[] memory colorTables)
    public
    returns (uint256)
  {
    for (uint256 i = 0; i < colorTables.length; ++i) {
      require(
        colorTables[i].length % 3 == 0,
        'colors must come in r,g,b tuples'
      );
      SSTORE2Map.write(
        bytes32(maxConfigurationIndex),
        abi.encodePacked(uint8(colorTables[i].length / 3), colorTables[i])
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

  function getColorTable(uint256 index) public view returns (bytes memory) {
    return SSTORE2Map.read(bytes32(index));
  }

  function convertProps(bytes calldata props)
    public
    pure
    returns (bytes memory output)
  {
    uint256 frameDataSize = BytesUtils.toUint8(props, WIDTH_INDEX) *
      BytesUtils.toUint8(props, HEIGHT_INDEX);

    bytes memory frame = new bytes(frameDataSize);
    uint256 frameIndex = BytesUtils.toUint16(props, IMAGE_DATA_START_INDEX);
    bytes1 lastVal = 0;
    for (uint256 i = IMAGE_DATA_START_INDEX + 2; i < props.length; ++i) {
      bytes1 val = props[i];
      uint256 intVal = uint8(val);
      if (intVal < COMPRESSED_DATA_MIN_INDEX) {
        // stores val into frame at index
        frame[frameIndex] = val;
        lastVal = val;
        frameIndex++;
      } else if (intVal == COMPRESSED_DATA_MIN_INDEX) {
        // denotes a new frame
        output = abi.encodePacked(output, frame);
        frame = new bytes(frameDataSize);
        i++;
        frameIndex = BytesUtils.toUint16(props, i);
        i++;
      } else {
        // denotes duping the last known val x times
        uint256 qt = intVal - COMPRESSED_DATA_MIN_INDEX;
        for (uint256 ct = 0; ct < qt; ct++) {
          frame[frameIndex + ct] = lastVal;
        }
        frameIndex += qt;
      }
    }
    output = abi.encodePacked(output, frame);
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    return
      animatedGifImageRenderer.renderRaw(
        abi.encodePacked(
          props[WIDTH_INDEX],
          props[HEIGHT_INDEX],
          SSTORE2Map.read(
            bytes32(
              uint256(BytesUtils.toUint32(props, COLOR_CONFIGURATION_INDEX))
            )
          ),
          convertProps(props)
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
      animatedGifImageRenderer.render(
        abi.encodePacked(
          props[WIDTH_INDEX],
          props[HEIGHT_INDEX],
          SSTORE2Map.read(
            bytes32(
              uint256(BytesUtils.toUint32(props, COLOR_CONFIGURATION_INDEX))
            )
          ),
          convertProps(props)
        )
      );
  }
}
