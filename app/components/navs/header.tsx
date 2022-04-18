import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../constants';
import { Flex, FlexCenter, FlexEnds } from '../flex';
import { HeaderAnchor, HeaderLogoAnchor } from './anchor';
import { Web3Status } from './web3Status';
// import { Web3Status } from './web3Status';

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  height: ${HEADER_HEIGHT}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <HeaderRow>
      <Flex>
        <HeaderAnchor>TWITTER</HeaderAnchor>
      </Flex>
      <FlexCenter>
        <Link passHref href={'/'}>
          <HeaderLogoAnchor style={{ fontWeight: 'bold' }}>
            ABS BRAIN FUCK
          </HeaderLogoAnchor>
        </Link>
      </FlexCenter>
      <Flex style={{ flexDirection: 'row-reverse' }}>
        <Web3Status />
      </Flex>
    </HeaderRow>
  );
};
