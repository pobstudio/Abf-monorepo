// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '@openzeppelin/contracts/utils/Strings.sol';
import './BytesUtils.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

library ERC721ZUtils {
  // commonly used nft metadata keywords NOTE: keys can be used in IRenderer rendererType function to denote the expected use of render output
  string public constant NAME_KEY = 'name';
  string public constant DESCRIPTION_KEY = 'description';
  string public constant ATTRIBUTES_KEY = 'attributes';
  string public constant BACKGROUND_COLOR_KEY = 'background_color';
  string public constant ANIMATION_URL_KEY = 'animation_url';
  string public constant EXTERNAL_URL_KEY = 'external_url';
  string public constant IMAGE_KEY = 'image';
  string public constant IMAGE_DATA_KEY = 'image_data';

  // base64 encoded data prefixes
  string public constant JSON_DATA_BASE_64_PREFIX =
    'data:application/json;base64,';
  string public constant SVG_DATA_BASE_64_PREFIX = 'data:image/svg+xml;base64,';
  string public constant GIF_DATA_BASE_64_PREFIX = 'data:image/svg+xml;base64,';
  // renderer specific renderer types
  string public constant MIDDLEWARE_RENDER_TYPE = 'middleware';
  string public constant METADATA_RENDER_TYPE = 'metadata';

  string constant JSON_DELIMITER = ',';
  string constant VALUE_KEY = 'value';
  string constant TRAIT_TYPE_KEY = 'trait_type';
  string constant MAX_VALUE_KEY = 'max_value';
  string constant DISPLAY_TYPE_KEY = 'display_type';

  string constant BOOST_NUMBER_DISPLAY_TYPE = 'boost_number';
  string constant BOOST_PERCENTAGE_DISPLAY_TYPE = 'boost_percentage';
  string constant NUMBER_DISPLAY_TYPE = 'number';
  string constant DATE_DISPLAY_TYPE = 'date';

  function decodeContractMetadataProps(bytes memory props)
    public
    pure
    returns (address nft)
  {
    nft = BytesUtils.toAddress(props, 0);
  }

  function decodeMetadataProps(bytes memory props)
    public
    pure
    returns (
      address nft,
      uint256 tokenId,
      bytes32 seed
    )
  {
    nft = BytesUtils.toAddress(props, 0);
    tokenId = BytesUtils.toUint256(props, 20);
    seed = bytes32(BytesUtils.toUint256(props, 20 + 32));
  }

  function encodeJson(string memory content)
    public
    pure
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          'data:application/json;base64,',
          Base64.encode(bytes(content))
        )
      );
  }

  function object(string[] memory content) public pure returns (string memory) {
    return string(abi.encodePacked('{', delimit(content), '}'));
  }

  function array(string[] memory content) public pure returns (string memory) {
    return string(abi.encodePacked('[', delimit(content), ']'));
  }

  function keyValue(string memory key, string memory value)
    public
    pure
    returns (string memory)
  {
    return string(abi.encodePacked('"', key, '":', value));
  }

  function stringWrap(string memory value) public pure returns (string memory) {
    return string(abi.encodePacked('"', value, '"'));
  }

  function delimit(string[] memory values) public pure returns (string memory) {
    bytes memory delimitedValues = '';
    for (uint256 i = 0; i < values.length; ++i) {
      delimitedValues = abi.encodePacked(
        delimitedValues,
        i == 0 ? '' : JSON_DELIMITER,
        values[i]
      );
    }
    return string(delimitedValues);
  }

  function getBaseAttributeObject(
    string memory traitType,
    string memory value,
    string memory extra
  ) public pure returns (string memory) {
    string[] memory components = new string[](3);
    components[0] = keyValue(VALUE_KEY, value);
    components[1] = keyValue(TRAIT_TYPE_KEY, stringWrap(traitType));
    components[2] = extra;

    return object(components);
  }

  function getAttributeObject(string memory traitType, string memory value)
    public
    pure
    returns (string memory)
  {
    return getBaseAttributeObject(traitType, value, '');
  }

  function getAttributeObjectWithMaxValue(
    string memory traitType,
    string memory value,
    string memory maxValue
  ) public pure returns (string memory) {
    return
      getBaseAttributeObject(
        traitType,
        value,
        keyValue(MAX_VALUE_KEY, maxValue)
      );
  }

  function getAttributeObjectWithDisplayType(
    string memory traitType,
    string memory value,
    string memory displayType
  ) public pure returns (string memory) {
    return
      getBaseAttributeObject(
        traitType,
        value,
        keyValue(DISPLAY_TYPE_KEY, displayType)
      );
  }

  function getAttributeObjectWithDisplayTypeAndMaxValue(
    string memory traitType,
    string memory value,
    string memory displayType,
    string memory maxValue
  ) public pure returns (string memory) {
    string[] memory components = new string[](2);
    components[0] = keyValue(DISPLAY_TYPE_KEY, stringWrap(displayType));
    components[1] = keyValue(MAX_VALUE_KEY, maxValue);
    return getBaseAttributeObject(traitType, value, delimit(components));
  }
}
