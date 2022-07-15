import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* border: 1px solid #e0e0e0; */
  grid-gap: 10px;
  /* background-color: #e0e0e0; */
  margin: 100px 0;
  > div {
    background-color: white;
    border: 1px solid #e0e0e0;
  }
`;

export const GridContentContainer = styled.div`
  padding: 50px;
  > div + div {
    margin-top: 50px;
  }
`;
