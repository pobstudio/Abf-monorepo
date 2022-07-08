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
import { Text } from '../texts';

export const Project: FC = () => {
  return (
    <TwoColumnContainer>
      <FlexCenterColumn>
        <TwoColumnContentContainer>
          <DetailRowsContainer>
            <DetailTitleRow>{['MINTING PARAMETERS', '']}</DetailTitleRow>
            <DetailRow>{['SUPPLY', '000/1000']}</DetailRow>
            <DetailRow>{['PRICE', '0.1 ETH']}</DetailRow>
            <DetailRow>{['MINTING RELEASE', '11/20/2022 9:00AM']}</DetailRow>
            <DetailRow>{['ROYALTY', '5%']}</DetailRow>
          </DetailRowsContainer>
          <DetailRowsContainer>
            <PrimaryButton>MINT</PrimaryButton>
            <TertiaryButton>OPENSEA</TertiaryButton>
          </DetailRowsContainer>
        </TwoColumnContentContainer>
      </FlexCenterColumn>
      <FlexCenterColumn>
        <TwoColumnContentContainer>
          <PlaceholderRender />
          <DetailRowsContainer>
            <DetailTitleRow>{['TOKEN PARAMETERS', '']}</DetailTitleRow>
            <DetailRow>{['NAME', 'Tube TV']}</DetailRow>
            <DetailRow>{['SYMBOL', 'TBTV']}</DetailRow>
            <DetailRow>{['ADDRESS', '0xabcd...1234']}</DetailRow>
            <DetailRow>{['SEED', '0xabcd...1234']}</DetailRow>
            <DetailRow>{['RENDERER', 'dotmatrix.eth']}</DetailRow>
          </DetailRowsContainer>
          <DetailRowsContainer>
            <DetailTitleRow>{['Brainfuck Code', '']}</DetailTitleRow>
            <Text style={{ lineHeight: '20px' }}>
              {
                '-[--->+<]>-.[---->+++++<]>-.+.++++++++++.+[---->+<]>+++.-[--->++<]>-.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.-------------.[--->+<]>---..+++++.-[---->+<]>++.+[->+++<]>.++++++++++++..---.[-->+<]>--------.'
              }
            </Text>
          </DetailRowsContainer>
        </TwoColumnContentContainer>
      </FlexCenterColumn>
    </TwoColumnContainer>
  );
};
