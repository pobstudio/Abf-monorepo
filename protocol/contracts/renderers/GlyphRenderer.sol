// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "../interfaces/IRenderer.sol";
import "../libraries/SvgUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract GlyphRenderer is IRenderer, Ownable, ERC165 {
  using Strings for uint256;  
  
  // string internal nftName = "Autoglyphs";
  // string internal nftSymbol = "☵";

  ///////////////////
  //// GENERATOR ////
  ///////////////////

  int constant ONE = int(0x100000000);
  uint constant USIZE = 64;
  int constant SIZE = int(USIZE);
  int constant HALF_SIZE = SIZE / int(2);

  int constant SCALE = int(0x1b81a81ab1a81a823);
  int constant HALF_SCALE = SCALE / int(2);

  // 0x2E = .
  // 0x4F = O
  // 0x2B = +
  // 0x58 = X
  // 0x7C = |
  // 0x2D = -
  // 0x5C = \
  // 0x2F = /
  // 0x23 = # \|#0

  function abs(int n) internal pure returns (int) {
      if (n >= 0) return n;
      return -n;
  }

  function getScheme(uint a) internal pure returns (uint8) {
      uint index = a % 83;
      uint8 scheme;
      if (index < 20) {
          scheme = 1;
      } else if (index < 35) {
          scheme = 2;
      } else if (index < 48) {
          scheme = 3;
      } else if (index < 59) {
          scheme = 4;
      } else if (index < 68) {
          scheme = 5;
      } else if (index < 73) {
          scheme = 6;
      } else if (index < 77) {
          scheme = 7;
      } else if (index < 80) {
          scheme = 8;
      } else if (index < 82) {
          scheme = 9;
      } else {
          scheme = 10;
      }
      return scheme;
  }

  /* * ** *** ***** ******** ************* ******** ***** *** ** * */

  // The following code generates art.

  function draw(bytes calldata props) public pure returns (bytes memory) {
      uint a = uint(keccak256(abi.encodePacked(props)));
      bytes memory output = new bytes(USIZE * (USIZE));
      uint c;
      int x = 0;
      int y = 0;
      uint v = 0;
      uint value = 0;
      uint mod = (a % 11) + 5;
      bytes5 symbols;
      uint idToSymbolScheme = 7; // getScheme(a);
      if (idToSymbolScheme == 0) {
          revert();
      } else if (idToSymbolScheme == 1) {
          symbols = 0x2E582F5C2E; // X/\
      } else if (idToSymbolScheme == 2) {
          symbols = 0x2E2B2D7C2E; // +-|
      } else if (idToSymbolScheme == 3) {
          symbols = 0x2E2F5C2E2E; // /\
      } else if (idToSymbolScheme == 4) {
          symbols = 0x2E5C7C2D2F; // \|-/
      } else if (idToSymbolScheme == 5) {
          symbols = 0x2E4F7C2D2E; // O|-
      } else if (idToSymbolScheme == 6) {
          symbols = 0x2E5C5C2E2E; // \
      } else if (idToSymbolScheme == 7) {
          symbols = 0x2E237C2D2B; // #|-+
      } else if (idToSymbolScheme == 8) {
          symbols = 0x2E4F4F2E2E; // OO
      } else if (idToSymbolScheme == 9) {
          symbols = 0x2E232E2E2E; // #
      } else {
          symbols = 0x2E234F2E2E; // #O
      }
      for (int i = int(0); i < SIZE; i++) {
          y = (2 * (i - HALF_SIZE) + 1);
          if (a % 3 == 1) {
              y = -y;
          } else if (a % 3 == 2) {
              y = abs(y);
          }
          y = y * int(a);
          for (int j = int(0); j < SIZE; j++) {
              x = (2 * (j - HALF_SIZE) + 1);
              if (a % 2 == 1) {
                  x = abs(x);
              }
              x = x * int(a);
              v = uint(x * y / ONE) % mod;
              if (v < 5) {
                  value = uint8(bytes1(symbols[v]));
              } else {
                  value = 0x2E;
              }
              output[c] = bytes1(bytes32(value << 248));
              c++;
          }
      }
      return output;
  }

  function _generateHTML(bytes calldata props) internal pure returns (string memory) {
    bytes memory raw = draw(props);
    string memory output = '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" style="background:#ffffff">';
    for (uint i = 0; i < USIZE; i++) {
        for (uint j = 0; i < USIZE; i++) {
            uint index = i*64 + j;
            if (index >= raw.length) break;
            bytes1 symbol = raw[index];
            uint xtl = 115 + (j * 10);
            uint ytl = 115 + (i * 10);
            if (symbol == 0x2F) { // /
                output = string(abi.encodePacked(output,
                    '<line xmlns="http://www.w3.org/2000/svg" x1="',
                    Strings.toString(xtl),'" y1="',Strings.toString(ytl + 10),'" x2="',Strings.toString(xtl + 10),'" y2="',Strings.toString(ytl),
                    ' "style="stroke-width: 2.0; stroke: rgb(0,0,0); stroke-opacity: 1.0; stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)"/>'
                ));
            } else if (symbol == 0x5C) { // \
                output = string(abi.encodePacked(output,
                    '<line xmlns="http://www.w3.org/2000/svg" x1="',
                    Strings.toString(xtl + 10),'" y1="',Strings.toString(ytl + 10),'" x2="',Strings.toString(xtl),'" y2="',Strings.toString(ytl),
                    ' "style="stroke-width: 2.0; stroke: rgb(0,0,0); stroke-opacity: 1.0; stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)"/>'
                ));
            } else if (symbol == 0x7C) { // |
                output = string(abi.encodePacked(output,
                    '<line xmlns="http://www.w3.org/2000/svg" x1="',
                    Strings.toString(xtl + 5),'" y1="',Strings.toString(ytl),'" x2="',Strings.toString(xtl + 5),'" y2="',Strings.toString(ytl + 10),
                    ' "style="stroke-width: 2.0; stroke: rgb(0,0,0); stroke-opacity: 1.0; stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)"/>'
                ));
            }
            // } else if (symbol == 0x23) { // #
            //     output = string(abi.encodePacked(output,
            //         '<rect xmlns="http://www.w3.org/2000/svg" x="',
            //         Strings.toString(xtl),'" y="',Strings.toString(ytl),
            //         ' width="10" height="10" style="fill: rgb(0,0,0); fill-opacity: 1.0" transform="matrix(1,0,0,1,0,0)"/>'
            //     ));
            // } else if (symbol == 0x4F) { // O
            //     output = string(abi.encodePacked(output,
            //         '<ellipse xmlns="http://www.w3.org/2000/svg" cx="',
            //         Strings.toString(xtl + 5),'" cy="',Strings.toString(ytl + 5),
            //         ' rx="5" ry="5" style="stroke-width: 2.0;stroke: rgb(0,0,0);stroke-opacity: 1.0;stroke-linecap: square; fill: none;" transform="matrix(1,0,0,1,0,0)"/>'
            //     ));
            // } else if (symbol == 0x2B) { // +
            //     output = string(abi.encodePacked(output,
            //         '<line xmlns="http://www.w3.org/2000/svg" x1="',
            //         Strings.toString(xtl + 5),'" y1="',Strings.toString(ytl),'" x2="',Strings.toString(xtl + 5),'" y2="',Strings.toString(ytl + 10),
            //         ' "style="stroke-width: 2.0; stroke: rgb(0,0,0); stroke-opacity: 1.0; stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)"/>',
            //         '<line xmlns="http://www.w3.org/2000/svg" x1="',
            //         Strings.toString(xtl),'" y1="',Strings.toString(ytl + 5),'" x2="',Strings.toString(xtl + 10),'" y2="',Strings.toString(ytl + 5),
            //         ' "style="stroke-width: 2.0; stroke: rgb(0,0,0); stroke-opacity: 1.0; stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)"/>'
            //     ));
            // } else if (symbol == 0x58) { // X
            //     output = string(abi.encodePacked(output,
            //         '<line xmlns="http://www.w3.org/2000/svg" x1="',
            //         Strings.toString(xtl),'" y1="',Strings.toString(ytl),'" x2="',Strings.toString(xtl + 10),'" y2="',Strings.toString(ytl + 10),
            //         ' "style="stroke-width: 2.0; stroke: rgb(0,0,0); stroke-opacity: 1.0; stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)"/>',
            //         '<line xmlns="http://www.w3.org/2000/svg" x1="',
            //         Strings.toString(xtl),'" y1="',Strings.toString(ytl + 10),'" x2="',Strings.toString(xtl + 10),'" y2="',Strings.toString(ytl),
            //         ' "style="stroke-width: 2.0; stroke: rgb(0,0,0); stroke-opacity: 1.0; stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)"/>'
            //     ));
            // }
        }
    }
    output = string(abi.encodePacked(output, '</svg>'));
    return output;
  }

  /////////////////// 
  //// IRenderer ////
  ///////////////////

  function owner() public override(Ownable, IRenderer) view returns (address) {
    return super.owner();
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IRenderer).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function propsSize() external override pure returns (uint256) {
    return 256;
  }
  
  function additionalMetadataURI() external override pure returns (string memory) {
    return "ipfs://bafkreihfszq76yxcmkux4xbvpx3pbdnrvo3aaporhfwft4xkvsno3ogzzq";
  }

  function renderAttributeKey() external override pure returns (string memory) {
    return "image";
  }
  
  // Render raw HTML code ex. (<svg></svg>)
  function renderRaw(bytes calldata props) external override pure returns (string memory) {
    return _generateHTML(props);
  }

  // Render base64-encoded HTML code ex.
  //   data: uri (data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw ...)
  function render(bytes calldata props) external override pure returns (string memory) {
    string memory prefix = 'data:image/svg+xml;base64,';
    string memory html = _generateHTML(props);
    string memory encodedHTML = Base64.encode(bytes(html));
    return string(abi.encodePacked(prefix, encodedHTML));
  }

  function attributes(bytes calldata props) external override pure returns (string memory) {
    uint i = 0;
    while(props[i] != 0x00) {
      i++;
    }
      return string(
            abi.encodePacked(
              '{"trait_type": "Data Length", "value":', i.toString(), '},'
            )
          );
  }
}
