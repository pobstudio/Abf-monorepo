import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import { DropdownAnimation } from '../../constants/styles';
import { Flex, FlexCenter } from '../flexs';
import { Label } from '../texts';
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
        <Link passHref href={'/collection'}>
          <HeaderAnchor>COLLECTION</HeaderAnchor>
        </Link>
        <Link passHref href={'/collection'}>
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
    <DocsContainer ref={clickAwayRef}>
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
          <DocsAnchorGroup>
            <Label>ORIENTATION</Label>
            <Link passHref href={'/collection'}>
              <DocAnchor>EXEC SUMMARY</DocAnchor>
            </Link>
            <Link passHref href={'/collection'}>
              <DocAnchor>ORIGINS</DocAnchor>
            </Link>
            {/* <Link passHref href={'/collection'}>
              <DocAnchor>VALUES</DocAnchor>
            </Link> */}
            <Link passHref href={'/collection'}>
              <DocAnchor>COMMON INQUIRES</DocAnchor>
            </Link>
          </DocsAnchorGroup>
          <DocsAnchorGroup>
            <Label>GUIDES</Label>
            <Link passHref href={'/collection'}>
              <DocAnchor>"AMPLEXUS CHAOTICUS"</DocAnchor>
            </Link>
            <DocAnchor>"USUS INITIBUS"</DocAnchor>
          </DocsAnchorGroup>
          <DocsAnchorGroup>
            <Label>SCHEMATICS</Label>
            <Link passHref href={'/collection'}>
              <DocAnchor>PROTOCOL DESIGN</DocAnchor>
            </Link>
            <Link passHref href={'/collection'}>
              <DocAnchor>BRAINFUCK LANG</DocAnchor>
            </Link>
            <Link passHref href={'/collection'}>
              <DocAnchor>GITHUB</DocAnchor>
            </Link>
          </DocsAnchorGroup>
          <DocsAnchorGroup>
            <Label>REGISTRIES</Label>
            <Link passHref href={'/renderers'}>
              <DocAnchor>RENDERER CONTRACTS</DocAnchor>
            </Link>
            <Link passHref href={'/renderers'}>
              <DocAnchor>PROTOCOL CONTRACTS</DocAnchor>
            </Link>
          </DocsAnchorGroup>
          {/* <DocsAnchorGroup>
            <Label>TOOLING</Label>
            <DocAnchor>{censorText('Pixel Art')}</DocAnchor>
            <DocAnchor>{censorText('BF Debugger')}</DocAnchor>
          </DocsAnchorGroup> */}
        </DropdownContainerContent>
      </DropdownContainer>
    </DocsContainer>
  );
};

const DocAnchor = styled(HeaderAnchor)`
  display: block;
  cursor: pointer;
`;

const DocsContainer = styled.div`
  position: relative;
`;

const DropdownContainerContent = styled.div`
  padding: 10px 24px 24px 24px;
  > * + * {
    margin-top: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
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
