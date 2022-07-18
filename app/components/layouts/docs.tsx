import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { SecondaryAnchorButton, TertiaryAnchorButton } from '../inputs/button';
import { HeaderAnchor } from '../navs/common';
import { B, H1, Label, P } from '../texts';

export const DropdownLinkTree: React.FC = () => {
  return (
    <DocsAnchorGroupContainer>
      <DocsAnchorGroup>
        <Label>ORIENTATION</Label>
        <Link passHref href={ROUTES.DOCS.EXEC}>
          <DocAnchor>EXEC SUMMARY</DocAnchor>
        </Link>
        <Link passHref href={ROUTES.DOCS.ORIGIN}>
          <DocAnchor>ORIGINS</DocAnchor>
        </Link>
      </DocsAnchorGroup>
      <DocsAnchorGroup>
        <Label>SCHEMATICS</Label>
        <Link passHref href={ROUTES.DOCS.SPEC}>
          <DocAnchor>PROTOCOL DESIGN</DocAnchor>
        </Link>
        <Link passHref href={ROUTES.DOCS.BRAINFUCK}>
          <DocAnchor>BRAINFUCK!</DocAnchor>
        </Link>
      </DocsAnchorGroup>
      <DocsAnchorGroup>
        <Label>REGISTRIES</Label>
        <Link passHref href={ROUTES.DOCS.RENDERERS}>
          <DocAnchor>RENDERER CONTRACTS</DocAnchor>
        </Link>
        <Link passHref href={ROUTES.DOCS.PROTOCOL}>
          <DocAnchor>PROTOCOL CONTRACTS</DocAnchor>
        </Link>
      </DocsAnchorGroup>
    </DocsAnchorGroupContainer>
  );
};

export const Documentation: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <H1>DOCUMENTATION</H1>
          <P>
            "ABF is this hair-pulling experience that you indulged yourself in.
            In some ways its kind of demented. But in more ways, its pure.
            Within the constants you work with, simpler things become so scarce"{' '}
            <B>-002</B>
          </P>
          <div
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '0 0 14px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <DropdownLinkTree />
          </div>
          <br />
          <br />
          <P>
            <B>Ready to join the ABF Corps?</B>
          </P>
          <Link href={ROUTES.RECRUIT}>
            <SecondaryAnchorButton as="a">JOIN NOW</SecondaryAnchorButton>
          </Link>
          <P style={{ opacity: 0.2 }}>
            {
              '-[------->+<]>++.-[--->+<]>.+.++++++++.-----------.-------.-.+++.--.--[--->+<]>-.++[->+++<]>.+++++++++.+++.[-->+++++<]>+++.[->+++<]>+.+++++++++++..'
            }
          </P>
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

export const DocumentationFooter: React.FC = () => {
  return (
    <>
      <div
        style={{
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          margin: '50px 0 25px 0',
        }}
      ></div>
      <P>
        <B>Ready to join the ABF Corps?</B>
      </P>
      <Link href={ROUTES.RECRUIT}>
        <SecondaryAnchorButton as="a">JOIN NOW</SecondaryAnchorButton>
      </Link>
      <Link href={ROUTES.DOCS.INDEX}>
        <TertiaryAnchorButton as="a">READ DOCS</TertiaryAnchorButton>
      </Link>
    </>
  );
};

const DocAnchor = styled(HeaderAnchor)`
  display: block;
  cursor: pointer;
`;

const DocsAnchorGroupContainer = styled.div`
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
