import React from 'react';
import { NextPage } from 'next';
import { Header } from '../components/navs/header';
import { PageDiv } from '../components/divs';
import { ProjectRow } from '../components/layouts/projectRow';

const IndexPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <ProjectRow />
    </PageDiv>
  );
};
export default React.memo(IndexPage);
