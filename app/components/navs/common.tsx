import styled from 'styled-components';
import { BREAKPTS } from '../../constants/styles';
import { Flex } from '../flexs';

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
  font-family: Helvetica, sans-serif;
  white-space: nowrap;
`;

export const NavRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  height: 180px;
  @media (max-width: ${BREAKPTS.LG}px) {
    grid-template-columns: 1fr 1fr 1fr;
    height: 100px;
  }
`;

export const NavAnchorRow = styled(Flex)`
  > * + * {
    margin-left: 32px;
  }
`;
