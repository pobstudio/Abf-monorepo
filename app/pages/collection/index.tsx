import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { ProjectGrid } from '../../components/layouts/projectGrid';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

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
