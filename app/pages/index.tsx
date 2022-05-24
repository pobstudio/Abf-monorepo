import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Header } from '../components/navs/header';
import { PageDiv } from '../components/divs';
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
