import { BigNumber, utils } from 'ethers';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ROUTES } from '../../../constants/routes';
import { useCollectionContext } from '../../../contexts/collection';
import { useMintHistoryByCollection } from '../../../hooks/useCollections';
import { useENSorHex } from '../../../hooks/useENS';
import { useMintBrainfuckNFT } from '../../../hooks/useMint';
import { TokenTransferStub } from '../../../types';
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
import { FlexEnds } from '../../flexs';
import { PrimaryButton, TertiaryButton } from '../../inputs/button';
import { Render } from '../../renders';
import { A, H1, Label, LabelAnchor, Text } from '../../texts';
import { CollectionTokenIdSwitcher } from '../tokenIdSwitcher';

export const Collection: React.FC = () => {
  const {
    collectionMetadata: collection,
    currentSampleTokenRenderState: output,
    rendererMetadata,
    collectionAddress,
    brainfuckCode,
    isActive,
    activateCollection,
    isOwner,
    currentTokenId,
  } = useCollectionContext();
  const mints = useMintHistoryByCollection(collectionAddress);
  return (
    <>
      <TwoColumnContainer>
        <div>
          <TwoColumnContentContainer style={{ padding: 0 }}>
            <Render output={output} rendererMetadata={rendererMetadata} />
          </TwoColumnContentContainer>
          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <DetailRowsContainer style={{ position: 'relative' }}>
              <BrainfuckCodeContainer>{brainfuckCode}</BrainfuckCodeContainer>
              <br />
              <BrainfuckCodeLabel>{`< TRANSPILED BRAINFUCK! CODE >`}</BrainfuckCodeLabel>
            </DetailRowsContainer>
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
              <FlexEnds>
                <Label>TITLE</Label>
                <CollectionTokenIdSwitcher />
              </FlexEnds>
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
              {/* <FlexEnds>
                <Label>PREVIEW</Label>
                <CollectionTokenIdSwitcher />
              </FlexEnds> */}
              <DetailRow>
                {['SUPPLY', `${currentTokenId} / ${collection?.mintingSupply}`]}
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
          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <DetailRowsContainer>
              <Label>MINT SHEET</Label>
              {mints?.map((mint: TokenTransferStub, _index: number) => (
                <MintCell
                  key={`${ROUTES.NFT}/${collectionAddress}/${mint.id}`}
                  mint={mint}
                />
              ))}
            </DetailRowsContainer>
          </TwoColumnContentContainer>
        </div>
      </TwoColumnContainer>
    </>
  );
};

const MintCell: React.FC<{ mint: TokenTransferStub }> = ({ mint }) => {
  const { to, timestamp, id, collection } = mint;
  const minter = useENSorHex(to);
  const paddedTokenId = String(id).padStart(3, '0');
  const time = new Date(Number(timestamp) * 1000).toLocaleString();
  return (
    <DetailRowsContainer>
      <FlexEnds style={{ alignItems: 'flex-start' }}>
        <div>
          <Text>{minter}</Text>
          <Label style={{ marginTop: 2 }}>{time}</Label>
        </div>
        <Link passHref href={`${ROUTES.NFT}/${collection}/${id}`}>
          <A>{paddedTokenId}</A>
        </Link>
      </FlexEnds>
    </DetailRowsContainer>
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

export const BrainfuckCodeLabel = styled(Label)`
  position: absolute;
  text-align: center;
  bottom: -75px;
  left: 0;
  right: 0;
`;

export const LinksContainer = styled(DetailRowsContainer)`
  ${LabelAnchor} {
    display: block;
  }
  > ${LabelAnchor} + ${LabelAnchor} {
    margin-top: 20px;
  }
`;

export const TitleContainer = styled.div`
  text-align: left;
  width: 100%;
  ${Label} {
    margin-bottom: 10px;
  }
  ${H1} {
    font-size: 50px;
  }
`;

export const BrainfuckCodeContainer = styled.div`
  width: 100%;
  height: fit-content;
  /* padding: 100px; */
  font-size: 12px;
  line-height: 16px;
  overflow-wrap: anywhere;
  /* background: rgba(0, 0, 0, 0.05); */
`;
