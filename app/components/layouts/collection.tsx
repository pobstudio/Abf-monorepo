import React from 'react';
import { useCollection } from '../../hooks/useCollections';
import { DetailRow, DetailRowsContainer } from '../details/rows';
import { PlaceholderRender } from '../renders';

export const Collection: React.FC<{ address: string | undefined }> = ({
  address,
}) => {
  const collection = useCollection(address);
  console.log(collection, 'collection');
  return (
    <>
      <DetailRowsContainer>
        <PlaceholderRender />
      </DetailRowsContainer>
      <br />
      <br />
      <DetailRowsContainer>
        <DetailRow>{['NAME', collection?.name ?? '-']}</DetailRow>
        <DetailRow>{['SUPPLY', collection?.mintingSupply ?? '-']}</DetailRow>
        <DetailRow>{['PRICE', collection?.price ?? '-']}</DetailRow>
      </DetailRowsContainer>
    </>
  );
};
