import { BigNumber, utils } from 'ethers';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import {
  BrainfuckCodeContainer,
  BrainfuckCodeLabel,
  LinksContainer,
  TitleContainer,
} from '.';
import { ROUTES } from '../../../constants/routes';
import { useCollectionContext } from '../../../contexts/collection';
import { shortenHexString } from '../../../utils/hex';
import {
  getEtherscanAddressUrl,
  getEtherscanTokenUrl,
  getOpenSeaUrl,
} from '../../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
} from '../../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { ArrowIcon } from '../../icons/arrow';
import { Render } from '../../renders';
import { BackButtonAnchor, H1, Label, LabelAnchor } from '../../texts';

export const Token: FC<{ id: number }> = ({ id }) => {
  const {
    collectionMetadata: collection,
    currentSampleTokenRenderState: output,
    rendererMetadata,
    collectionAddress,
    brainfuckCode,
    currentSampleTokenId,
    setCurrentSampleTokenId,
  } = useCollectionContext();
  useEffect(() => {
    if (currentSampleTokenId !== id) {
      setCurrentSampleTokenId(id);
    }
  }, [id, currentSampleTokenId, setCurrentSampleTokenId]);
  return (
    <>
      <TokenBackButton />
      <TwoColumnContainer>
        <div>
          <TwoColumnContentContainer style={{ padding: 0 }}>
            <Render output={output} rendererMetadata={rendererMetadata} />
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <BrainfuckCodeContainer>{brainfuckCode}</BrainfuckCodeContainer>
            <BrainfuckCodeLabel>{`< TRANSPILED BRAINFUCK! CODE >`}</BrainfuckCodeLabel>
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
                {['RENDERER', rendererMetadata?.name ?? '-']}
              </DetailAnchorRow>
              <DetailRow>
                {[
                  'RENDERER ROYALTY',
                  collection?.rendererRoyaltyFraction ?? '-',
                ]}
              </DetailRow>
              <DetailRow>{['SEED', collection?.seed ?? '-']}</DetailRow>
              {/* <DetailRow>{['CONSTANTS', collection?.constants ?? '-']}</DetailRow> */}
              {/* <DetailRow>
                {['OUTPUT', !!output ? (output as any)['output'] : '-']}
              </DetailRow> */}
            </DetailRowsContainer>
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <LinksContainer>
              <LabelAnchor
                href={getOpenSeaUrl(collectionAddress ?? '', id?.toString())}
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW ON OPENSEA
              </LabelAnchor>
              <LabelAnchor
                href={getEtherscanTokenUrl(collectionAddress ?? '', id)}
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
            </TitleContainer>
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <DetailRowsContainer>
              {/* <FlexEnds>
                <Label>PREVIEW</Label>
                <CollectionTokenIdSwitcher />
              </FlexEnds> */}
              <DetailRow>
                {['TOKEN ID', `${id} / ${collection?.mintingSupply}`]}
              </DetailRow>
              <DetailRow>
                {[
                  'PRICE',
                  `${utils.formatEther(
                    BigNumber.from(collection?.price ?? '0'),
                  )} ETH`,
                ]}
              </DetailRow>
            </DetailRowsContainer>
          </TwoColumnContentContainer>
        </div>
      </TwoColumnContainer>
    </>
  );
};

export const TokenBackButton: React.FC = () => {
  const { collectionAddress } = useCollectionContext();
  return (
    <Link passHref href={`${ROUTES.COLLECTION}/${collectionAddress}`}>
      <BackButtonAnchor>
        <ArrowIcon />
        &nbsp;&nbsp;VIEW COLLECTION
      </BackButtonAnchor>
    </Link>
  );
};
