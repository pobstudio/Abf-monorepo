import { FC } from 'react';
import styled from 'styled-components';
import { DetailRow } from '../details/rows';

const ProjectRowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 180px;
`;

export const ProjectRow: FC = () => {
  return (
    <ProjectRowContainer>
      <div>
        <DetailRow>{['Name', 'Lorem Ipsum']}</DetailRow>
      </div>
      <div>
        <DetailRow>{['Supply', `${0}/1000`]}</DetailRow>
      </div>
    </ProjectRowContainer>
  );
};

export const ProjectRowsContainer = styled.div`
  > div {
    padding: 0 120px;
  }
`;
