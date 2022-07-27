import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { PageDiv } from '../../components/divs';
import {
  TutorialsBackButton,
  TUTORIALS_MAP,
} from '../../components/layouts/tutorials';
import { Tutorial3 } from '../../components/layouts/tutorials/3';
import { Footer } from '../../components/navs/footer';
import { Header } from '../../components/navs/header';
import { GLOBAL_OG_BANNER, PROD_LINK, TWITTER_HANDLE } from '../../constants';
import { ROUTES } from '../../constants/routes';

const Tutorial3Page: NextPage = () => {
  const seoTitle = `${
    TUTORIALS_MAP[ROUTES.TRAIN['3']]
  } - Learn Brainfuck! - Absolute Brain F**k. ${TWITTER_HANDLE}`;
  const seoDescription = `Start your Brainfuck! training with ABF. Write Brainfuck! code, learn the basics, and how to control a Renderer.`;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `${PROD_LINK}/${ROUTES.TRAIN['3']}`,
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
            content: `${PROD_LINK}/${ROUTES.TRAIN['3']}`,
          },
        ]}
      />
      <PageDiv>
        <Header />
        <TutorialsBackButton />
        <Tutorial3 />
        <Footer />
      </PageDiv>
    </>
  );
};
export default React.memo(Tutorial3Page);
