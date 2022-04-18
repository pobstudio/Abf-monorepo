import React from 'react';
import { NextPage } from 'next';
import { PageDiv } from '../components/divs';
import { Header } from '../components/navs/header';
import { FlexCenter } from '../components/flex';
import { Label } from '../components/texts';
import { HEADER_HEIGHT } from '../constants';

const NotFoundPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <FlexCenter style={{ height: `calc(50vh - ${HEADER_HEIGHT}px)` }}>
        <Label>{'>+++++++4+[>++++++<-]>++++.----.++++.'}</Label>
      </FlexCenter>
    </PageDiv>
  );
};

export default React.memo(NotFoundPage);
