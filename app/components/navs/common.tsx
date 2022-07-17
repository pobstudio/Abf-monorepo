import { animated } from 'react-spring';
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
  grid-template-columns: 250px 1fr 250px;
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

export const DropdownAnchor = styled(HeaderAnchor)`
  display: block;
  cursor: pointer;
`;

export const DropdownExterior = styled.div`
  position: relative;
`;

export const DropdownContainerContent = styled.div`
  padding: 12px 24px 24px 24px;
`;

export const DropdownAnchorGroup = styled.div`
  padding: 12px 0 0 0;
  > * + * {
    margin-top: 12px;
  }
`;

export const DropdownContainer = animated(styled.div<{}>`
  position: absolute;
  margin-top: 10px;
  z-index: 1100;
  background: white;
  min-width: 256px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  opacity: 0;
  hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`);
