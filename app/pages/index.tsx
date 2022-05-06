import React from 'react';
import { NextPage } from 'next';
import { Header } from '../components/navs/header';
import { PaddedBox, PageDiv } from '../components/divs';
import { ProjectRow } from '../components/layouts/projectRow';
import { FlexCenter, FlexEnds } from '../components/flexs';
import { Label, Text } from '../components/texts';
import { ProjectBuilder } from '../components/layouts/projectBuilder';
import { Footer } from '../components/navs/footer';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <ProjectBuilder />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
