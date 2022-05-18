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
import { GridContainer, GridContentContainer } from '../divs/grid';
import { FlexCenterColumn } from '../flexs';
import { PrimaryButton, TertiaryButton } from '../inputs/button';
import { InputWell, NumberInput, TextArea, TextInput } from '../inputs/input';
import { PlaceholderRender } from '../renders';
import { Text } from '../texts';

export const ProjectGrid: FC = () => {
  return (
    <GridContainer>
      <ProjectGridItem />
      <ProjectGridItem />
      <ProjectGridItem />
      <ProjectGridItem />
      <ProjectGridItem />
      <ProjectGridItem />
    </GridContainer>
  );
};

const ProjectGridItem: FC = () => {
  return (
    <GridContentContainer>
      <DetailRowsContainer>
        <PlaceholderRender />
      </DetailRowsContainer>
      <DetailRowsContainer>
        <DetailRow>{['NAME', 'Tube TV']}</DetailRow>
        <DetailRow>{['SUPPLY', '000/1000']}</DetailRow>
        <DetailRow>{['PRICE', '0.1 ETH']}</DetailRow>
      </DetailRowsContainer>
      <DetailRowsContainer>
        <PrimaryButton>MINT</PrimaryButton>
        <TertiaryButton>DETAILS</TertiaryButton>
      </DetailRowsContainer>
    </GridContentContainer>
  );
};
