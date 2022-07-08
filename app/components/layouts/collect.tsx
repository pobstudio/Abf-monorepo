import React from 'react';
import { DetailRowsContainer } from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { B, H1, P } from '../texts';

export const Collect: React.FC = () => {
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <DetailRowsContainer>
          <div>
            <H1 style={{ opacity: 0.2 }}>COMING SOON</H1>
          </div>
          <P>
            Pardon the dust, the ABF Corp is currently building a
            minting/collecting experience for ABF NFTs. Stay tuned for when the{' '}
            <B>ABF BETA</B> drops.
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
