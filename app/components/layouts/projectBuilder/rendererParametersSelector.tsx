import { deployments } from '@abf-monorepo/protocol';
import { utils } from 'ethers';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import { usePriorityChainId } from '../../../connectors/priority';
import { CHAIN_ID } from '../../../constants';
import { DropdownAnimation } from '../../../constants/styles';
import {
  useModifyProjectMetadata,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import { useENSorHex } from '../../../hooks/useENS';
import { useRendererLabel } from '../../../hooks/useRenderer';
import {
  DetailAnchorRow,
  InteractiveDetailRowsContainer,
} from '../../details/rows';
import { Flex, FlexEnds } from '../../flexs';
import { InputWell, TextInput } from '../../inputs/input';
import { HeaderAnchor } from '../../navs/common';
import {
  Label,
  LabelAnchor,
  MultiLineText,
  Text,
  TextAnchor,
} from '../../texts';
import { Tooltip } from '../../tooltip';

export const RendererParametersSelector: FC = () => {
  const { onRendererChange, onInputConstantsChange, onSeedChange } =
    useModifyProjectMetadata();
  const {
    renderer: rawRenderer,
    inputConstants,
    seed,
  } = useRawProjectMetadata();
  const { renderer, rendererMetadataStub } = useProjectMetadata();
  const chainId = usePriorityChainId();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const clickAwayRef = useRef<HTMLDivElement | null>(null);
  useClickAway(clickAwayRef, () => {
    setIsDropdownOpen(false);
  });

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

  const rendererLabel = useRendererLabel(renderer);

  const isRendererCustom = useMemo(() => {
    return (
      Object.values(deployments[CHAIN_ID].renderers).filter(
        (a) => a === rawRenderer,
      ).length === 0
    );
  }, [rawRenderer]);

  return (
    <InteractiveDetailRowsContainer ref={clickAwayRef}>
      <FlexEnds>
        <Flex>
          <Text style={{ marginRight: 6 }}>
            <strong>SELECT RENDERER</strong>
          </Text>
          <Tooltip direction={'left'}>
            <MultiLineText style={{ cursor: 'text' }}>
              Renderers are on-chain contracts that interpret bytes into svg or
              html. Valid renderers for ABF must abide to the Renderer{' '}
              <TextAnchor>Spec</TextAnchor>.
            </MultiLineText>
          </Tooltip>
        </Flex>
        <LabelAnchor href="/renderers">REGISTRY</LabelAnchor>
      </FlexEnds>
      <InputWell
        style={{ justifyContent: 'space-between', cursor: 'pointer' }}
        onClick={() => setIsDropdownOpen((s) => !s)}
      >
        <Flex>
          <Text>RENDERER</Text>
        </Flex>
        <Flex>
          <HeaderAnchor>
            <strong>{renderer ? rendererLabel : 'NONE SELECTED'}</strong>
          </HeaderAnchor>
          <Text style={{ marginLeft: 12 }}>{isDropdownOpen ? '▲' : '▼'}</Text>
        </Flex>
      </InputWell>
      <DropdownSpacer />
      <DropdownContainer
        style={{
          transform: y.to((v: unknown) => `translateY(${v}%`),
          opacity,
          pointerEvents,
          userSelect,
        }}
      >
        <div>
          <Flex style={{ marginBottom: 8 }}>
            <Label style={{ marginRight: 6 }}>DEFAULT RENDERERS</Label>
            <Tooltip direction={'left'}>
              <MultiLineText>
                Default Renderers are written by the ABF Corp and vetted by the
                BOARD.
              </MultiLineText>
            </Tooltip>
          </Flex>
          <RendererRowGroup>
            {Object.entries(deployments[CHAIN_ID].renderers).map(
              ([label, address]) => {
                if (label === 'debug') return null;
                return (
                  <RendererOption
                    onClick={() => onRendererChange(address)}
                    key={`renderer-option-${address}`}
                    label={label}
                    address={address}
                    isSelected={utils.getAddress(address) === renderer}
                  />
                );
              },
            )}
          </RendererRowGroup>
        </div>
        <div>
          <Flex style={{ margin: '16px 0' }}>
            <Label style={{ marginRight: 6 }}>CUSTOM RENDERER</Label>
            <Tooltip direction={'left'}>
              <MultiLineText>
                Provide a custom written renderer. Consult the{' '}
                <TextAnchor>registry</TextAnchor> for all discovered renderers.
              </MultiLineText>
            </Tooltip>
          </Flex>
          {(() => {
            if (!chainId) {
              return (
                <InputWell style={{ justifyContent: 'center' }}>
                  <Label>NO WALLET CONNECTED.</Label>
                </InputWell>
              );
            }

            if (chainId !== CHAIN_ID) {
              return (
                <InputWell style={{ justifyContent: 'center' }}>
                  {' '}
                  <Label>INCORRECT CHAIN CONNECTED.</Label>
                </InputWell>
              );
            }

            return (
              <>
                <InputWell>
                  <Text style={{ marginRight: 6 }}>ADDRESS</Text>

                  <TextInput
                    style={{ textAlign: 'right' }}
                    value={isRendererCustom ? rawRenderer ?? '' : ''}
                    onChange={(e) => onRendererChange(e.target.value)}
                    placeholder="0xabcd...1234"
                  />
                </InputWell>
                {isRendererCustom && (
                  <FlexEnds style={{ marginTop: 16 }}>
                    <Label>VALID RENDERER</Label>
                    <Text>{!!renderer ? 'TRUE' : 'FALSE'}</Text>
                  </FlexEnds>
                )}
              </>
            );
          })()}
        </div>
      </DropdownContainer>
      {renderer && (
        <DetailAnchorRow href={`/renderer/${renderer}`}>
          {['DOCUMENTATION', 'FILE']}
        </DetailAnchorRow>
      )}
    </InteractiveDetailRowsContainer>
  );
};

const RendererOption: FC<{
  onClick?: () => void;
  label: string;
  address: string;
  isSelected?: boolean;
}> = ({ onClick, label, address, isSelected }) => {
  const ensOrHex = useENSorHex(address);
  return (
    <RendererRow onClick={onClick}>
      <Flex>
        <HeaderAnchor style={{ textTransform: 'uppercase', cursor: 'pointer' }}>
          <>{label}</>
        </HeaderAnchor>
        <Label style={{ marginLeft: 12 }}>{ensOrHex}</Label>
      </Flex>
      {isSelected && <Label>SELECTED</Label>}
    </RendererRow>
  );
};

const RendererRow = styled(FlexEnds)`
  cursor: pointer;
  :hover {
    ${HeaderAnchor} {
      text-decoration: underline;
    }
  }
`;

const RendererRowGroup = styled.div`
  > div {
    padding: 8px 0;
  }
`;

const DropdownContainer = animated(styled.div`
  position: absolute;
  right: 0;
  margin-top: 10px;
  z-index: 1100;
  background: white;
  min-width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px;
  opacity: 0;
  > * + * {
    margin-top: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`);

const DropdownSpacer = styled.div`
  background: transparent;
  width: 100%;
  height: 10px;
  position: absolute;
  pointer-events: none;
`;

const Web3StatusWrapper = styled.div`
  position: relative;
`;
