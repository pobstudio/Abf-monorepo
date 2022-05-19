import React from 'react';
import { NextPage } from 'next';
import { Header } from '../components/navs/header';
import { PageDiv } from '../components/divs';
import { FlexCenter, FlexEnds } from '../components/flexs';
import { Label, Text } from '../components/texts';
import { ProjectBuilder } from '../components/layouts/projectBuilder';
import { Footer } from '../components/navs/footer';
import { Renderers } from '../components/layouts/renderers';

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
