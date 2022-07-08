import Link from 'next/link';
import React from 'react';
import { useWindowSize } from 'react-use';
import { DISCORD_LINK, TWITTER_LINK } from '../../constants';
import { BREAKPTS } from '../../constants/styles';
import { Flex, FlexCenter } from '../flexs';
import { Label } from '../texts';
import { HeaderAnchor, HeaderLogoAnchor, NavAnchorRow, NavRow } from './common';

export const Footer: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <NavRow>
      <NavAnchorRow>
        <HeaderAnchor
          href={TWITTER_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          TWITTER
        </HeaderAnchor>
        <HeaderAnchor
          href={DISCORD_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          DISCORD
        </HeaderAnchor>
      </NavAnchorRow>
      <FlexCenter>
        <Link passHref href={'/'}>
          <HeaderLogoAnchor style={{ fontWeight: 'bold' }}>
            {width < BREAKPTS.MD ? 'ABFC' : 'BY THE CORP'}
          </HeaderLogoAnchor>
        </Link>
      </FlexCenter>
      <Flex style={{ flexDirection: 'row-reverse' }}>
        <Label>VIRES IN STRUCTURAS</Label>
      </Flex>
    </NavRow>
  );
};
