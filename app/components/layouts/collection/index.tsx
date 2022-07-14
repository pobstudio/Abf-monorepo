import React from 'react';
import styled from 'styled-components';
import { useCollection } from '../../../hooks/useCollections';
import { convertHexStrToAscii } from '../../../utils/brainFuck';
import { DetailRow, DetailRowsContainer } from '../../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { PrimaryButton } from '../../inputs/button';
import { PlaceholderRender } from '../../renders';
import { H1, Label } from '../../texts';

export const Collection: React.FC<{ address: string | undefined }> = ({
  address,
}) => {
  const collection = useCollection(address);
  console.log(collection, 'collection');
  return (
    <>
      <DetailRowsContainer>
        <PlaceholderRender />
      </DetailRowsContainer>
      <br />
      <br />

      <TwoColumnContainer>
        <div>
          <TwoColumnContentContainer>
            <BrainfuckCodeContainer>
              {convertHexStrToAscii(collection?.code ?? '')}
            </BrainfuckCodeContainer>
          </TwoColumnContentContainer>

          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <DetailRowsContainer>
              <DetailRow>{['OWNER', collection?.owner ?? '-']}</DetailRow>
              <DetailRow>{['RENDERER', collection?.renderer ?? '-']}</DetailRow>
              <DetailRow>
                {[
                  'RENDERER ROYALTY',
                  collection?.rendererRoyaltyFraction ?? '-',
                ]}
              </DetailRow>
              <DetailRow>{['SEED', collection?.seed ?? '-']}</DetailRow>
              <DetailRow>
                {['CONSTANTS', collection?.constants ?? '-']}
              </DetailRow>
            </DetailRowsContainer>
          </TwoColumnContentContainer>
        </div>
        <div>
          <TwoColumnContentContainer
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
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
  padding: 100px;
  font-size: 12px;
  line-height: 16px;
  overflow-wrap: anywhere;
  background: rgba(0, 0, 0, 0.05);
`;
