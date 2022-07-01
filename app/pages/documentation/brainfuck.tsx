import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { BrainFuck } from '../../components/layouts/brainfuck';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <BrainFuck />
      {/* <ProjectBuilder /> */}
      <Footer />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
