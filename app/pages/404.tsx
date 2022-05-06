import React from 'react';
import { NextPage } from 'next';
import { PageDiv } from '../components/divs';
import { Header } from '../components/navs/header';
import { FlexCenter } from '../components/flexs';
import { Label } from '../components/texts';

const NotFoundPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <FlexCenter style={{ height: `calc(50vh)` }}>
        <Label>{'>+++++++4+[>++++++<-]>++++.----.++++.'}</Label>
      </FlexCenter>
    </PageDiv>
  );
};

export default React.memo(NotFoundPage);
