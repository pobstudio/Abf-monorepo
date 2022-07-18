import Link from 'next/link';
import React from 'react';
import { ROUTES } from '../../../constants/routes';
import { DetailRowsContainer } from '../../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../../divs/oneColumn';
import { SecondaryAnchorButton } from '../../inputs/button';
import { DropdownAnchor, DropdownAnchorGroup } from '../../navs/common';
import { DropdownAnchorGroupContainer } from '../../navs/dropdown';
import { B, H1, Label, P } from '../../texts';

export const TUTORIALS_MAP = {
  [ROUTES.TRAIN[0]]: 'DOT-T000-000',
  [ROUTES.TRAIN[1]]: 'DOT-T000-001',
};

export const TutorialsDropdownLinkTree: React.FC = () => {
  return (
    <DropdownAnchorGroupContainer>
      <DropdownAnchorGroup>
        <Label>MATERIALS</Label>
        {Object.entries(TUTORIALS_MAP).map(([href, name]) => (
          <Link passHref href={href} key={`training-dropdown-link-${name}`}>
            <DropdownAnchor>{name}</DropdownAnchor>
          </Link>
        ))}
      </DropdownAnchorGroup>
    </DropdownAnchorGroupContainer>
  );
};

export const TutorialsRoot: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <H1>TRAIN</H1>
          <P>
            "A tutorial a day keeps the doctor away." <B>-002</B>
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
