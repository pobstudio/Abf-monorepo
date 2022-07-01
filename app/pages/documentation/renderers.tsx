import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { Renderers } from '../../components/layouts/renderers';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const RenderersPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Renderers />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(RenderersPage);
