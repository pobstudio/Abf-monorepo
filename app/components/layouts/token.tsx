import { FC } from 'react';
import {
  DetailRow,
  DetailRowsContainer,
  DetailTitleRow,
} from '../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../divs/twoColumn';
import { FlexCenterColumn } from '../flexs';
import { PrimaryButton, TertiaryButton } from '../inputs/button';
import { PlaceholderRender } from '../renders';

export const Token: FC = () => {
  return (
    <TwoColumnContainer>
      <FlexCenterColumn>
        <TwoColumnContentContainer>
          <DetailRowsContainer>
            <DetailTitleRow>{['NFT PARAMETERS', '']}</DetailTitleRow>
            <DetailRow>{['ID', '#0']}</DetailRow>
            <DetailRow>{['OWNER', '0xabcd...edcf']}</DetailRow>
            <DetailRow>{['COLLECTION', 'TUBE TV']}</DetailRow>
          </DetailRowsContainer>
          <DetailRowsContainer>
            <PrimaryButton>VIEW COLLECTION</PrimaryButton>
            <TertiaryButton>OPENSEA</TertiaryButton>
          </DetailRowsContainer>
        </TwoColumnContentContainer>
      </FlexCenterColumn>
      <FlexCenterColumn>
        <TwoColumnContentContainer>
          <PlaceholderRender />
        </TwoColumnContentContainer>
      </FlexCenterColumn>
    </TwoColumnContainer>
  );
};
