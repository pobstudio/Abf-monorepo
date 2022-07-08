import { FC, useMemo } from 'react';
import styled from 'styled-components';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
import { Flex } from '../../flexs';
import { BaseButton } from '../../inputs/button';
import { Text } from '../../texts';

export const TokenIdSwitcher: FC = () => {
  const { currentSampleTokenRenderState, setCurrentSampleTokenId } =
    useProjectBuilderContext();
  const { mintingSupply } = useProjectMetadata();

  const isDecrementDisabled = useMemo(() => {
    if (!mintingSupply) {
      return true;
    }
    return currentSampleTokenRenderState.tokenId <= 0;
  }, [mintingSupply, currentSampleTokenRenderState]);

  const isIncrementDisabled = useMemo(() => {
    if (!mintingSupply) {
      return true;
    }
    return currentSampleTokenRenderState.tokenId >= mintingSupply - 1;
  }, [mintingSupply, currentSampleTokenRenderState]);

  return (
    <Flex>
      <ArrowButton
        onClick={() => setCurrentSampleTokenId?.((s) => s - 1)}
        disabled={isDecrementDisabled}
      >
        {'<'}
      </ArrowButton>
      <CenteredText>{`TOKEN ID: ${currentSampleTokenRenderState.tokenId} / ${
        mintingSupply ?? '???'
      }`}</CenteredText>
      <ArrowButton
        onClick={() => setCurrentSampleTokenId?.((s) => s + 1)}
        disabled={isIncrementDisabled}
      >
        {'>'}
      </ArrowButton>
    </Flex>
  );
};

const CenteredText = styled(Text)`
  margin: 0 8px;
`;

const ArrowButton = styled(BaseButton)`
  padding: 0 4px;
  :hover {
    opacity: 0.4;
  }
`;
