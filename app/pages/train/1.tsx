import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { TutorialsBackButton } from '../../components/layouts/tutorials';
import { Tutorial1 } from '../../components/layouts/tutorials/1';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const Tutorial1Page: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <TutorialsBackButton />
      <Tutorial1 />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(Tutorial1Page);
