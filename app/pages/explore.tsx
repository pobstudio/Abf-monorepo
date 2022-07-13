import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../components/divs';
import { Explore } from '../components/layouts/explore';
import { Footer } from '../components/navs/footer';
import { Header } from '../components/navs/header';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Explore />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
