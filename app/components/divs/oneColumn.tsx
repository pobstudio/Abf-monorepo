import styled from 'styled-components';

export const OneColumnContainer = styled.div`
  border: 1px solid #e0e0e0;
  margin: 256px auto;
  width: 712px;
`;

export const OneColumnContentContainer = styled.div`
  padding: 128px;
  > div + div {
    margin-top: 42px;
  }
`;
