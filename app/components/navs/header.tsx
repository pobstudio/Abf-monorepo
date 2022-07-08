import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useClickAway, useWindowSize } from 'react-use';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { BREAKPTS, DropdownAnimation } from '../../constants/styles';
import { Flex, FlexCenter } from '../flexs';
import { MenuIcon } from '../icons/menu';
import { SecondaryAnchorButton } from '../inputs/button';
import { DropdownLinkTree } from '../layouts/docs';
import { HeaderAnchor, HeaderLogoAnchor, NavAnchorRow, NavRow } from './common';
import { Web3Status } from './web3Status';

export const Header: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <NavRow>
      <NavAnchorRow>
        {width > BREAKPTS.LG && (
          <>
            <Docs />
            <Link passHref href={ROUTES.BUILDER}>
              <HeaderAnchor>BUILD</HeaderAnchor>
            </Link>
            <Link passHref href={ROUTES.COLLECT.INDEX}>
              <HeaderAnchor>COLLECT</HeaderAnchor>
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
            <Docs />
          </DropdownAnchorGroup>
          <DropdownAnchorGroup>
            <Link passHref href={ROUTES.BUILDER}>
              <DropdownAnchor>BUILD</DropdownAnchor>
            </Link>
            <Link passHref href={ROUTES.COLLECT.INDEX}>
              <DropdownAnchor>COLLECT</DropdownAnchor>
            </Link>
          </DropdownAnchorGroup>
          <DropdownAnchorGroup>
            <Web3Status />
          </DropdownAnchorGroup>
        </DropdownContainerContent>
      </DropdownContainer>
    </DropdownExterior>
  );
};

const Docs: React.FC = () => {
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
      <DropdownAnchor onClick={() => setIsDropdownOpen(true)}>
        DOCUMENTATION
      </DropdownAnchor>
      <DropdownContainer
        style={{
          transform: y.to((v: unknown) => `translateY(${v}%`),
          opacity,
          pointerEvents,
          userSelect,
        }}
      >
        <DropdownContainerContent>
          <DropdownLinkTree />
          <div
            style={{
              marginTop: 14,
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          ></div>
          <JoinTheCorpButton as="a" href={ROUTES.RECRUIT}>
            JOIN THE CORP
          </JoinTheCorpButton>
        </DropdownContainerContent>
      </DropdownContainer>
    </DropdownExterior>
  );
};

const JoinTheCorpButton = styled(SecondaryAnchorButton)`
  margin-top: 14px;
  padding: 18px;
`;

const DropdownAnchor = styled(HeaderAnchor)`
  display: block;
  cursor: pointer;
`;

const DropdownExterior = styled.div`
  position: relative;
`;

const DropdownContainerContent = styled.div`
  padding: 10px 24px 24px 24px;
`;

const DropdownAnchorGroup = styled.div`
  padding: 13px 0 0 0;
  > * + * {
    margin-top: 12px;
  }
`;

const DropdownContainer = animated(styled.div<{}>`
  position: absolute;
  margin-top: 10px;
  z-index: 1100;
  background: white;
  min-width: 256px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  opacity: 0;
`);
