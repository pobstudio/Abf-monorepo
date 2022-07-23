import Link from 'next/link';
import React from 'react';
import { ROUTES } from '../../constants/routes';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { ArrowIcon } from '../icons/arrow';
import { SecondaryAnchorButton, TertiaryAnchorButton } from '../inputs/button';
import { DropdownAnchor, DropdownAnchorGroup } from '../navs/common';
import { DropdownAnchorGroupContainer } from '../navs/dropdown';
import { B, BackButtonAnchor, H1, Label, P } from '../texts';

export const DocsDropdownLinkTree: React.FC = () => {
  return (
    <DropdownAnchorGroupContainer>
      <DropdownAnchorGroup>
        <Label>ORIENTATION</Label>
        <Link passHref href={ROUTES.DOCS.EXEC}>
          <DropdownAnchor>EXEC SUMMARY</DropdownAnchor>
        </Link>
        <Link passHref href={ROUTES.DOCS.ORIGIN}>
          <DropdownAnchor>ORIGINS</DropdownAnchor>
        </Link>
      </DropdownAnchorGroup>
      <DropdownAnchorGroup>
        <Label>SCHEMATICS</Label>
        <Link passHref href={ROUTES.DOCS.SPEC}>
          <DropdownAnchor>PROTOCOL DESIGN</DropdownAnchor>
        </Link>
        <Link passHref href={ROUTES.DOCS.BRAINFUCK}>
          <DropdownAnchor>BRAINFUCK!</DropdownAnchor>
        </Link>
        <Link passHref href={ROUTES.DOCS.MIXINS}>
          <DropdownAnchor>BF! MIXINS</DropdownAnchor>
        </Link>
      </DropdownAnchorGroup>
      <DropdownAnchorGroup>
        <Label>REGISTRIES</Label>
        <Link passHref href={ROUTES.DOCS.RENDERERS}>
          <DropdownAnchor>RENDERER CONTRACTS</DropdownAnchor>
        </Link>
        <Link passHref href={ROUTES.DOCS.PROTOCOL}>
          <DropdownAnchor>PROTOCOL CONTRACTS</DropdownAnchor>
        </Link>
      </DropdownAnchorGroup>
    </DropdownAnchorGroupContainer>
  );
};

export const DocumentationRoot: React.FC = () => {
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
            <DocsDropdownLinkTree />
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

export const DocsBackButton: React.FC = () => (
  <Link passHref href={ROUTES.DOCS.INDEX}>
    <BackButtonAnchor>
      <ArrowIcon />
      &nbsp;&nbsp;VIEW ALL DOCS
    </BackButtonAnchor>
  </Link>
);
