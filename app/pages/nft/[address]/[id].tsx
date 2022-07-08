import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../../components/divs';
import { Token } from '../../../components/layouts/token';
import { Footer } from '../../../components/navs/footer';
import { Header } from '../../../components/navs/header';

const CollectionPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Token />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(CollectionPage);
