import styled from 'styled-components';
import { BREAKPTS } from '../../constants/styles';

export const PageDiv = styled.div`
  margin: 0 200px;
  @media (max-width: ${BREAKPTS.LG}px) {
    margin: 0 50px;
  }
`;

export const Box = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
