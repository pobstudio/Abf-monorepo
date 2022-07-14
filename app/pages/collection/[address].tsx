import { ADDRESS_REGEX } from '@abf-monorepo/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { PageDiv } from '../../components/divs';
import { Collection } from '../../components/layouts/collection';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';
import { CollectionProvider } from '../../contexts/collection';

const CollectionIndexPage: NextPage = () => {
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
      <CollectionProvider address={address}>
        <Collection />
      </CollectionProvider>
      <Footer />
    </PageDiv>
  );
};
export default React.memo(CollectionIndexPage);
