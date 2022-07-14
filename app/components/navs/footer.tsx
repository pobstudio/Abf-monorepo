import Link from 'next/link';
import React from 'react';
import { useWindowSize } from 'react-use';
import { DISCORD_LINK, GITHUB_LINK, TWITTER_LINK } from '../../constants';
import { BREAKPTS } from '../../constants/styles';
import { Flex, FlexCenter } from '../flexs';
import { Label } from '../texts';
import { HeaderAnchor, HeaderLogoAnchor, NavAnchorRow, NavRow } from './common';

export const Footer: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <NavRow>
      <NavAnchorRow>
        {width > BREAKPTS.MD ? (
          <>
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
            <HeaderAnchor
              href={GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </HeaderAnchor>
          </>
        ) : (
          <div></div>
        )}
      </NavAnchorRow>
      <FlexCenter>
        <Link passHref href={'/'}>
          <HeaderLogoAnchor style={{ fontWeight: 'bold' }}>
            {width < BREAKPTS.MD ? 'ABFC' : 'BY THE CORPS'}
          </HeaderLogoAnchor>
        </Link>
      </FlexCenter>
      <Flex style={{ flexDirection: 'row-reverse', whiteSpace: 'nowrap' }}>
        <Label>VIRES IN STRUCTURAS</Label>
      </Flex>
    </NavRow>
  );
};
