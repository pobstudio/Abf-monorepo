import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { Exec } from '../../components/layouts/exec';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Exec />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
