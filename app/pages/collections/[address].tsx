import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';
import { PageDiv } from '../../components/divs';
import { Collections } from '../../components/layouts/collection/collections';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';
import {
  DEFAULT_DESCRIPTION,
  GLOBAL_OG_BANNER,
  PROD_LINK,
  TWITTER_HANDLE,
} from '../../constants';
import { ROUTES } from '../../constants/routes';
import { useENSorHex } from '../../hooks/useENS';
import { shortenHexString } from '../../utils/hex';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { address } = context.query;
  return {
    props: {
      address,
    },
  };
};

const CollectionsIndexPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { address } = props;
  const owner = useENSorHex(address);
  const seoTitle = useMemo(() => {
    if (!owner) {
      return `${shortenHexString(
        address,
      )} - Absolute Brain F**K NFT Collection`;
    }
    return `${owner} - Absolute Brain F**K NFT Collections - ${address}`;
  }, [address, owner]);
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={DEFAULT_DESCRIPTION}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `${PROD_LINK}/${ROUTES.COLLECTIONS}/${address}`,
          title: seoTitle,
          description: DEFAULT_DESCRIPTION,
          site_name: 'ABF',
          images: [
            {
              url: GLOBAL_OG_BANNER,
              alt: 'ABF',
            },
          ],
        }}
        twitter={{
          handle: TWITTER_HANDLE,
          site: TWITTER_HANDLE,
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'twitter:image',
            content: GLOBAL_OG_BANNER,
          },
          {
            name: 'twitter:url',
            content: `${PROD_LINK}/${ROUTES.COLLECTIONS}/${address}`,
          },
        ]}
      />
      <PageDiv>
        <Header />
        <Collections address={address} />
        <Footer />
      </PageDiv>
    </>
  );
};
export default React.memo(CollectionsIndexPage);
