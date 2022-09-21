// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

library AbsBrainFuckConstants {
  string public constant IMAGE_RENDER_TYPE = 'image';
  string public constant ANIMATION_RENDER_TYPE = 'animation_url';
  string public constant MIDDLEWARE_RENDER_TYPE = 'middleware';
  string public constant METADATA_RENDER_TYPE = 'metadata';
  string public constant ATTRIBUTES_RENDER_TYPE = 'attributes';

  string public constant DEFAULT_CONTRACT_DESCRIPTION =
    '"On-chain generative art using ABF Renderer protocol."';
  string public constant DEFAULT_CONTRACT_IMAGE =
    '"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxMjguNSIgY3k9IjEyOC41IiByPSIyMC41IiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K"';
}
