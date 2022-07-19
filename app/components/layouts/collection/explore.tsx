import React from 'react';
import { useCollections } from '../../../hooks/useCollections';
import { DetailRowsContainer } from '../../details/rows';
import { H1, P } from '../../texts';
import { CollectionsGrid } from '../grid';

export const Explore: React.FC = () => {
  const collections = useCollections();
  return (
    <>
      {/* <NextSeo
        title={``}
        description={``}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `${HASH_PROD_LINK}${ROUTES.ART.INDEX}/${hash}`,
          title: seoTitle,
          description: seoDescription,
          site_name: 'POB',
          images: [
            {
              url: getArtworkPreviewUrl(hash),
              // width: 800,
              // height: 418,
              alt: 'POB',
            },
          ],
        }}
        twitter={{
          handle: '@prrfbeauty',
          site: '@prrfbeauty',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'twitter:image',
            content: getArtworkPreviewUrl(hash),
          },
          {
            name: 'twitter:url',
            content: `${HASH_PROD_LINK}${ROUTES.ART.INDEX}/${hash}`,
          },
        ]}
      /> */}
      <DetailRowsContainer>
        <div>
          <H1 style={{ opacity: 0.2 }}>ABF COLLECTIONS</H1>
        </div>
        <P>
          These are Brainfuck NFT Collections created via the Project Builder.
        </P>
        <P style={{ opacity: 0.2 }}>
          {
            '++[---------->+<]>.+[--->++++<]>+.+++++.++++++.[++>---<]>--.------------.---[->++++<]>-.-----------.-------.--[--->+<]>---.-------------.-[->+++<]>.------------.+[->+++<]>++.[--->+<]>+.--------.----.+++.+++.-------------.--[--->+<]>-.[->++<]>+.+.++++.'
          }
        </P>
      </DetailRowsContainer>
      <CollectionsGrid collections={collections} />
    </>
  );
};
