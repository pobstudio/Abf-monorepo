// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import '../libraries/SSTORE2Map.sol';

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../libraries/BytesUtils.sol';
import '../interfaces/IDataStorage.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

contract KeyDataStorage is IDataStorage, Ownable, ERC165 {
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

  function batchAddKeyedData(uint256[] calldata keys, bytes[] calldata data)
    public
    onlyOwner
  {
    for (uint16 i = 0; i < data.length; ++i) {
      SSTORE2Map.write(bytes32(keys[i]), data[i]);
    }
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
