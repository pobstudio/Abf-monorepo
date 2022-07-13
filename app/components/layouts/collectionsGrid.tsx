import Link from 'next/link';
import { FC } from 'react';
import { ROUTES } from '../../constants/routes';
import { CollectionMetadataStub } from '../../types';
import { DetailRow, DetailRowsContainer } from '../details/rows';
import { GridContainer, GridContentContainer } from '../divs/grid';
import { PrimaryButton, TertiaryButton } from '../inputs/button';
import { PlaceholderRender } from '../renders';
import { CleanA } from '../texts';

export const CollectionsGrid: FC<{
  collections: CollectionMetadataStub[] | undefined;
}> = ({ collections }) => {
  return (
    <GridContainer>
      {collections?.map((collection: CollectionMetadataStub, index: number) => (
        <CollectionGridItem
          {...collection}
          key={`${collection.address}-collection-grid-item-${index}`}
        />
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
  return (
    <GridContentContainer>
      <DetailRowsContainer>
        <PlaceholderRender />
      </DetailRowsContainer>
      <DetailRowsContainer>
        <DetailRow>{['NAME', name]}</DetailRow>
        <DetailRow>{['SUPPLY', mintingSupply]}</DetailRow>
        <DetailRow>{['PRICE', price]}</DetailRow>
      </DetailRowsContainer>
      <DetailRowsContainer>
        <Link href={`${ROUTES.COLLECTION}/${address}`} passHref>
          <CleanA>
            <PrimaryButton>MINT</PrimaryButton>
          </CleanA>
        </Link>
        <Link href={`${ROUTES.COLLECTION}/${address}`} passHref>
          <CleanA>
            <TertiaryButton>DETAILS</TertiaryButton>
          </CleanA>
        </Link>
      </DetailRowsContainer>
    </GridContentContainer>
  );
};
