import React from 'react';
import styled from 'styled-components';
import { useCollectionContext } from '../../../contexts/collection';
import { convertHexStrToAscii } from '../../../utils/brainFuck';
import { shortenHexString } from '../../../utils/hex';
import { getEtherscanAddressUrl } from '../../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
} from '../../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { PrimaryButton } from '../../inputs/button';
import { Render } from '../../renders';
import { H1, Label, LabelAnchor } from '../../texts';

export const Collection: React.FC = () => {
  const {
    collectionMetadata: collection,
    currentSampleTokenRenderState: output,
    rendererMetadata,
    rendererLabel,
  } = useCollectionContext();
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
            <BrainfuckCodeContainer>
              {convertHexStrToAscii(collection?.code ?? '')}
            </BrainfuckCodeContainer>
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
                href={`ROUTES.DOCS.RENDERERS`}
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW ON OPENSEA
              </LabelAnchor>
              <LabelAnchor
                href={`ROUTES.DOCS.RENDERERS`}
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
              <PrimaryButton>MINT</PrimaryButton>
            </TitleContainer>
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <DetailRowsContainer>
              <DetailRow>
                {['SUPPLY', collection?.mintingSupply ?? '-']}
              </DetailRow>
              <DetailRow>{['PRICE', collection?.price ?? '-']}</DetailRow>
            </DetailRowsContainer>
          </TwoColumnContentContainer>
        </div>
      </TwoColumnContainer>
    </>
  );
};

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
  ${PrimaryButton} {
    margin-top: 50px;
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
