import { FC } from 'react';
import { DetailRow, DetailRowsContainer } from '../details/rows';
import { GridContainer, GridContentContainer } from '../divs/grid';
import { PrimaryButton, TertiaryButton } from '../inputs/button';
import { PlaceholderRender } from '../renders';

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
