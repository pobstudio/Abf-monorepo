import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../components/divs';
import { ProjectBuilder } from '../components/layouts/projectBuilder';
import { Footer } from '../components/navs/footer';
import { Header } from '../components/navs/header';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <ProjectBuilder />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
