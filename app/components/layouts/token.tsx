import { FC } from 'react';
import styled from 'styled-components';
import { ProjectBuilderProvider } from '../../contexts/projectBuilder';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
  DetailTitleAnchorRow,
  DetailTitleRow,
} from '../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../divs/twoColumn';
import { FlexCenterColumn } from '../flexs';
import { PrimaryButton, TertiaryButton } from '../inputs/button';
import { InputWell, NumberInput, TextArea, TextInput } from '../inputs/input';
import { PlaceholderRender } from '../renders';
import { Text } from '../texts';

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
