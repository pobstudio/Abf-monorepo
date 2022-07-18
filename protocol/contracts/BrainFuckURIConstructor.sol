// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./BrainFuckVM.sol";
import "./interfaces/IRenderer.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

library BrainFuckURIConstructor {
  
    using Strings for uint256;

    function tokenSeed(bytes memory seed, uint256 tokenId, bytes32 constants) public pure returns (bytes memory) {
      return abi.encodePacked(constants, keccak256(abi.encodePacked(seed, tokenId)));
    }

    function debug(bytes memory seed, uint256 tokenId) public pure returns (bytes memory) {
      return abi.encodePacked(seed, tokenId);
    }

    function contractURI(string memory name, address nft) public pure returns (string memory) {
      return string(
        abi.encodePacked(
          'data:application/json;base64,',
          Base64.encode(
            abi.encodePacked( 
            '{"name":"', name, '", "description": "On-chain generative art written in the esoteric programming language BrainFuck.", "external_link": "https://abf.dev/nft/', uint256(uint160(nft)).toHexString(), '", "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxMjguNSIgY3k9IjEyOC41IiByPSIyMC41IiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K" }'
            )
          )
        )
      );
    }

    function tokenURI(uint256 tokenId, string memory name, bytes memory seed, bytes32 constants, bytes memory code, IRenderer renderer) public view returns (string memory) {
      string memory tokenName = string(abi.encodePacked(name, " #", tokenId.toString()));
      bytes memory props = BrainFuckVM.run(code, tokenSeed(seed, tokenId, constants));

      string memory image = renderer.render(props);
      
      return string(
            abi.encodePacked(
                'data:application/json;base64,', 
                Base64.encode(
                    abi.encodePacked(
                        '{"name":"',
                        tokenName,
                        '","description":"', code,'", "', renderer.renderAttributeKey(), '": "',
                        image,
                        '", "aspect_ratio":1, "attributes": [', renderer.attributes(props), '{"trait_type":"Renderer","value":"',
                          uint256(uint160(address(renderer))).toHexString(),
                        '"}]}'
                    )
                )
            )
        ); 
    }
}