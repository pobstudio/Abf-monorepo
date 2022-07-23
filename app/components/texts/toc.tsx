import styled from 'styled-components';
import { A } from '.';

export const TableOfContentsContainer = styled.div`
  > * + * {
    margin-top: 14px;
  }
`;

export const LinkGroup = styled.div`
  > * + * {
    margin-top: 12px;
  }
`;

export const TableOfContentsAnchor = styled(A)`
  display: block;
  cursor: pointer;
`;
