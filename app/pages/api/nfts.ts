import { NextApiRequest, NextApiResponse } from 'next';
import { ALCHEMY_KEY, CHAIN_ID } from '../../constants';

const FETCH_URL = (contract: string, pageKey: string | undefined) => {
  const endpoint = `https://eth-${
    CHAIN_ID === 1 ? 'mainnet' : 'rinkeby'
  }.alchemyapi.io/nft/v2/${ALCHEMY_KEY}`;
  const baseUrl = `${endpoint}/getOwnersForCollection`;
  const fullUrl = `${baseUrl}?contractAddress=${contract}&withTokenBalances=true`;
  return pageKey ? `${fullUrl}&pageKey=${pageKey}` : fullUrl;
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contract } = req.query;

  if (typeof contract !== 'string') {
    res
      .status(422)
      .json({ statusCode: 422, message: 'address is not a valid value' });
    return;
  }

  // fetch from Alchemy first time => add data to accumulateOwnedNfts array
  // check if pageKey exists top level Alchemy response
  // loop call until it doesn't OR totalCount === accumulateOwnedNfts.length
  // finally => append HASH txn to every "id" object via hashRegistryCached to look up tokenId quickly

  let accumulateOwnedNfts = [];
  let shouldTryNextPage = true;
  let pageKey = undefined;
  let iterations = 0;

  while (shouldTryNextPage && iterations < 8) {
    const alchemyUrl = FETCH_URL(contract, pageKey);
    const alchemyResponse = await fetch(alchemyUrl);
    console.log(alchemyResponse);
    if (alchemyResponse.ok) {
      const data = await alchemyResponse.json();
      pageKey = data.pageKey;
      accumulateOwnedNfts.push(data);
      shouldTryNextPage =
        pageKey && accumulateOwnedNfts.length !== Number(data.totalCount)
          ? true
          : false;
      iterations++;
    } else {
      shouldTryNextPage = false;
      res.status(404).json({
        statusCode: 404,
        message: 'Unable to fetch NFTs for Collection',
      });
      return;
    }
  }

  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, stale-while-revalidate, s-maxage=120, max-age=120`,
  );
  res.status(200).json({
    nfts: accumulateOwnedNfts,
    statusCode: 200,
  });
  return;
};

export default handle;
