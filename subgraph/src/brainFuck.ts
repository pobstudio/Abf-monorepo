import { CreatedBrainFuckNFT } from '../generated/BrainFuckFactory/BrainFuckFactory';
import { BrainFuckNFT } from '../generated/schema';
import { BrainFuck as BrainFuckTemplate } from '../generated/templates';
import {
  OwnershipTransferred,
  BrainFuck as BrainFuckContract,
} from '../generated/templates/BrainFuck/BrainFuck';

export function handleCreatedBrainFuckNFT(event: CreatedBrainFuckNFT): void {
  let nft = BrainFuckNFT.load(event.params.nft.toHexString());
  if (nft == null) {
    nft = new BrainFuckNFT(event.params.nft.toHexString());
  }
  nft.owner = event.params.creator;

  const nftContract = BrainFuckContract.bind(event.params.nft);

  nft.name = nftContract.name();
  nft.symbol = nftContract.symbol();
  nft.seed = nftContract.seed();
  nft.constants = nftContract.constants();
  nft.code = nftContract.code();
  nft.renderer = nftContract.renderer();
  nft.mintingSupply = nftContract.mintingSupply();
  nft.price = nftContract.price();
  nft.rendererRoyaltyFraction = nftContract.rendererRoyaltyFraction();
  nft.whitelistToken = nftContract.whitelistToken();
  nft.save();

  BrainFuckTemplate.create(event.params.nft);
}

export function handleBrainFuckOwnershipTransferred(
  event: OwnershipTransferred,
): void {
  let nft = BrainFuckNFT.load(event.address.toHexString());
  if (nft != null) {
    nft.owner = event.params.newOwner;
    nft.save();
  }
}
