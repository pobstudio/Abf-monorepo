import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../components/divs';
import { FlexCenter } from '../components/flexs';
import { Header } from '../components/navs/header';
import { Label } from '../components/texts';

const NotFoundPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <FlexCenter style={{ height: `calc(50vh)` }}>
        <Label>{'4>++++++++[>++++++<-0]>++++.----.++++.4'}</Label>
      </FlexCenter>
    </PageDiv>
  );
};

export default React.memo(NotFoundPage);
