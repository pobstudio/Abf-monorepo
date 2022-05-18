import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid #e0e0e0;
  grid-gap: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 256px 0;
  > div {
    background-color: white;
  }
`;

export const GridContentContainer = styled.div`
  padding: 82px;
  > div + div {
    margin-top: 62px;
  }
`;
