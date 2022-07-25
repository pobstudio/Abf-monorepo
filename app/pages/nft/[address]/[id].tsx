import { ADDRESS_REGEX } from '@abf-monorepo/types';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import React from 'react';
import { PageDiv } from '../../../components/divs';
import { Token } from '../../../components/layouts/collection/token';
import { Footer } from '../../../components/navs/footer';
import { Header } from '../../../components/navs/header';
import { CollectionProvider } from '../../../contexts/collection';
import {
  CollectionPrefetchData,
  getPrefetchDataForCollection,
} from '../../../utils/prefetch';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { address, id } = context.query;

  if (typeof address !== 'string' || !ADDRESS_REGEX.test(address as string)) {
    return { props: { address, id } };
  }

  if (typeof id !== 'string') {
    return { props: { address, id } };
  }

  const prefetchDataRaw = await getPrefetchDataForCollection(address);
  const prefetchData = prefetchDataRaw
    ? (JSON.parse(JSON.stringify(prefetchDataRaw)) as CollectionPrefetchData)
    : undefined;

  if (!prefetchData) {
    return {
      props: {
        address,
        id,
      },
    };
  }
  return {
    props: {
      address,
      id,
      prefetchData,
    },
  };
};

const TokenPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { address, id, prefetchData } = props;
  return (
    <>
      <PageDiv>
        <Header />
        <CollectionProvider address={address}>
          <Token id={id} />
        </CollectionProvider>
        <Footer />
      </PageDiv>
    </>
  );
};
export default React.memo(TokenPage);
