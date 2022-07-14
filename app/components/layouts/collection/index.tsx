import { BigNumber } from 'ethers';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useCollection } from '../../../hooks/useCollections';
import {
  useRendererLabel,
  useRendererMetadataStubByProvider,
} from '../../../hooks/useRenderer';
import { RenderCodeOutputState } from '../../../types';
import {
  convertHexStrToAscii,
  getTokenSeed,
  runBrainFuckCode,
} from '../../../utils/brainFuck';
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

export const Collection: React.FC<{ address: string | undefined }> = ({
  address,
}) => {
  const collection = useCollection(address);
  const rendererLabel = useRendererLabel(collection?.renderer);
  const rendererMetadataStub = useRendererMetadataStubByProvider(
    collection?.renderer ?? '',
  );
  const output = useMemo((): RenderCodeOutputState | undefined => {
    const code = convertHexStrToAscii(collection?.code ?? '');
    const tokenSeed =
      collection?.constants && collection?.seed
        ? getTokenSeed(collection.seed, BigNumber.from(0), collection.constants)
        : undefined;
    if (!code || !tokenSeed) {
      return undefined;
    }
    try {
      const input: number[] = [];
      for (let i = 2; i < tokenSeed.length; i += 2) {
        input.push(parseInt(tokenSeed.slice(i, i + 2), 16));
      }
      const output = runBrainFuckCode(code, input);
      return {
        output,
        status: 'success',
        warnings: [],
      };
    } catch (e: any) {
      return {
        message: e.message,
        status: 'error',
      };
    }
  }, [collection?.code]);
  return (
    <>
      <TwoColumnContainer>
        <div>
          <TwoColumnContentContainer style={{ padding: 0 }}>
            <Render output={output} rendererMetadata={rendererMetadataStub} />
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
