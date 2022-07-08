import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useClickAway, useMountedState } from 'react-use';
import styled from 'styled-components';
import { hooks as metaMaskHooks, metaMask } from '../../connectors/metaMask';
import {
  usePriorityAccount,
  usePriorityConnector,
  usePriorityIsActivating,
} from '../../connectors/priority';
import {
  hooks as walletConnectHooks,
  walletConnect,
} from '../../connectors/walletConnect';
import { CHAIN_ID } from '../../constants';
import { DropdownAnimation } from '../../constants/styles';
import { useENSorHex } from '../../hooks/useENS';
import { useNumPendingTx } from '../../hooks/useNumPendingTx';
import { Flex } from '../flexs';
import { Label } from '../texts';
import { HeaderAnchor } from './common';

export const Web3ConnectWalletContent: FC = () => {
  return (
    <DropdownRowsContainer>
      <ConnectWalletMetamaskOption />
      <ConnectWalletWalletConnectOption />
    </DropdownRowsContainer>
  );
};

const DropdownRowsContainer = styled.div`
  padding: 10px;
`;

const ConnectWalletMetamaskOption = () => {
  const isActivating = metaMaskHooks.useIsActivating();
  if (!window?.ethereum) {
    return (
      <ActionRowButton
        key={`wallet-option-install-metamask`}
        onClick={() => window.open('https://metamask.io', '_blank')}
      >
        Install metamask
      </ActionRowButton>
    );
  }

  return (
    <ActionRowButton
      disabled={isActivating}
      onClick={() => {
        metaMask.activate(CHAIN_ID);
      }}
    >
      {isActivating ? 'Connecting' : 'MetaMask'}
    </ActionRowButton>
  );
};

const ConnectWalletWalletConnectOption = () => {
  const isActivating = walletConnectHooks.useIsActivating();
  return (
    <ActionRowButton
      disabled={isActivating}
      onClick={() => {
        walletConnect.activate(CHAIN_ID);
      }}
    >
      {isActivating ? 'Connecting' : 'WalletConnect'}
    </ActionRowButton>
  );
};

export const Web3ConnectedWalletContent: FC<{
  setIsDropdownOpen?: (b: boolean) => void;
}> = ({ setIsDropdownOpen }) => {
  const router = useRouter();
  const connector = usePriorityConnector();

  const disconnect = useCallback(() => {
    connector.deactivate();
  }, [router, connector]);

  return (
    <>
      <DropdownRowsContainer>
        <ActionRowButton
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </ActionRowButton>
      </DropdownRowsContainer>
    </>
  );
};

export const Web3Status: FC<{
  onConnectedClick?: () => void;
  prefixAddress?: string;
}> = () => {
  const account = usePriorityAccount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const clickAwayRef = useRef<HTMLDivElement | null>(null);
  useClickAway(clickAwayRef, () => {
    setIsDropdownOpen(false);
  });

  const ensOrHex = useENSorHex(account);

  const [{ y, opacity, pointerEvents, userSelect }, set] = useSpring(
    () => DropdownAnimation.hidden,
  );

  useEffect(() => {
    if (isDropdownOpen) {
      set(DropdownAnimation.visible);
    } else {
      set(DropdownAnimation.hidden);
    }
  }, [isDropdownOpen]);

  const isMounted = useMountedState();
  const isActivating = usePriorityIsActivating();

  const numPendingTx = useNumPendingTx();
  return (
    <>
      <Web3StatusWrapper ref={clickAwayRef}>
        {!!account && (
          <Flex>
            {!!numPendingTx && <Label style={{marginRight: 16}}>{numPendingTx} PENDING TX(S)</Label>}
          <HeaderAnchor
            style={{ cursor: 'pointer' }}
            onClick={() => setIsDropdownOpen(true)}
          >
            {ensOrHex}
          </HeaderAnchor>
          </Flex>
        )}
        {!account && !isActivating && (
          <HeaderAnchor
            style={{ cursor: 'pointer' }}
            onClick={() => setIsDropdownOpen(true)}
          >
            CONNECT [GOERLI]
          </HeaderAnchor>
        )}
        <DropdownSpacer />
        <Web3DropdownContainer
          style={{
            transform: y.to((v: unknown) => `translateY(${v}%`),
            opacity,
            pointerEvents,
            userSelect,
          }}
        >
          {!account && isMounted() && <Web3ConnectWalletContent />}
          {!!account && isMounted() && (
            <Web3ConnectedWalletContent setIsDropdownOpen={setIsDropdownOpen} />
          )}
        </Web3DropdownContainer>
      </Web3StatusWrapper>
    </>
  );
};

const ActionRowButton = styled.button`
  padding: 12px 12px;
  font-weight: 600;
  color: black;
  font-size: 12px;
  font-weight: normal;
  display: block;
  width: 100%;
  text-align: left;
  transition: all 100ms ease-in-out;
  background: none;
  border: none;
  &:hover {
    transform: none;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Web3DropdownContainer = animated(styled.div`
  position: absolute;
  right: 0;
  margin-top: 10px;
  z-index: 1100;
  background: white;
  min-width: 256px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  opacity: 0;
`);

const DropdownSpacer = styled.div`
  background: transparent;
  width: 100%;
  height: 10px;
  position: absolute;
`;

const Web3StatusWrapper = styled.div`
  position: relative;
`;
