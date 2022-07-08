import styled from 'styled-components';
import { BREAKPTS } from '../../constants/styles';
import { FlexCenterColumn } from '../flexs';

export const OneColumnContainer = styled(FlexCenterColumn)`
  width: 100%;
  min-height: 100vh;
  // margin: 0px auto;
`;

export const OneColumnContentContainer = styled(FlexCenterColumn)`
  max-width: 750px;
  width: 100%;
  border: 1px solid #e0e0e0;
  padding: 100px;
  > div + div {
    margin-top: 50px;
  }
  @media (max-width: ${BREAKPTS.LG}px) {
    padding: 50px;
  }
`;
