import { ADDRESS_REGEX } from '@abf-monorepo/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { PageDiv } from '../../components/divs';
import { RendererDetails } from '../../components/layouts/rendererDetails';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const RendererPage: NextPage = () => {
  const router = useRouter();
  const rendererAddress = useMemo(() => {
    if (!router.query.address) {
      return undefined;
    }
    if (
      typeof router.query.address !== 'string' ||
      !ADDRESS_REGEX.test(router.query.address)
    ) {
      return undefined;
    }
    return router.query.address as string;
  }, [router]);

  return (
    <PageDiv>
      <Header />
      <RendererDetails address={rendererAddress} />
      <Footer />
    </PageDiv>
  );
};

export default React.memo(RendererPage);
