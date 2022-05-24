import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Flex, FlexCenter, FlexEnds } from '../flexs';
import { Label } from '../texts';
import { HeaderAnchor, HeaderLogoAnchor } from './anchor';

const FooterRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  height: 180px;
`;

const FooterAnchorRow = styled(Flex)`
  > ${HeaderAnchor} + ${HeaderAnchor} {
    margin-left: 32px;
  }
`;

export const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <FooterRow>
      <FooterAnchorRow>
        <HeaderAnchor>TWITTER</HeaderAnchor>
        <HeaderAnchor>DISCORD</HeaderAnchor>
      </FooterAnchorRow>
      <FlexCenter>
        <Link passHref href={'/'}>
          <HeaderLogoAnchor style={{ fontWeight: 'bold' }}>
            BY THE CORP
          </HeaderLogoAnchor>
        </Link>
      </FlexCenter>
      <Flex style={{ flexDirection: 'row-reverse' }}>
        <Label>VIRES IN STRUCTURAS.</Label>
      </Flex>
    </FooterRow>
  );
};
