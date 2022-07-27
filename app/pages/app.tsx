import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { PageDiv } from '../components/divs';
import { ProjectBuilder } from '../components/layouts/projectBuilder';
import { Footer } from '../components/navs/footer';
import { Header } from '../components/navs/header';
import { GLOBAL_OG_BANNER, PROD_LINK, TWITTER_HANDLE } from '../constants';
import { ROUTES } from '../constants/routes';

const IndexPage: NextPage = () => {
  const seoTitle = `Build ABF NFTs - Absolute Brain F**k. ${TWITTER_HANDLE}`;
  const seoDescription = `Build your Brainfuck NFT Project. Write Brainfuck! code, swap Renderers, & view your Art.`;
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `${PROD_LINK}/${ROUTES.BUILDER}`,
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
            content: `${PROD_LINK}/${ROUTES.BUILDER}`,
          },
        ]}
      />
      <PageDiv>
        <Header />
        <ProjectBuilder />
        <Footer />
      </PageDiv>
    </>
  );
};
export default React.memo(IndexPage);
