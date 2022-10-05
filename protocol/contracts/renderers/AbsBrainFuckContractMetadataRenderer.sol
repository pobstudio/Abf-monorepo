pragma solidity ^0.8.4;
import '../interfaces/IDataStorage.sol';
import '../interfaces/IRenderer.sol';
import '../libraries/BytesUtils.sol';
import '../libraries/BytesUtils.sol';
import '../vms/BrainFuckVM.sol';
import '../tokens/ERC721Z.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/ERC721ZUtils.sol';

contract AbsBrainFuckContractMetadataRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;

  string public constant DEFAULT_CONTRACT_DESCRIPTION =
    '"On-chain generative art using ABF Renderer protocol."';
  string public constant DEFAULT_CONTRACT_IMAGE =
    '"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxMjguNSIgY3k9IjEyOC41IiByPSIyMC41IiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K"';

  constructor() {}

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
    return 'AbsBrainFuckContractMetadata';
  }

  function renderRaw(bytes calldata props)
    public
    view
    override
    returns (bytes memory)
  {
    ERC721Z nft = ERC721Z(BytesUtils.toAddress(props, 0));

    string[] memory content = new string[](4);
    content[0] = ERC721ZUtils.keyValue(
      ERC721ZUtils.NAME_KEY,
      ERC721ZUtils.stringWrap(nft.name())
    );
    content[1] = ERC721ZUtils.keyValue(
      ERC721ZUtils.DESCRIPTION_KEY,
      DEFAULT_CONTRACT_DESCRIPTION
    );
    content[2] = ERC721ZUtils.keyValue(
      ERC721ZUtils.EXTERNAL_URL_KEY,
      string(
        abi.encodePacked(
          '"https://abf.dev/nft/',
          uint256(uint160(address(nft))).toHexString(),
          '"'
        )
      )
    );
    content[3] = ERC721ZUtils.keyValue(
      ERC721ZUtils.IMAGE_DATA_KEY,
      DEFAULT_CONTRACT_IMAGE
    );

    return bytes(ERC721ZUtils.encodeJson(ERC721ZUtils.object(content)));
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
