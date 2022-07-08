// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";

contract RendererRegistry {

    mapping(uint => address) public idToAddress;
    mapping(address => uint) public addressToId;

    uint public idCounter = 0;

    constructor (
    ) {
    } 

    event RegisteredRenderer(
      uint id,
      address renderer,
      uint propsSize,
      string additionalMetadataURI
    );

    function registerRenderer(address _renderer) public {
      idCounter++;
      IRenderer renderer = IRenderer(_renderer);
      require(renderer.supportsInterface(type(IRenderer).interfaceId), "Does not abide to IRenderer spec");
      require(addressToId[_renderer] == 0, "Already registered");
      idToAddress[idCounter] = _renderer;
      addressToId[_renderer] = idCounter;
      emit RegisteredRenderer(idCounter, _renderer, renderer.propsSize(), renderer.additionalMetadataURI());
    }

    function editRenderer(address _oldRenderer, address _renderer) public {
      IRenderer oldRenderer = IRenderer(_oldRenderer);
      require(oldRenderer.owner() == msg.sender, "Not owner of old renderer");
      IRenderer renderer = IRenderer(_renderer);
      uint rendererId = addressToId[_oldRenderer]; 
      require(rendererId != 0, "Old renderer not registered.");
      require(addressToId[_renderer] == 0, "New renderer already registered");
      require(renderer.supportsInterface(type(IRenderer).interfaceId), "Does not abide to IRenderer spec");
      idToAddress[rendererId] = _renderer;
      addressToId[_renderer] = rendererId;
      emit RegisteredRenderer(rendererId, _renderer, renderer.propsSize(), renderer.additionalMetadataURI());
    }

}