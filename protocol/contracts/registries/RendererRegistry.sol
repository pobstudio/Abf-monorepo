// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../interfaces/IRenderer.sol';

contract RendererRegistry {
  mapping(uint256 => address) public idToAddress;
  mapping(address => uint256) public addressToId;

  mapping(string => mapping(string => uint256)) public packages;
  mapping(string => address) public packageManager;

  uint256 public idCounter = 0;

  constructor() {}

  event RegisteredRenderer(
    uint256 id,
    address renderer,
    uint256 propsSize,
    string additionalMetadataURI
  );

  function editPackageByRenderer(
    string calldata packageName,
    address[] memory renderers
  ) public {
    require(
      packageManager[packageName] == msg.sender,
      'Only current manager can transfer'
    );
    uint256[] memory ids = new uint256[](renderers.length);
    string[] memory names = new string[](renderers.length);
    for (uint256 i = 0; i < ids.length; ++i) {
      ids[i] = addressToId[renderers[i]];
      names[i] = (IRenderer(renderers[i])).name();
    }
    _editPackage(packageName, names, ids);
  }

  function editPackageByNamesAndRenderers(
    string calldata packageName,
    string[] memory names,
    address[] memory renderers
  ) public {
    require(
      packageManager[packageName] == msg.sender,
      'Only current manager can transfer'
    );
    require(names.length == renderers.length, 'Names + Ids are mismatched');
    uint256[] memory ids = new uint256[](renderers.length);
    for (uint256 i = 0; i < ids.length; ++i) {
      ids[i] = addressToId[renderers[i]];
    }
    _editPackage(packageName, names, ids);
  }

  function editPackageByNamesAndIds(
    string calldata packageName,
    string[] memory names,
    uint256[] memory ids
  ) public {
    require(
      packageManager[packageName] == msg.sender,
      'Only current manager can transfer'
    );
    require(names.length == ids.length, 'Names + Ids are mismatched');
    _editPackage(packageName, names, ids);
  }

  function _editPackage(
    string calldata packageName,
    string[] memory names,
    uint256[] memory ids
  ) internal {
    for (uint256 i = 0; i < names.length; ++i) {
      packages[packageName][names[i]] = ids[i];
    }
  }

  function createPackage(string calldata packageName) public {
    require(packageManager[packageName] == address(0), 'Already created');
    packageManager[packageName] = msg.sender;
  }

  function transferPackageManager(
    string calldata packageName,
    address newManager
  ) public {
    require(
      packageManager[packageName] == msg.sender,
      'Only current manager can transfer'
    );
    packageManager[packageName] = newManager;
  }

  function registerRenderer(address _renderer) public {
    idCounter++;
    IRenderer renderer = IRenderer(_renderer);
    require(
      renderer.supportsInterface(type(IRenderer).interfaceId),
      'Does not abide to IRenderer spec'
    );
    require(addressToId[_renderer] == 0, 'Already registered');
    idToAddress[idCounter] = _renderer;
    addressToId[_renderer] = idCounter;
    emit RegisteredRenderer(
      idCounter,
      _renderer,
      renderer.propsSize(),
      renderer.additionalMetadataURI()
    );
  }

  function editRenderer(address _oldRenderer, address _renderer) public {
    IRenderer oldRenderer = IRenderer(_oldRenderer);
    require(oldRenderer.owner() == msg.sender, 'Not owner of old renderer');
    IRenderer renderer = IRenderer(_renderer);
    uint256 rendererId = addressToId[_oldRenderer];
    require(rendererId != 0, 'Old renderer not registered.');
    require(addressToId[_renderer] == 0, 'New renderer already registered');
    require(
      renderer.supportsInterface(type(IRenderer).interfaceId),
      'Does not abide to IRenderer spec'
    );
    idToAddress[rendererId] = _renderer;
    addressToId[_renderer] = rendererId;
    emit RegisteredRenderer(
      rendererId,
      _renderer,
      renderer.propsSize(),
      renderer.additionalMetadataURI()
    );
  }
}
