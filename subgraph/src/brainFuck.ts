import { CreatedBrainFuckNFT } from '../generated/BrainFuckFactory/BrainFuckFactory';
import { Collection } from '../generated/schema';
import { BrainFuck as BrainFuckTemplate } from '../generated/templates';
import {
  BrainFuck as BrainFuckContract,
  OwnershipTransferred,
} from '../generated/templates/BrainFuck/BrainFuck';

export function handleCreatedCollection(event: CreatedBrainFuckNFT): void {
  let nft = Collection.load(event.params.nft.toHexString());
  if (nft == null) {
    nft = new Collection(event.params.nft.toHexString());
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
  let nft = Collection.load(event.address.toHexString());
  if (nft != null) {
    nft.owner = event.params.newOwner;
    nft.save();
  }
}
