import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { DocsBackButton } from '../../components/layouts/docs';
import { Renderers } from '../../components/layouts/renderers';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const RenderersPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <DocsBackButton />
      <Renderers />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(RenderersPage);
