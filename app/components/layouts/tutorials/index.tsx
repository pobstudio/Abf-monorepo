import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ROUTES } from '../../../constants/routes';
import { DetailRowsContainer } from '../../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../../divs/oneColumn';
import {
  SecondaryAnchorButton,
  TertiaryAnchorButton,
} from '../../inputs/button';
import { DropdownAnchor, DropdownAnchorGroup } from '../../navs/common';
import { B, H1, Label, P } from '../../texts';

export const TUTORIALS_MAP = {
  [ROUTES.TRAIN[0]]: 'DOT-T000-000',
  [ROUTES.TRAIN[1]]: 'DOT-T000-001',
};

export const TutorialsDropdownLinkTree: React.FC = () => {
  return (
    <DocsAnchorGroupContainer>
      <DropdownAnchorGroup>
        <Label>MATERIALS</Label>
        {Object.entries(TUTORIALS_MAP).map(([href, name]) => (
          <Link passHref href={href} key={`training-dropdown-link-${name}`}>
            <DropdownAnchor>{name}</DropdownAnchor>
          </Link>
        ))}
      </DropdownAnchorGroup>
    </DocsAnchorGroupContainer>
  );
};

export const Tutorials: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <H1>TRAIN</H1>
          <P>
            "Alright f**k faces, today we're going to learn how to control a
            RENDERER via Brainfuck code. Every RENDERER is different and should
            have instructions on which bytes manipulate which part.
            Additionally, every RENDERER defines it's own input size."{' '}
            <B>-002</B>
          </P>
          <div
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '0 0 14px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <TutorialsDropdownLinkTree />
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

const DocsAnchorGroupContainer = styled.div`
  > * + * {
    margin-top: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
