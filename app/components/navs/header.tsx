import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';
import { useClickAway, useWindowSize } from 'react-use';
import { DISCORD_LINK, GITHUB_LINK, TWITTER_LINK } from '../../constants';
import { ROUTES } from '../../constants/routes';
import { BREAKPTS, DropdownAnimation } from '../../constants/styles';
import { Flex, FlexCenter } from '../flexs';
import { MenuIcon } from '../icons/menu';
import {
  DropdownAnchor,
  DropdownAnchorGroup,
  DropdownContainer,
  DropdownContainerContent,
  DropdownExterior,
  HeaderAnchor,
  HeaderLogoAnchor,
  NavAnchorRow,
  NavRow,
} from './common';
import { DocsDropdown, TutorialsDropdown } from './dropdown';
import { Web3Status } from './web3Status';

export const Header: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <NavRow>
      <NavAnchorRow>
        {width > BREAKPTS.LG && (
          <>
            <DocsDropdown />
            <TutorialsDropdown />
            <Link passHref href={ROUTES.BUILDER}>
              <HeaderAnchor>BUILD</HeaderAnchor>
            </Link>
            <Link passHref href={ROUTES.EXPLORE.INDEX}>
              <HeaderAnchor>EXPLORE</HeaderAnchor>
            </Link>
          </>
        )}
      </NavAnchorRow>
      <FlexCenter>
        <Link passHref href={'/'}>
          <HeaderLogoAnchor style={{ fontWeight: 'bold' }}>
            ABSOLUTE BRAIN F**K&nbsp;&nbsp;[ALPHA]
          </HeaderLogoAnchor>
        </Link>
      </FlexCenter>
      <Flex style={{ flexDirection: 'row-reverse' }}>
        {width < BREAKPTS.LG ? <MobileMenu /> : <Web3Status />}
      </Flex>
    </NavRow>
  );
};

const MobileMenu: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const clickAwayRef = useRef<HTMLDivElement | null>(null);
  useClickAway(clickAwayRef, () => {
    setIsDropdownOpen(false);
  });

  const [{ y, opacity, pointerEvents, userSelect }, set] = useSpring(
    () => DropdownAnimation.hidden,
  );

  useEffect(() => {
    if (isDropdownOpen) {
      set(DropdownAnimation.visible);
    } else {
      set(DropdownAnimation.hidden);
    }
  }, [isDropdownOpen]);

  return (
    <DropdownExterior ref={clickAwayRef}>
      <DropdownAnchor onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <MenuIcon />
      </DropdownAnchor>
      <DropdownContainer
        style={{
          transform: y.to((v: unknown) => `translateY(${v}%`),
          opacity,
          pointerEvents,
          userSelect,
          right: 0,
        }}
      >
        <DropdownContainerContent>
          <DropdownAnchorGroup>
            <DocsDropdown />
          </DropdownAnchorGroup>
          <DropdownAnchorGroup>
            <TutorialsDropdown />
          </DropdownAnchorGroup>
          <DropdownAnchorGroup>
            <Link passHref href={ROUTES.BUILDER}>
              <DropdownAnchor>BUILD</DropdownAnchor>
            </Link>
            <Link passHref href={ROUTES.EXPLORE.INDEX}>
              <DropdownAnchor>EXPLORE</DropdownAnchor>
            </Link>
          </DropdownAnchorGroup>
          <DropdownAnchorGroup>
            <Web3Status />
          </DropdownAnchorGroup>
          <hr style={{ marginTop: 24 }} />
          <DropdownAnchorGroup>
            <DropdownAnchor
              href={TWITTER_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              TWITTER
            </DropdownAnchor>

            <DropdownAnchor
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              DISCORD
            </DropdownAnchor>

            <DropdownAnchor
              href={GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </DropdownAnchor>
          </DropdownAnchorGroup>
        </DropdownContainerContent>
      </DropdownContainer>
    </DropdownExterior>
  );
};
