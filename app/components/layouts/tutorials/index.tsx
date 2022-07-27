import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ROUTES } from '../../../constants/routes';
import { DetailRowsContainer } from '../../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../../divs/oneColumn';
import { TwoColumnContentContainer } from '../../divs/twoColumn';
import { ArrowIcon } from '../../icons/arrow';
import {
  SecondaryAnchorButton,
  TertiaryAnchorButton,
} from '../../inputs/button';
import { BasicModal } from '../../modal';
import { DropdownAnchor, DropdownAnchorGroup } from '../../navs/common';
import { DropdownAnchorGroupContainer } from '../../navs/dropdown';
import { B, BackButtonAnchor, H1, Label, LabelAnchor, P } from '../../texts';

export const TUTORIALS_MAP = {
  [ROUTES.TRAIN[0]]: 'DOT-T000-000',
  [ROUTES.TRAIN[1]]: 'DOT-T000-001',
  [ROUTES.TRAIN[2]]: 'DOT-T000-002',
  [ROUTES.TRAIN[3]]: 'DOT-T000-003',
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

export const RewardModal: React.FC<{ reward: string }> = ({ reward }) => {
  return (
    <>
      <BasicModal>
        <Label>
          {`--[----->+<]>---.++++++++++++.-.-------.+++++++++++.+++[->+++<]>++.SUCCESS--[--->+<]>-.+.---------.-----------.--[--->+<]>-.-----------.++++++.-.+++++.`}
        </Label>
        {reward.includes('http') ? (
          <LabelAnchor
            href={reward}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              marginTop: 25,
              opacity: 1,
              wordBreak: 'break-all',
            }}
          >
            {reward}
          </LabelAnchor>
        ) : (
          <P style={{ marginTop: 25, wordBreak: 'break-all' }}>{reward}</P>
        )}
      </BasicModal>
    </>
  );
};

export const TutorialsBackButton: React.FC = () => (
  <Link passHref href={ROUTES.TRAIN.INDEX}>
    <BackButtonAnchor>
      <ArrowIcon />
      &nbsp;&nbsp;VIEW ALL
    </BackButtonAnchor>
  </Link>
);

export const TwoColumnTutorialContainer = styled(TwoColumnContentContainer)`
  > * + * {
    margin-top: 25px !important;
    width: 100%;
  }
`;

export const TutorialFooter: React.FC = () => {
  return (
    <>
      <div
        style={{
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          margin: '50px 0 25px 0',
        }}
      ></div>
      <P>
        <B>Too f**king easy? Continue your training program.</B>
      </P>
      <Link href={ROUTES.TRAIN.INDEX}>
        <TertiaryAnchorButton as="a">TUTORIALS</TertiaryAnchorButton>
      </Link>
    </>
  );
};
