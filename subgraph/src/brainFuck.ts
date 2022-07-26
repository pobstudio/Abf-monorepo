import { CreatedBrainFuckNFT } from '../generated/BrainFuckFactory/BrainFuckFactory';
import { Collection, Token, TokenTransfer } from '../generated/schema';
import { BrainFuck as BrainFuckTemplate } from '../generated/templates';
import {
  BrainFuck as BrainFuckContract,
  Transfer,
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

export function handleBrainFuckTransfer(event: Transfer): void {
  let tokenId = event.params.tokenId.toString();
  let from = event.params.from;
  let to = event.params.to;
  let token = Token.load(tokenId);
  if (token == null) {
    token = new Token(tokenId);
    token.collection = event.address.toHexString();
  }
  token.owner = to;
  token.save();

  let transferId = tokenId + '/' + event.block.number.toString();
  let transfer = TokenTransfer.load(transferId);
  if (transfer == null) {
    transfer = new TokenTransfer(transferId);
    transfer.token = tokenId;
  } 
  transfer.to = to;
  transfer.from = from;
  transfer.timestamp = event.block.timestamp;
  transfer.blocknumber = event.block.number;
  transfer.save();
}