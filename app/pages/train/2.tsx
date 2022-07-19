import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { Tutorial2 } from '../../components/layouts/tutorials/2';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const Tutorial2Page: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Tutorial2 />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(Tutorial2Page);
