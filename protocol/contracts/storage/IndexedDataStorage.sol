// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../libraries/SSTORE2Map.sol';

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/BytesUtils.sol';
import '../interfaces/IDataStorage.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

contract IndexedDataStorage is IDataStorage, Ownable, ERC165 {
  uint256 public constant MAX_UINT_16 = 0xFFFF;

  // index starts from zero, useful to use the 0th index as a empty case.
  uint16 public currentMaxIndex = 0;

  constructor() {}

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC165, IERC165)
    returns (bool)
  {
    return
      interfaceId == type(IDataStorage).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function batchAddData(bytes[] calldata data) public onlyOwner {
    for (uint16 i = 0; i < data.length; ++i) {
      SSTORE2Map.write(bytes32(uint256(currentMaxIndex + i)), data[i]);
    }
    currentMaxIndex += uint16(data.length);
    require(
      currentMaxIndex <= MAX_UINT_16,
      'DataStorage: Exceeds storage limit'
    );
  }

  function indexToData(uint256 index)
    public
    view
    override
    returns (bytes memory)
  {
    return SSTORE2Map.read(bytes32(index));
  }
}
