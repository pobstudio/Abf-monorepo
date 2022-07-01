import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
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
        <Link passHref href={'/documentation/exec'}>
          <DocAnchor>EXEC SUMMARY</DocAnchor>
        </Link>
        <Link passHref href={'/documentation/origins'}>
          <DocAnchor>ORIGINS</DocAnchor>
        </Link>
      </DocsAnchorGroup>
      <DocsAnchorGroup>
        <Label>SCHEMATICS</Label>
        <Link passHref href={'/documentation/specification'}>
          <DocAnchor>PROTOCOL DESIGN</DocAnchor>
        </Link>
        <Link passHref href={'/documentation/brainfuck'}>
          <DocAnchor>BRAINFUCK</DocAnchor>
        </Link>
        {/* <Link passHref href={'/collection'}>
          <DocAnchor>RENDERER</DocAnchor>
        </Link> */}
      </DocsAnchorGroup>
      <DocsAnchorGroup>
        <Label>REGISTRIES</Label>
        <Link passHref href={'/documentation/renderers'}>
          <DocAnchor>RENDERER CONTRACTS</DocAnchor>
        </Link>
        <Link passHref href={'/renderers'}>
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
            Within the constaints you work with, simpler things become so
            scarce" <B>-001</B>
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
          margin: '82px 0 24px 0',
        }}
      ></div>
      <P>
        <B>Ready to join the ABF corp?</B>
      </P>
      <Link href={'/recruitment'}>
        <SecondaryAnchorButton as="a">JOIN NOW</SecondaryAnchorButton>
      </Link>
      <Link href={'/documentation'}>
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
