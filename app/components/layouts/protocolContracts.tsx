import { deployments } from '@abf-monorepo/protocol';
import { FC, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { CHAIN_ID } from '../../constants';
import { shortenHexString } from '../../utils/hex';
import { getEtherscanAddressUrl } from '../../utils/urls';
import { DetailRowsContainer, DetailRowsTableContainer } from '../details/rows';
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
          <strong>SUBJECT: ABF PROTOCOL CONTRACTS</strong>
        </P>
      </div>
      <div>
        <P>
          Contained in this document are the currently in use [ALPHA] contracts
          for the ABF protocol. These contracts have been prepared for use by
          anyone and are not subject to copyright.
        </P>
      </div>
    </DetailRowsContainer>
  );
};

export const ProtocolContracts: FC = () => {
  const contracts = deployments[CHAIN_ID];
  return (
    <OneColumnContainer>
      <OneColumnContentContainer>
        <Jumbotron />
        <DetailRowsContainer>
          <DetailRowsTableContainer>
            <ProtocolContractsTable
              address={contracts.core.factory}
              title={`Jiggle`}
              description={`wiggle a day keeps the doctor away`}
              label={'nft'}
            />
          </DetailRowsTableContainer>
          <DocumentationFooter />
        </DetailRowsContainer>
      </OneColumnContentContainer>
    </OneColumnContainer>
  );
};

const ProtocolContractsTable: FC<any> = ({
  title,
  description,
  label,
  address,
}) => {
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
          <strong>{title}</strong>
          <LabelAnchor
            style={{
              textDecoration: 'none',
              marginLeft: 12,
            }}
          >
            ({label})
          </LabelAnchor>
          <br />
          <br />
          {description}
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
    </DetailRowsContainer>
  );
};
