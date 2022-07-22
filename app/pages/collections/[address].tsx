import { ADDRESS_REGEX } from '@abf-monorepo/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { PageDiv } from '../../components/divs';
import { Collections } from '../../components/layouts/collection/collections';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';

const CollectionsIndexPage: NextPage = () => {
  const router = useRouter();
  const address = useMemo(() => {
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
      <Collections address={address} />
      <Footer />
    </PageDiv>
  );
};
export default React.memo(CollectionsIndexPage);
