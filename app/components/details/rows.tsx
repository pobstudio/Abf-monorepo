import { FC } from 'react';
import styled from 'styled-components';
import { FlexEnds } from '../flexs';
import { A, Label, LabelAnchor, Text } from '../texts';

const DetailRowContainer = styled(FlexEnds)``;

export const DetailRowsContainer = styled.div`
  width: 100%;
  > * + * {
    margin-top: 20px;
  }
  h2 {
    margin-top: 40px;
  }
`;

export const DetailRowsTableContainer = styled.div`
  > div + div {
    margin-top: 42px;
  }
`;

export const DetailRowsLabel = styled(Label)`
  text-transform: uppercase;
  text-align: left;
`;

export const DetailRowsText = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80%;
  text-align: right;
`;

export const DetailTitleAnchorRow: FC<{
  children: [string, string];
  href?: string;
}> = ({ href, children }) => {
  return (
    <DetailRowContainer>
      <Text style={{ textTransform: 'uppercase' }}>
        <strong>{children[0]}</strong>
      </Text>
      <LabelAnchor target="_blank" href={href}>
        {children[1]}
      </LabelAnchor>
    </DetailRowContainer>
  );
};

export const DetailTitleRow: FC<{ children: [string, string] }> = ({
  children,
}) => {
  return (
    <DetailRowContainer>
      <Text style={{ textTransform: 'uppercase' }}>
        <strong>{children[0]}</strong>
      </Text>
      <Label>{children[1]}</Label>
    </DetailRowContainer>
  );
};

export const DetailRow: FC<{ children: [string, string] }> = ({ children }) => {
  return (
    <DetailRowContainer>
      <DetailRowsLabel>{children[0]}</DetailRowsLabel>
      <DetailRowsText>{children[1]}</DetailRowsText>
    </DetailRowContainer>
  );
};

export const DetailAnchorRow: FC<{
  children: [string, string];
  href?: string;
}> = ({ href, children }) => {
  return (
    <DetailRowContainer>
      <DetailRowsLabel>{children[0]}</DetailRowsLabel>
      <A target="_blank" href={href}>
        {children[1]}
      </A>
    </DetailRowContainer>
  );
};
