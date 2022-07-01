import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import styled from 'styled-components';
import {
  useAllRendererMetadata,
  useRendererLabel,
} from '../../hooks/useRenderer';
import { RendererMetadata } from '../../types';
import { prettifyCountableNumber, shortenHexString } from '../../utils/hex';
import { getEtherscanAddressUrl } from '../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  DetailRowsContainer,
} from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { Flex, FlexEnds } from '../flexs';
import { A, Label, LabelAnchor, P, Text } from '../texts';
import { DocumentationFooter } from './documentation';

export const Renderers: FC = () => {
  const rendererMetadatas = useAllRendererMetadata();

  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <Jumbotron />
        <DetailRowsContainer>
          <RendererMetadataTableContainer>
            {rendererMetadatas?.map((rm) => (
              <RendererMetadataTable
                {...rm}
                key={`renderer-metadata-table-${rm.id.toHexString()}`}
              />
            ))}
          </RendererMetadataTableContainer>
          <DocumentationFooter />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

const RendererMetadataTable: FC<RendererMetadata> = ({
  id,
  address,
  outSize,
  additionalMetadataURI,
  registeredAt,
}) => {
  const rendererLabel = useRendererLabel(address);
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>(false);
  useEffect(() => {
    let clearToken: number | undefined = undefined;
    if (copied) {
      clearToken = window.setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
    return () => {
      clearTimeout(clearToken);
    };
  }, [copied]);

  return (
    <DetailRowsContainer>
      <Flex>
        <Text style={{ textTransform: 'uppercase', marginRight: 12 }}>
          <strong>{`R-${id
            .toString()
            .padStart(3, '0')} "${rendererLabel}"`}</strong>
        </Text>
      </Flex>
      <FlexEnds>
        <Label style={{ textTransform: 'uppercase' }}>CONTRACT</Label>
        <Flex>
          <A href={getEtherscanAddressUrl(address)} target={'_blank'}>
            {shortenHexString(address)}
          </A>
          <LabelAnchor
            onClick={() => {
              copyToClipboard(address);
              setCopied(true);
            }}
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              marginLeft: 12,
            }}
          >
            {copied ? '(COPIED)' : '(COPY)'}
          </LabelAnchor>
        </Flex>
      </FlexEnds>
      <DetailRow>
        {[
          'DISCOVERED AT',
          format(new Date(registeredAt * 1000), 'yyyy-MM-dd hh:mm'),
        ]}
      </DetailRow>
      <DetailRow>
        {['REQUIRED INPUT BYTE STRING SIZE', prettifyCountableNumber(outSize)]}
      </DetailRow>
      <DetailAnchorRow href={`/renderer/${address}`}>
        {['DOCUMENTATION', 'FILE']}
      </DetailAnchorRow>
    </DetailRowsContainer>
  );
};

const RendererMetadataTableContainer = styled.div`
  > div + div {
    margin-top: 42px;
  }
`;

const Jumbotron: FC = () => {
  return (
    <DetailRowsContainer>
      <div>
        <P>
          <strong>SUBJECT: CURRENT DECLASSIFIED LIST OF RENDERERS</strong>
        </P>
      </div>
      <div>
        <P>
          Contained in this document is the corp's up-to-date list of all
          Renderers excavated by the ABFC and the broader public sphere. This
          repository is by no means exhaustive. Please consult each renderer
          carefully before use.
        </P>
      </div>
    </DetailRowsContainer>
  );
};
