import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { DocsBackButton } from '../../components/layouts/docs';
import { Origins } from '../../components/layouts/origin';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const OriginPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <DocsBackButton />
      <Origins />
      <Footer />
    </PageDiv>
  );
};

export default React.memo(OriginPage);
