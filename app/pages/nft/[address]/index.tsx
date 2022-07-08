import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../../components/divs';
import { Project } from '../../../components/layouts/project';
import { Footer } from '../../../components/navs/footer';
import { Header } from '../../../components/navs/header';

// NOTE: DO NOT CHANGE THE PATH OF THIS PAGE, IT IS HARDCODED IN THE SMARTCONTRACT
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
