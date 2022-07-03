import Link from 'next/link';
import React from 'react';
import { ROUTES } from '../../constants/routes';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { PrimaryButton, TertiaryButton } from '../inputs/button';
import { A, B, H1, P } from '../texts';

export const Collect: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <div>
            <H1 style={{ opacity: 0.2 }}>COMING SOON</H1>
          </div>
          <P>
            Pardon the dust, the ABF Corp is currently building a minting/collecting experience for ABF NFTs. Stay tuned for when the ABF <B>beta</B> drops.
          </P>
          <P style={{ opacity: 0.2 }}>
            {
              '++[---------->+<]>.+[--->++++<]>+.+++++.++++++.[++>---<]>--.------------.---[->++++<]>-.-----------.-------.--[--->+<]>---.-------------.-[->+++<]>.------------.+[->+++<]>++.[--->+<]>+.--------.----.+++.+++.-------------.--[--->+<]>-.[->++<]>+.+.++++.'
            }
          </P>
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};
