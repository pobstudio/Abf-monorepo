import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../../components/divs';
import { Project } from '../../../components/layouts/project';
import { Footer } from '../../../components/navs/footer';
import { Header } from '../../../components/navs/header';

const CollectionPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Project />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(CollectionPage);
