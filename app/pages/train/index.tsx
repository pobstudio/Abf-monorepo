import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { TutorialsRoot } from '../../components/layouts/tutorials';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <TutorialsRoot />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
