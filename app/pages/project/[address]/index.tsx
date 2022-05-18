import React from 'react';
import { NextPage } from 'next';
import { Header } from '../../../components/navs/header';
import { PageDiv } from '../../../components/divs';
import { Footer } from '../../../components/navs/footer';
import { Project } from '../../../components/layouts/project';

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
