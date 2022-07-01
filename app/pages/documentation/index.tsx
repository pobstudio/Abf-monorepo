import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { Documentation } from '../../components/layouts/documentation';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Documentation />
      {/* <ProjectBuilder /> */}
      <Footer />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
