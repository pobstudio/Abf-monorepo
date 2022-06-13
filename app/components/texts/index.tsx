import styled from 'styled-components';

export const Label = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  opacity: 0.2;
  line-height: 12px;
`;

export const LabelAnchor = styled.a`
  padding: 0;
  margin: 0;
  font-size: 12px;
  opacity: 0.2;
  color: black;
  text-decoration: underline;
  line-height: 12px;
`;

export const Text = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  line-height: 12px;
`;

export const MultiLineText = styled(Text)`
  line-height: 16px;
`;

export const TextAnchor = styled.a`
  text-decoration: underline;
  color: black;
  font-size: 12px;
  line-height: 12px;
`;

export const Code = styled.code`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0 4px;
`;
