import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { PageDiv } from '../components/divs';
import { Explore } from '../components/layouts/collection/explore';
import { Footer } from '../components/navs/footer';
import { Header } from '../components/navs/header';
import { GLOBAL_OG_BANNER, PROD_LINK, TWITTER_HANDLE } from '../constants';
import { ROUTES } from '../constants/routes';

const IndexPage: NextPage = () => {
  const seoTitle = `Explore ABF NFT Collections - Absolute Brain F**k. ${TWITTER_HANDLE}`;
  const seoDescription = `Explore Brainfuck NFT Collections created via the Project Builder. View art available for minting & Brainfuck! code.`;
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `${PROD_LINK}/${ROUTES.EXPLORE}`,
          title: seoTitle,
          description: seoDescription,
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
            content: `${PROD_LINK}/${ROUTES.EXPLORE}`,
          },
        ]}
      />
      <PageDiv>
        <Header />
        <Explore />
        <Footer />
      </PageDiv>
    </>
  );
};
export default React.memo(IndexPage);
