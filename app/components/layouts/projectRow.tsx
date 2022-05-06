import { FC } from 'react';
import styled from 'styled-components';
import { DetailRow } from '../details/rows';
import { TwoRowContainer } from './common';

const ProjectRowContainer = styled(TwoRowContainer)``;

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
