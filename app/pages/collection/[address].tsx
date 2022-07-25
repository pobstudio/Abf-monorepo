import { ADDRESS_REGEX } from '@abf-monorepo/types';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';
import { PageDiv } from '../../components/divs';
import { Collection } from '../../components/layouts/collection';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';
import {
  DEFAULT_DESCRIPTION,
  PROD_LINK,
  TWITTER_HANDLE,
} from '../../constants';
import { ROUTES } from '../../constants/routes';
import { CollectionProvider } from '../../contexts/collection';
import { shortenHexString } from '../../utils/hex';
import { getPrefetchDataForCollection } from '../../utils/prefetch';
import { getArtworkPreviewUrl } from '../../utils/urls';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { address } = context.query;

  if (typeof address !== 'string' || !ADDRESS_REGEX.test(address as string)) {
    return { props: { address } };
  }

  const prefetchDataRaw = await getPrefetchDataForCollection(address);
  const prefetchData = prefetchDataRaw
    ? JSON.parse(JSON.stringify(prefetchDataRaw))
    : undefined;

  if (!prefetchData) {
    return {
      props: {
        address,
      },
    };
  }
  return {
    props: {
      address,
      prefetchData,
    },
  };
};

const CollectionIndexPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { address, prefetchData } = props;
  const seoTitle = useMemo(() => {
    if (!prefetchData?.name) {
      return `${shortenHexString(
        address,
      )} - Absolute Brain F**K NFT Collection`;
    }
    return `${prefetchData?.name} - Absolute Brain F**K NFT Collection - ${address}`;
  }, [address, prefetchData?.name]);
  const seoDescription = useMemo(() => {
    if (!prefetchData?.code) {
      return DEFAULT_DESCRIPTION;
    }
    return `${prefetchData?.code}`;
  }, [prefetchData?.code]);
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `${PROD_LINK}/${ROUTES.COLLECTION}/${address}`,
          title: seoTitle,
          description: seoDescription,
          site_name: 'ABF',
          images: [
            {
              url: getArtworkPreviewUrl(
                prefetchData.output,
                prefetchData.renderer,
              ),
              // url: GLOBAL_OG_BANNER,
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
            content: getArtworkPreviewUrl(
              prefetchData?.output,
              prefetchData?.renderer,
            ),
            // content: GLOBAL_OG_BANNER,
          },
          {
            name: 'twitter:url',
            content: `${PROD_LINK}/${ROUTES.COLLECTION}/${address}`,
          },
        ]}
      />
      <PageDiv>
        <Header />
        <CollectionProvider address={address}>
          <Collection />
        </CollectionProvider>
        <Footer />
      </PageDiv>
    </>
  );
};
export default React.memo(CollectionIndexPage);
