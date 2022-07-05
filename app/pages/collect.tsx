import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../components/divs';
import { Collect } from '../components/layouts/collect';
import { Footer } from '../components/navs/footer';
import { Header } from '../components/navs/header';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Collect />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
