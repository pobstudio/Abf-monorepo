import { FC } from 'react';
import styled from 'styled-components';
import { FlexEnds } from '../flex';
import { Label, Text } from '../texts';

const DetailRowContainer = styled(FlexEnds)``;

export const DetailsRowsContainer = styled.div`
  > div + div {
    margin-top: 28px;
  }
`;

export const DetailRow: FC<{ children: [string, string] }> = ({ children }) => {
  return (
    <DetailRowContainer>
      <Label style={{ textTransform: 'uppercase' }}>{children[0]}</Label>
      <Text>{children[1]}</Text>
    </DetailRowContainer>
  );
};
