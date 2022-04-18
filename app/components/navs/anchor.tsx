import styled from 'styled-components';

export const HeaderAnchor = styled.a`
  text-decoration: none;
  color: black;
  font-size: 12px;
  :hover {
    text-decoration: underline;
  }
`;

export const HeaderLogoAnchor = styled(HeaderAnchor)`
  font-weight: bold;
`;
