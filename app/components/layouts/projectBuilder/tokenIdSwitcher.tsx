import { FC, useMemo } from 'react';
import styled from 'styled-components';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
import { DetailRowsContainer } from '../../details/rows';
import { Flex, FlexCenter } from '../../flexs';
import { BaseButton } from '../../inputs/button';
import { Text } from '../../texts';

export const TokenIdSwitcher: FC = () => {
  const { currentSampleTokenId, setCurrentSampleTokenId } =
    useProjectBuilderContext();
  const { mintingSupply } = useProjectMetadata();

  const isDecrementDisabled = useMemo(() => {
    if (!mintingSupply) {
      return true;
    }
    return currentSampleTokenId <= 0;
  }, [mintingSupply, currentSampleTokenId]);

  const isIncrementDisabled = useMemo(() => {
    if (!mintingSupply) {
      return true;
    }
    return currentSampleTokenId >= mintingSupply;
  }, [mintingSupply, currentSampleTokenId]);

  return (
    <Flex>
      <ArrowButton
        onClick={() => setCurrentSampleTokenId?.((s) => s - 1)}
        disabled={isDecrementDisabled}
      >
        {'<'}
      </ArrowButton>
      <CenteredText>{`TOKEN ID: ${currentSampleTokenId} / ${
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
