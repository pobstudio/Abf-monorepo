import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import { DropdownAnimation } from '../../constants/styles';
import { Flex, FlexCenter } from '../flexs';
import { DropdownLinkTree } from '../layouts/documentation';
import { HeaderAnchor, HeaderLogoAnchor } from './anchor';
import { Web3Status } from './web3Status';
const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  height: 180px;
`;

const HeaderAnchorRow = styled(Flex)`
  > * + * {
    margin-left: 32px;
  }
`;

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <HeaderRow>
      <HeaderAnchorRow>
        <Docs />
        {/* <Link passHref href={'/collection'}>
          <HeaderAnchor>COLLECTION</HeaderAnchor>
        </Link> */}
        <Link passHref href={'/recruitment'}>
          <HeaderAnchor>RECRUITMENT</HeaderAnchor>
        </Link>
      </HeaderAnchorRow>
      <FlexCenter>
        <Link passHref href={'/'}>
          <HeaderLogoAnchor style={{ fontWeight: 'bold' }}>
            ABS BRAIN FUCK (ALPHA ON GOERLI)
          </HeaderLogoAnchor>
        </Link>
      </FlexCenter>
      <Flex style={{ flexDirection: 'row-reverse' }}>
        <Web3Status />
      </Flex>
    </HeaderRow>
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
    <DropdownWrapper ref={clickAwayRef}>
      <DocAnchor onClick={() => setIsDropdownOpen(true)}>
        DOCUMENTATION
      </DocAnchor>
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
    </DropdownWrapper>
  );
};

const DocAnchor = styled(HeaderAnchor)`
  display: block;
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownContainerContent = styled.div`
  padding: 10px 24px 24px 24px;
`;

const DocsAnchorGroup = styled.div`
  padding: 12px 0 0 0;
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
