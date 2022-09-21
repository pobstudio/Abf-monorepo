// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IRenderer.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/AbsBrainFuckConstants.sol';

contract GifImageRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  bytes public constant GRAPHIC_CONTROL_EXTENSION = hex'21F9040100000000';
  bytes public constant IMAGE_DESCRIPTOR = hex'2C00000000800080000007';

  uint256 public IMAGE_DATA_CHUNK_SIZE = 126;

  uint256 public WIDTH_INDEX = 0;
  uint256 public HEIGHT_INDEX = 1;
  uint256 public NUM_COLORS_INDEX = 2;

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
    return 'ipfs://bafkreid63nuzy5wy4l42mevl73dvknxpxq35dwarj47gnmms754inbngra';
  }

  function renderType() external pure override returns (string memory) {
    return AbsBrainFuckConstants.IMAGE_RENDER_TYPE;
  }

  function name() public pure override returns (string memory) {
    return 'Single frame gif';
  }

  function getBestColorTableSize(uint8 numColors)
    internal
    pure
    returns (uint256)
  {
    if (numColors > 64) {
      return 128;
    }
    if (numColors > 32) {
      return 64;
    }
    if (numColors > 16) {
      return 32;
    }
    if (numColors > 8) {
      return 16;
    }
    if (numColors > 4) {
      return 8;
    }
    if (numColors > 2) {
      return 4;
    }
    return 2;
  }

  function logicalScreenDescriptor(uint8 numColors)
    internal
    pure
    returns (bytes1)
  {
    require(numColors < 128, 'Only a maximum of 127 colors allowed');
    if (numColors > 64) {
      return hex'F6';
    }
    if (numColors > 32) {
      return hex'F5';
    }
    if (numColors > 16) {
      return hex'F4';
    }
    if (numColors > 8) {
      return hex'F3';
    }
    if (numColors > 4) {
      return hex'F2';
    }
    if (numColors > 2) {
      return hex'F1';
    }
    return hex'F0';
  }

  function gifHeader(bytes calldata props)
    internal
    view
    returns (bytes memory)
  {
    return
      abi.encodePacked(
        hex'474946383961',
        props[WIDTH_INDEX],
        hex'00',
        props[HEIGHT_INDEX],
        hex'00',
        logicalScreenDescriptor(uint8(props[NUM_COLORS_INDEX]) + 1),
        hex'0000'
      );
  }

  function colorTable(bytes calldata props)
    internal
    view
    returns (bytes memory)
  {
    uint8 numColors = uint8(props[NUM_COLORS_INDEX]);
    bytes memory paddedZeros = new bytes(
      (getBestColorTableSize(numColors + 1) - numColors) * 3
    );
    return abi.encodePacked(props[3:3 + (numColors * 3)], paddedZeros);
  }

  function imageDescriptor(bytes calldata props)
    internal
    view
    returns (bytes memory)
  {
    return
      abi.encodePacked(
        hex'2C00000000',
        props[WIDTH_INDEX],
        hex'00',
        props[HEIGHT_INDEX],
        hex'000007'
      );
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    bytes memory imageData = '';
    for (
      uint256 i = (3 + uint8(props[NUM_COLORS_INDEX]) * 3);
      i < props.length;
      i += IMAGE_DATA_CHUNK_SIZE
    ) {
      uint256 end = i + IMAGE_DATA_CHUNK_SIZE;
      bytes memory chunk = props[i:(end > props.length ? props.length : end)];
      imageData = abi.encodePacked(
        imageData,
        uint8(chunk.length + (end > props.length ? 2 : 1)),
        hex'80',
        chunk
      );
    }
    return
      abi.encodePacked(
        gifHeader(props),
        colorTable(props),
        GRAPHIC_CONTROL_EXTENSION,
        imageDescriptor(props),
        imageData,
        hex'81003B'
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
          'data:image/gif;base64,',
          Base64.encode(renderRaw(props))
        )
      );
  }
}
