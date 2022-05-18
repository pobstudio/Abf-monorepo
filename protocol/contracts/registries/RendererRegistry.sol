// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";

contract RendererRegistry {

    mapping(uint => address) public idToAddress;
    mapping(address => uint) public addressToId;

    uint public idIndex = 0;

    constructor (
    ) {
    } 

    event RegisteredRenderer(
      uint id,
      address renderer,
      uint outSize,
      string additionalMetadataURI
    );

    function registerRenderer(address _renderer) public {
      idIndex++;
      IRenderer renderer = IRenderer(_renderer);
      require(renderer.supportsInterface(type(IRenderer).interfaceId), "Does not abide to IRenderer spec");
      require(addressToId[_renderer] == 0, "Already registered");
      idToAddress[idIndex] = _renderer;
      addressToId[_renderer] = idIndex;
      emit RegisteredRenderer(idIndex, _renderer, renderer.outSize(), renderer.additionalMetadataURI());
    }
}