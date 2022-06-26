import styled from 'styled-components';
import { FlexCenter, FlexCenterColumn } from '../flexs';

export const OneColumnContainer = styled(FlexCenter)`
  // margin: 0px auto;
`;

export const OneColumnContentContainer = styled(FlexCenterColumn)`
  border: 1px solid #e0e0e0;
  padding: 128px;
  > div + div {
    margin-top: 42px;
  }
`;
