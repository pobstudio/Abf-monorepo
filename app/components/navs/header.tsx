import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useClickAway, useWindowSize } from 'react-use';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { BREAKPTS, DropdownAnimation } from '../../constants/styles';
import { Flex, FlexCenter } from '../flexs';
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
            <Link passHref href={ROUTES.RECRUIT}>
              <HeaderAnchor>RECRUITMENT</HeaderAnchor>
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
        <HamburgerIcon />
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
            <Link passHref href={ROUTES.RECRUIT}>
              <DropdownAnchor>RECRUITMENT</DropdownAnchor>
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

const HamburgerIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none">
      <path fill="#fff" d="M0 0h36v36H0z"></path>
      <path stroke="#000" d="M8 12.5h20m-20 10h20m-20-5h20"></path>
    </svg>
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
        </DropdownContainerContent>
      </DropdownContainer>
    </DropdownExterior>
  );
};

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
