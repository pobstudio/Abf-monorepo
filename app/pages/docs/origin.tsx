import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { ArrowIcon } from '../../components/icons/arrow';
import { Origins } from '../../components/layouts/origin';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';
import { BackButtonAnchor } from '../../components/texts';
import { ROUTES } from '../../constants/routes';

const OriginPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Link passHref href={ROUTES.DOCS.INDEX}>
        <BackButtonAnchor as={'a'}>
          <ArrowIcon />
          &nbsp;&nbsp;VIEW DOCS HOME
        </BackButtonAnchor>
      </Link>
      <Origins />
      <Footer />
    </PageDiv>
  );
};

export default React.memo(OriginPage);
