import React, { FC } from 'react';
import styled from 'styled-components';
import { FlexEnds } from '../flexs';
import { Label, LabelAnchor, Text, TextAnchor } from '../texts';

const DetailRowContainer = styled(FlexEnds)``;

export const DetailRowsContainer = styled.div`
  width: 500px;
  > * + * {
    margin-top: 16px;
  }
`;

export const InteractiveDetailRowsContainer = styled(DetailRowsContainer)<{
  disabled?: boolean;
}>`
  position: relative;
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
      <Label style={{ textTransform: 'uppercase' }}>{children[0]}</Label>
      <Text>{children[1]}</Text>
    </DetailRowContainer>
  );
};

export const DetailAnchorRow: FC<{
  children: [string, string];
  href?: string;
}> = ({ href, children }) => {
  return (
    <DetailRowContainer>
      <Label style={{ textTransform: 'uppercase' }}>{children[0]}</Label>
      <TextAnchor target="_blank" href={href}>
        {children[1]}
      </TextAnchor>
    </DetailRowContainer>
  );
};
