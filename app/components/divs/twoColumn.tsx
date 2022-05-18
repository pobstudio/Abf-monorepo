import styled from 'styled-components';

export const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #e0e0e0;
  grid-gap: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 256px 0;
  > div {
    background-color: white;
  }
`;

export const TwoColumnContentContainer = styled.div`
  width: 500px;
  padding: 128px 0px;
  > div + div {
    margin-top: 82px;
  }
`;
