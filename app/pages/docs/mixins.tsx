import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { DocsBackButton } from '../../components/layouts/docs';
import { BrainFuckMixins } from '../../components/layouts/mixins';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const MixinsPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <DocsBackButton />
      <BrainFuckMixins />
      <Footer />
    </PageDiv>
  );
};

export default React.memo(MixinsPage);
