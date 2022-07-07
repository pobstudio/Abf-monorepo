import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { usePriorityAccount, usePriorityChainId } from '../../../connectors/priority';
import { CHAIN_ID } from '../../../constants';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
import { useCreateCollection } from '../../../hooks/useCreateCollection';
import { DetailRowsContainer } from '../../details/rows';
import { PrimaryButton, TertiaryButton } from '../../inputs/button';
import { Text } from '../../texts';

const ErrorTable = styled.div`
  > * + * {
    margin-top: 12px;
  }
`;

const ErrorText = styled(Text)`
  color: #f24c4c;
`;

export const ContractSubmit: FC = () => {
  const { onRefresh } = useProjectBuilderContext();
  const projectMetadata = useProjectMetadata();
  const errorMessages = useMemo(() => {
    const messages: string[] = [];
    if (
      projectMetadata.code === undefined ||
      projectMetadata.code.length === 0
    ) {
      messages.push('WRITE BRAINFUCK: BRAINFUCK CODE REQUIRED');
    }
    if (!projectMetadata.name) {
      messages.push('CONFIGURE TOKEN PARAMETERS: NAME REQUIRED');
    }
    if (!projectMetadata.symbol) {
      messages.push('CONFIGURE TOKEN PARAMETERS: SYMBOL REQUIRED');
    }
    if (projectMetadata.mintingSupply === undefined) {
      messages.push('CONFIGURE MINTING PARAMETERS: SUPPLY REQUIRED');
    }
    if (projectMetadata.priceInEth === undefined) {
      messages.push('CONFIGURE MINTING PARAMETERS: PRICE REQUIRED');
    }
    if (projectMetadata.royaltyFractionInBps === undefined) {
      messages.push(
        'CONFIGURE MINTING PARAMETERS: SECONDARY MARKET ROYALTY REQUIRED',
      );
    }
    if (projectMetadata.renderer === undefined) {
      messages.push('CONFIGURE RENDERING PARAMETER: VALID RENDERER REQUIRED');
    }
    if (projectMetadata.seed === undefined) {
      messages.push('CONFIGURE RENDERING PARAMETER: SEED REQUIRED');
    }
    if (projectMetadata.inputConstants === undefined) {
      messages.push(
        'CONFIGURE RENDERING PARAMETER: VALID INPUT CONSTANTS REQUIRED',
      );
    }
    return messages;
  }, [projectMetadata]);

  const account = usePriorityAccount();
  const chainId = usePriorityChainId();
  const { create, txStatus, error, isLoading } = useCreateCollection();

  const buttonText = useMemo(() => {
    if (!account) {
      return 'NEED CONNECTED WALLET'
    }
    if (chainId !== CHAIN_ID) {
      return 'WRONG NETWORK'
    }
    if (isLoading || txStatus === 'in-progress') {
      return 'CREATING...';
    }
    if (txStatus === 'failed' || !!error) {
      return 'CREATE';
    }
    if (txStatus === 'success') {
      return 'CREATED.';
    }
    return `CREATE NFT`;
  }, [isLoading, chainId, txStatus, error]);
  const disabled = useMemo(() => {
    return chainId !== CHAIN_ID || !account || errorMessages.length !== 0 || isLoading || txStatus === 'in-progress' || txStatus === 'success';
  }, [isLoading, txStatus, account, chainId, errorMessages]);
  return (
    <DetailRowsContainer>
      <ErrorTable>
        {errorMessages.map((m, i) => (
          <ErrorText key={`error-text-messag-${i}`}>{m}</ErrorText>
        ))}
      </ErrorTable>
      <PrimaryButton onClick={create} disabled={disabled}>
        {buttonText}
      </PrimaryButton>
      <TertiaryButton onClick={onRefresh}>RESET</TertiaryButton>
    </DetailRowsContainer>
  );
};
