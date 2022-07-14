import { format } from 'date-fns';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { ROUTES } from '../../constants/routes';
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
  DetailRowsTableContainer,
} from '../details/rows';
import {
  OneColumnContainer,
  OneColumnContentContainer,
} from '../divs/oneColumn';
import { Flex, FlexEnds } from '../flexs';
import { A, Label, LabelAnchor, P, Text } from '../texts';
import { DocumentationFooter } from './docs';

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
          Contained in this document is the Corps' up-to-date list of all
          Renderers excavated by the ABFC and the broader public sphere. This
          repository is by no means exhaustive. Please consult each renderer
          carefully before use.
        </P>
      </div>
      <div>
        <Link passHref href={`${ROUTES.DOCS.SPEC}#renderers`}>
          <LabelAnchor style={{ cursor: 'pointer' }}>
            VIEW RENDERER DOCUMENTATION
          </LabelAnchor>
        </Link>
      </div>
    </DetailRowsContainer>
  );
};

export const Renderers: FC = () => {
  const rendererMetadatas = useAllRendererMetadata();

  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <Jumbotron />
        <DetailRowsContainer>
          <DetailRowsTableContainer>
            {rendererMetadatas?.map((rm) => (
              <RendererMetadataTable
                {...rm}
                key={`renderer-metadata-table-${rm.id.toHexString()}`}
              />
            ))}
          </DetailRowsTableContainer>
          <br />
          <br />
          <DocumentationFooter />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

const RendererMetadataTable: FC<RendererMetadata> = ({
  id,
  address,
  propsSize,
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
      <DetailAnchorRow href={`/renderer/${address}`}>
        {['DOCUMENTATION', 'VIEW FILE']}
      </DetailAnchorRow>
      <FlexEnds>
        <Label style={{ textTransform: 'uppercase' }}>CONTRACT</Label>
        <Flex>
          <LabelAnchor
            onClick={() => {
              copyToClipboard(address);
              setCopied(true);
            }}
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              marginRight: 12,
            }}
          >
            {copied ? '(COPIED)' : '(COPY)'}
          </LabelAnchor>
          <A href={getEtherscanAddressUrl(address)} target={'_blank'}>
            {shortenHexString(address)}
          </A>
        </Flex>
      </FlexEnds>
      <DetailRow>
        {[
          'DISCOVERED AT',
          format(new Date(registeredAt * 1000), 'yyyy-MM-dd hh:mm'),
        ]}
      </DetailRow>
      <DetailRow>
        {[
          'REQUIRED INPUT BYTE STRING SIZE',
          prettifyCountableNumber(propsSize),
        ]}
      </DetailRow>
    </DetailRowsContainer>
  );
};
