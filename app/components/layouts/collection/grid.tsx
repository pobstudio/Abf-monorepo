import { BigNumber, utils } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { ROUTES } from '../../../constants/routes';
import {
  CollectionProvider,
  useCollectionContext,
} from '../../../contexts/collection';
import { useENSorHex } from '../../../hooks/useENS';
import { CollectionMetadataStub } from '../../../types';
import { DetailRow, DetailRowsContainer } from '../../details/rows';
import { GridContainer, GridContentContainer } from '../../divs/grid';
import { TertiaryButton } from '../../inputs/button';
import { Render } from '../../renders';
import { CleanA } from '../../texts';

export const CollectionsGrid: FC<{
  collections: CollectionMetadataStub[] | undefined;
}> = ({ collections }) => {
  return (
    <GridContainer>
      {collections?.map((collection: CollectionMetadataStub, index: number) => (
        <React.Fragment
          key={`${collection.address}-collection-grid-item-${index}`}
        >
          <CollectionProvider address={collection.address}>
            <CollectionGridItem {...collection} />
          </CollectionProvider>
        </React.Fragment>
      ))}
    </GridContainer>
  );
};

const CollectionGridItem: FC<CollectionMetadataStub> = ({
  address,
  name,
  renderer,
  owner,
  price,
  mintingSupply,
}) => {
  const {
    currentSampleTokenRenderState: output,
    rendererMetadata,
    collectionMetadata,
  } = useCollectionContext();
  const router = useRouter();
  const ownerLabel = useENSorHex(collectionMetadata?.owner);
  return (
    <GridContentContainer
      style={{ cursor: 'pointer' }}
      onClick={() => router.push(`${ROUTES.COLLECTION}/${address}`)}
    >
      <Render output={output} rendererMetadata={rendererMetadata} />
      <DetailRowsContainer>
        <DetailRow>{['NAME', name]}</DetailRow>
        <DetailRow>{['SUPPLY', mintingSupply]}</DetailRow>
        <DetailRow>
          {['PRICE', `${utils.formatEther(BigNumber.from(price ?? '0'))} ETH`]}
        </DetailRow>
        <DetailRow>{['CREATOR', `${ownerLabel}`]}</DetailRow>
      </DetailRowsContainer>
      <DetailRowsContainer>
        <Link href={`${ROUTES.COLLECTION}/${address}`} passHref>
          <CleanA>
            <TertiaryButton>DETAILS</TertiaryButton>
          </CleanA>
        </Link>
      </DetailRowsContainer>
    </GridContentContainer>
  );
};
