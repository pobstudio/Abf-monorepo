import { BigNumber, utils } from 'ethers';
import { NextSeo } from 'next-seo';
import React from 'react';
import styled from 'styled-components';
import {
  GLOBAL_OG_BANNER,
  PROD_LINK,
  TWITTER_HANDLE,
} from '../../../constants';
import { ROUTES } from '../../../constants/routes';
import { useCollectionContext } from '../../../contexts/collection';
import { useMintBrainfuckNFT } from '../../../hooks/useMint';
import { shortenHexString } from '../../../utils/hex';
import { getEtherscanAddressUrl, getOpenSeaUrl } from '../../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
} from '../../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { PrimaryButton, TertiaryButton } from '../../inputs/button';
import { Render } from '../../renders';
import { H1, Label, LabelAnchor } from '../../texts';

export const Collection: React.FC = () => {
  const {
    collectionMetadata: collection,
    currentSampleTokenRenderState: output,
    rendererMetadata,
    rendererLabel,
    collectionAddress,
    brainfuckCode,
    isActive,
    activateCollection,
    isOwner,
  } = useCollectionContext();
  return (
    <>
      <NextSeo
        title={`${collection?.name} - Absolute Brain F**K NFT Collection - ${collectionAddress}`}
        description={brainfuckCode}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `${PROD_LINK}/${ROUTES.COLLECTION}/${collectionAddress}`,
          title: `${collection?.name} - Absolute Brain F**K NFT Collection - ${collectionAddress}`,
          description: brainfuckCode,
          site_name: 'ABF',
          images: [
            {
              // url: getArtworkPreviewUrl(hash),
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
            // content: getArtworkPreviewUrl(hash),
            content: GLOBAL_OG_BANNER,
          },
          {
            name: 'twitter:url',
            content: `${PROD_LINK}/${ROUTES.COLLECTION}/${collectionAddress}`,
          },
        ]}
      />
      <TwoColumnContainer>
        <div>
          <TwoColumnContentContainer style={{ padding: 0 }}>
            <Render output={output} rendererMetadata={rendererMetadata} />
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <BrainfuckCodeContainer>{brainfuckCode}</BrainfuckCodeContainer>
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <DetailRowsContainer>
              <DetailAnchorRow
                href={getEtherscanAddressUrl(collection?.owner ?? '')}
              >
                {['OWNER', shortenHexString(collection?.owner ?? '') ?? '-']}
              </DetailAnchorRow>
              <DetailAnchorRow
                href={getEtherscanAddressUrl(collection?.renderer ?? '')}
              >
                {['RENDERER', rendererLabel ?? '-']}
              </DetailAnchorRow>
              <DetailRow>
                {[
                  'RENDERER ROYALTY',
                  collection?.rendererRoyaltyFraction ?? '-',
                ]}
              </DetailRow>
              <DetailRow>{['SEED', collection?.seed ?? '-']}</DetailRow>
              {/* <DetailRow>
                {['CONSTANTS', collection?.constants ?? '-']}
              </DetailRow> */}
            </DetailRowsContainer>
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <LinksContainer>
              <LabelAnchor
                href={getOpenSeaUrl(collectionAddress ?? '', '0')}
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW ON OPENSEA
              </LabelAnchor>
              <LabelAnchor
                href={getEtherscanAddressUrl(collectionAddress ?? '')}
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW ON ETHERSCAN
              </LabelAnchor>
            </LinksContainer>
          </TwoColumnContentContainer>
        </div>
        <div>
          <TwoColumnContentContainer>
            <TitleContainer>
              <Label>TITLE</Label>
              <H1>{collection?.name}</H1>
              <ThreePartMintButton />
              {isOwner && !isActive && (
                <TertiaryButton
                  style={{ marginTop: 20 }}
                  onClick={() => activateCollection()}
                >
                  ACTIVATE
                </TertiaryButton>
              )}
            </TitleContainer>
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <DetailRowsContainer>
              <DetailRow>
                {['SUPPLY', collection?.mintingSupply ?? '-']}
              </DetailRow>
              <DetailRow>
                {[
                  'PRICE',
                  `${utils.formatEther(
                    BigNumber.from(collection?.price ?? '0'),
                  )} ETH`,
                ]}
              </DetailRow>
              <DetailRow>
                {['IS ACTIVE', isActive?.toString()?.toUpperCase() ?? '-']}
              </DetailRow>
            </DetailRowsContainer>
          </TwoColumnContentContainer>
        </div>
      </TwoColumnContainer>
    </>
  );
};

export const ThreePartMintButton: React.FC = () => {
  const {
    collectionAddress,
    isActive,
    incrementAmountToMint,
    decrementAmountToMint,
    amountToMint,
  } = useCollectionContext();
  const { mint } = useMintBrainfuckNFT(collectionAddress);
  return (
    <ThreePartMintButtonContainer>
      <TertiaryButton onClick={() => decrementAmountToMint()}>-</TertiaryButton>
      <PrimaryButton
        disabled={!isActive}
        onClick={() => (isActive ? mint(amountToMint) : confirm('fuck off'))}
      >
        MINT: {`{{ ${amountToMint} }}`}
      </PrimaryButton>
      <TertiaryButton onClick={() => incrementAmountToMint()}>+</TertiaryButton>
    </ThreePartMintButtonContainer>
  );
};
const ThreePartMintButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 50px;
  ${TertiaryButton} {
    width: fit-content;
    height: fit-content;
  }
`;

const LinksContainer = styled(DetailRowsContainer)`
  ${LabelAnchor} {
    display: block;
  }
  > ${LabelAnchor} + ${LabelAnchor} {
    margin-top: 20px;
  }
`;

const TitleContainer = styled.div`
  text-align: left;
  width: 100%;
  ${Label} {
    margin-bottom: 10px;
  }
  ${H1} {
    font-size: 50px;
  }
`;

const BrainfuckCodeContainer = styled.div`
  width: 100%;
  height: fit-content;
  /* padding: 100px; */
  font-size: 12px;
  line-height: 16px;
  overflow-wrap: anywhere;
  /* background: rgba(0, 0, 0, 0.05); */
`;
