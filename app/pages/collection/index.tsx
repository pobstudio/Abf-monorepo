import React from 'react';
import { NextPage } from 'next';
import { Header } from '../../components/navs/header';
import { PageDiv } from '../../components/divs';
import { Footer } from '../../components/navs/footer';
import { ProjectGrid } from '../../components/layouts/projectGrid';

const CollectionIndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <ProjectGrid />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(CollectionIndexPage);
