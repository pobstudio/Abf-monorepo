import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { Specification } from '../../components/layouts/specification';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const SpecificationPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Specification />
      <Footer />
    </PageDiv>
  );
};

export default React.memo(SpecificationPage);
