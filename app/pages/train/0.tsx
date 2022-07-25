import { NextPage } from 'next';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { TutorialsBackButton } from '../../components/layouts/tutorials';
import { Recruitment } from '../../components/layouts/tutorials/0';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const RecruitmentPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <TutorialsBackButton />
      <Recruitment />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(RecruitmentPage);
