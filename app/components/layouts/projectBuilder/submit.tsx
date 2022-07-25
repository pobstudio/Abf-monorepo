import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { usePrevious } from 'react-use';
import styled from 'styled-components';
import {
  usePriorityAccount,
  usePriorityChainId,
} from '../../../connectors/priority';
import { CHAIN_ID } from '../../../constants';
import { ROUTES } from '../../../constants/routes';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
import { useCreateCollection } from '../../../hooks/useCreateCollection';
import { useModalStore } from '../../../stores/modal';
import { DetailRowsContainer } from '../../details/rows';
import { FlexEnds } from '../../flexs';
import { ArrowIcon } from '../../icons/arrow';
import { PrimaryButton, TertiaryButton } from '../../inputs/button';
import { BasicModal } from '../../modal';
import { Label, Text } from '../../texts';

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
      messages.push('WRITE BRAINFUCK!: BRAINFUCK! CODE REQUIRED');
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
  const { contractAddress, create, txStatus, error, isLoading } =
    useCreateCollection();

  const buttonText = useMemo(() => {
    if (!account) {
      return 'NEED CONNECTED WALLET';
    }
    if (chainId !== CHAIN_ID) {
      return 'WRONG NETWORK';
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
  }, [isLoading, chainId, account, txStatus, error]);
  const disabled = useMemo(() => {
    return (
      chainId !== CHAIN_ID ||
      !account ||
      errorMessages.length !== 0 ||
      isLoading ||
      txStatus === 'in-progress' ||
      txStatus === 'success'
    );
  }, [isLoading, txStatus, account, chainId, errorMessages]);

  const setIsGenericModalOpen = useModalStore((s) => s.setIsGenericModalOpen);

  const prevTxStatus = usePrevious(txStatus);
  useEffect(() => {
    if (prevTxStatus !== txStatus && txStatus === 'success') {
      setIsGenericModalOpen(true);
      onRefresh();
    }
  }, [txStatus]);

  return (
    <div style={{ width: '100%' }}>
      <DetailRowsContainer>
        <ErrorTable>
          {errorMessages.map((m, i) => (
            <ErrorText key={`error-text-message-${i}`}>{m}</ErrorText>
          ))}
        </ErrorTable>
        <PrimaryButton onClick={create} disabled={disabled}>
          {buttonText}
        </PrimaryButton>
        <TertiaryButton onClick={onRefresh}>RESET</TertiaryButton>
      </DetailRowsContainer>
      <SuccessModal contractAddress={contractAddress} />
    </div>
  );
};

export const SuccessModal: React.FC<{ contractAddress?: string | null }> = ({
  contractAddress,
}) => {
  const router = useRouter();
  return (
    <>
      <BasicModal>
        <Label>
          {`+[----->+++<]>++.++++CREATED+.++++++.-----.[--->+<]>-----.---[->++++<]SOMETHING>.------------.---.--[--->+<]>-.[->+++<]>++.[--->+<]>----.-------NEW--.--.+.++++++++++++.[---->+<]>+++.++[--->++<]>.---.--.+.++++++++++++.`}
        </Label>
        <FlexEnds style={{ marginTop: 24 }}>
          <Label>ADDR</Label>
          <Text>{contractAddress}</Text>
        </FlexEnds>
        <TertiaryButton
          style={{ marginTop: 24 }}
          onClick={() => router.push(`${ROUTES.COLLECTION}/${contractAddress}`)}
        >
          VIEW COLLECTION{' '}
          <ArrowIcon
            style={{
              marginLeft: 4,
              transform: 'rotate(180deg) translateY(-1px)',
            }}
          />
        </TertiaryButton>
      </BasicModal>
    </>
  );
};
