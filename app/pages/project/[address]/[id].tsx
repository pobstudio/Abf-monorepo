import React from 'react';
import { NextPage } from 'next';
import { Header } from '../../../components/navs/header';
import { PageDiv } from '../../../components/divs';
import { Footer } from '../../../components/navs/footer';
import { Token } from '../../../components/layouts/token';

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
