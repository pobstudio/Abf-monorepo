// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import './AbsBrainFuck.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import './interfaces/IRendererPayable.sol';

contract AbsBrainFuckMinter is Ownable, ReentrancyGuard {
  uint256 public constant MAX_MINTING_PER_TX = 6;

  uint256 public price;

  uint256 public rendererRoyaltyFraction;
  address public whitelistToken;

  bool public isActive;

  bool public isInit = false;

  AbsBrainFuck public abf;

  address public rendererRoyaltyTreasury;

  event ChangedIsActive(bool isActive);

  struct CreateAbsBrainFuckMinterConfig {
    uint256 price;
    uint96 rendererRoyaltyFraction;
    address whitelistToken;
  }

  constructor() {}

  function init(
    address owner,
    address _abf,
    CreateAbsBrainFuckMinterConfig memory config
  ) public {
    require(!isInit, 'NFT has already been initialized');
    isInit = true;
    _transferOwnership(owner);
    price = config.price;
    rendererRoyaltyFraction = config.rendererRoyaltyFraction;
    whitelistToken = config.whitelistToken;
    abf = AbsBrainFuck(_abf);
    setTreasury();
  }

  function setTreasury() public onlyOwner {
    if (abf.renderer().supportsInterface(type(IRendererPayable).interfaceId)) {
      IRendererPayable payableRenderer = IRendererPayable(
        address(abf.renderer())
      );
      bytes memory props = treasuryProps();
      try payableRenderer.createTreasury(props) returns (
        address createdTreasury
      ) {
        rendererRoyaltyTreasury = createdTreasury == address(0)
          ? payableRenderer.treasury(props)
          : createdTreasury;
      } catch (bytes memory) {
        rendererRoyaltyTreasury = payableRenderer.treasury(props);
      }
    } else {
      rendererRoyaltyTreasury = address(0);
    }
  }

  // to save on gas, we only pass ABF prefixes as it usually contains all the fee data
  function treasuryProps() public view returns (bytes memory) {
    return abf.propsPrefix();
  }

  function setWhitelistToken(address _whitelistToken) public onlyOwner {
    whitelistToken = _whitelistToken;
  }

  function setIsActive(bool _isActive) public onlyOwner {
    isActive = _isActive;
    emit ChangedIsActive(isActive);
  }

  modifier onlyIsActive() {
    require(isActive, 'minting needs to be active to mint');
    _;
  }

  modifier onlyPublicMintOrWhitelist() {
    require(
      whitelistToken == address(0) ||
        IERC721(whitelistToken).balanceOf(msg.sender) > 0,
      'not whitelisted'
    );
    _;
  }

  function mint(address to, uint256 numMints)
    public
    payable
    nonReentrant
    onlyIsActive
    onlyPublicMintOrWhitelist
  {
    require(
      numMints <= MAX_MINTING_PER_TX,
      'exceeded number of mint in single call'
    );
    abf.adminMint(to, numMints);
    uint256 totalPrice = price * numMints;
    require(totalPrice <= msg.value, 'insufficient funds to pay for mint');
    if (rendererRoyaltyFraction == 0) {
      abf.owner().call{value: totalPrice}('');
    } else {
      uint256 rendererRoyalty = (totalPrice * rendererRoyaltyFraction) / 10000; // in bps
      abf.owner().call{value: totalPrice - rendererRoyalty}('');
      IRenderer renderer = abf.renderer();
      if (rendererRoyaltyTreasury != address(0)) {
        rendererRoyaltyTreasury.call{value: rendererRoyalty}('');
      } else {
        renderer.owner().call{value: rendererRoyalty}('');
      }
    }
    payable(msg.sender).transfer(msg.value - totalPrice);
  }
}
