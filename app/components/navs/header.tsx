import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Flex, FlexCenter, FlexEnds } from '../flexs';
import { HeaderAnchor, HeaderLogoAnchor } from './anchor';
import { Web3Status } from './web3Status';
// import { Web3Status } from './web3Status';

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 200px;
`;

const HeaderAnchorRow = styled(Flex)`
  > ${HeaderAnchor} + ${HeaderAnchor} {
    margin-left: 32px;
  }
`;

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <HeaderRow>
      <HeaderAnchorRow>
        <Link passHref href={'/origin'}>
          <HeaderAnchor>ORIGINS</HeaderAnchor>
        </Link>
        <Link passHref href={'/project'}>
          <HeaderAnchor>PROJECTS</HeaderAnchor>
        </Link>
      </HeaderAnchorRow>
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
