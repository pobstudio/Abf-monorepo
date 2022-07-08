import styled from 'styled-components';

export const Label = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  opacity: 0.2;
  line-height: 16px;
`;

export const BackButtonAnchor = styled(Label)`
  text-decoration: none;
  svg {
    transform: translateY(1.5px);
  }
`;


export const LabelAnchor = styled.a`
  padding: 0;
  margin: 0;
  font-size: 12px;
  opacity: 0.2;
  color: black;
  text-decoration: underline;
  line-height: 16px;
`;

export const Text = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  line-height: 16px;
`;

export const P = styled(Text)`
  line-height: 20px;
`;

export const H1 = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

export const H2 = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

export const A = styled.a`
  text-decoration: underline;
  color: black;
  font-size: 12px;
  line-height: 16px;
`;

export const Code = styled.code`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0 4px;
`;

export const BlockCode = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 14px;
`;

export const B = styled.strong``;

export const I = styled.span`
  font-style: italic;
`;

export const OL = styled.ol`
  > li {
    padding: 4px 0;
    margin: 0;
    font-size: 12px;
    line-height: 20px;
  }
`;

export const UL = styled.ul`
  list-style-type: none;
  > li {
    padding: 4px 0;
    margin: 0;
    font-size: 12px;
    line-height: 20px;
  }
`;

export const MultiLineText = styled(Text)`
  line-height: 16px;
`;
