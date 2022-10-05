// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IDataStorage.sol';
import '../interfaces/IRenderer.sol';
import '../libraries/BytesUtils.sol';
import '../libraries/BytesUtils.sol';
import '../vms/BrainFuckVM.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/ERC721ZUtils.sol';
import '../storage/KeyDataStorage.sol';
import '../tokens/ERC721Z.sol';

contract AbsBrainFuckMetadataRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  KeyDataStorage configStorage;

  struct AbsBrainFuckMetadataConfig {
    address vm;
    address outputRenderer;
    bytes code;
    bytes input;
  }

  constructor(address _configStorage) {
    configStorage = KeyDataStorage(_configStorage);
  }

  function encodeConfig(AbsBrainFuckMetadataConfig memory config)
    public
    pure
    returns (bytes memory)
  {
    return
      abi.encodePacked(
        config.vm,
        config.outputRenderer,
        uint32(config.input.length),
        config.input,
        config.code
      );
  }

  function decodeConfig(bytes memory encodedConfig)
    public
    pure
    returns (AbsBrainFuckMetadataConfig memory config)
  {
    config.vm = BytesUtils.toAddress(encodedConfig, 0);
    config.outputRenderer = BytesUtils.toAddress(encodedConfig, 20);
    uint32 inputLength = BytesUtils.toUint32(encodedConfig, 40);
    config.input = BytesUtils.slice(encodedConfig, 44, inputLength);
    config.code = BytesUtils.slice(
      encodedConfig,
      44 + inputLength,
      encodedConfig.length - 44 - inputLength
    );
  }

  function addMetadataConfig(
    address nftAddr,
    AbsBrainFuckMetadataConfig memory config
  ) public {
    ERC721Z nft = ERC721Z(nftAddr);
    require(
      msg.sender == nft.owner(),
      'AbsBrainFuckMetadataRenderer: Only owner of nft can add config for nft'
    );
    uint256[] memory keys = new uint256[](1);
    bytes[] memory data = new bytes[](1);
    keys[0] = uint256(bytes32(bytes20(nftAddr)));
    data[0] = encodeConfig(config);
    configStorage.batchAddKeyedData(keys, data);
  }

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
    return 'ipfs://TODO';
  }

  function renderType() external pure override returns (string memory) {
    return ERC721ZUtils.METADATA_RENDER_TYPE;
  }

  function name() public pure override returns (string memory) {
    return 'AbsBrainFuckMetadata';
  }

  function getTokenSeed(
    bytes32 seed,
    uint256 tokenId,
    bytes memory constants
  ) public pure returns (bytes memory) {
    return
      abi.encodePacked(constants, keccak256(abi.encodePacked(seed, tokenId)));
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    (address nftAddr, uint256 tokenId, bytes32 seed) = ERC721ZUtils
      .decodeMetadataProps(props);
    ERC721Z nft = ERC721Z(nftAddr);

    AbsBrainFuckMetadataConfig memory config = decodeConfig(
      configStorage.indexToData(uint256(bytes32(bytes20(nftAddr))))
    );

    bytes memory tokenSeed = getTokenSeed(seed, tokenId, config.input);
    IVirtualMachine vm = IVirtualMachine(config.vm);
    IRenderer renderer = IRenderer(config.outputRenderer);

    bytes memory rendererProps = vm.run(config.code, tokenSeed);

    string[] memory metadata = new string[](4);

    string memory renderedOutput = renderer.render(rendererProps);
    metadata[0] = ERC721ZUtils.keyValue(
      renderer.renderType(),
      ERC721ZUtils.stringWrap(renderedOutput)
    );

    metadata[1] = ERC721ZUtils.keyValue(
      'name',
      ERC721ZUtils.stringWrap(
        string(abi.encodePacked(nft.name(), ' #', tokenId.toString()))
      )
    );

    metadata[2] = ERC721ZUtils.keyValue(
      'description',
      ERC721ZUtils.stringWrap(string(config.code))
    );

    string[] memory attributes = new string[](2);
    attributes[0] = ERC721ZUtils.getBaseAttributeObject(
      'Renderer',
      ERC721ZUtils.stringWrap(renderer.name()),
      ''
    );

    attributes[1] = ERC721ZUtils.getBaseAttributeObject(
      'Language',
      ERC721ZUtils.stringWrap(vm.name()),
      ''
    );

    metadata[3] = ERC721ZUtils.keyValue(
      'attributes',
      ERC721ZUtils.array(attributes)
    );

    return bytes(ERC721ZUtils.delimit(metadata));
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
          ERC721ZUtils.JSON_DATA_BASE_64_PREFIX,
          Base64.encode(renderRaw(props))
        )
      );
  }
}
