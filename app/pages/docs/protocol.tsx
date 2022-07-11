import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { PageDiv } from '../../components/divs';
import { ArrowIcon } from '../../components/icons/arrow';
import { ProtocolContracts } from '../../components/layouts/protocolContracts';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';
import { BackButtonAnchor } from '../../components/texts';
import { ROUTES } from '../../constants/routes';

const RenderersPage: NextPage = () => {
  return (
    <PageDiv>
      <Header />
      <Link passHref href={ROUTES.DOCS.INDEX}>
        <BackButtonAnchor>
          <ArrowIcon />
          &nbsp;&nbsp;VIEW DOCS HOME
        </BackButtonAnchor>
      </Link>
      <ProtocolContracts />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(RenderersPage);
