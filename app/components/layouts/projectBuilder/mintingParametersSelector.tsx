import { FC, useMemo } from 'react';
import { HUNDRED_PERCENT_BPS } from '../../../constants';
import {
  useModifyProjectMetadata,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import { getIPFSUrl } from '../../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  DetailTitleAnchorRow,
  InteractiveDetailRowsContainer,
} from '../../details/rows';
import {
  CheckboxInput,
  InputWell,
  NumberInput,
  TextInput,
} from '../../inputs/input';
import { Text } from '../../texts';

export const MintingParametersSelector: FC = () => {
  const {
    onMintingSupplyChange,
    onPriceChange,
    onRoyaltyFractionChange,
    onIsActiveChange,
  } = useModifyProjectMetadata();
  const { mintingSupply, priceInEth, royaltyFractionInBps, isActive } =
    useRawProjectMetadata();
  const royaltyFractionPercentage = useMemo(() => {
    if (royaltyFractionInBps === undefined) {
      return undefined;
    }
    return (royaltyFractionInBps * 100) / HUNDRED_PERCENT_BPS;
  }, [royaltyFractionInBps]);
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['CONFIGURE MINTING PARAMETERS', `SPEC`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <Text>SUPPLY</Text>
        <NumberInput
          value={mintingSupply ?? ''}
          onChange={(e) => onMintingSupplyChange(e.target.valueAsNumber)}
          style={{ textAlign: 'right' }}
          placeholder="0"
        />
      </InputWell>
      <InputWell>
        <Text>PRICE</Text>
        <NumberInput
          value={priceInEth ?? ''}
          onChange={(e) => onPriceChange(e.target.valueAsNumber)}
          style={{ textAlign: 'right' }}
          placeholder="0.1"
        />
        <Text style={{ paddingLeft: 8 }}>
          <strong>ETH</strong>
        </Text>
      </InputWell>
      <InputWell>
        <Text>SECONDARY MARKET ROYALTY (0-100)</Text>
        <NumberInput
          value={royaltyFractionPercentage ?? ''}
          onChange={(e) => onRoyaltyFractionChange(e.target.valueAsNumber)}
          style={{ textAlign: 'right' }}
          placeholder="0"
        />
        <Text style={{ paddingLeft: 8 }}>
          <strong>%</strong>
        </Text>
      </InputWell>
      <InputWell style={{ justifyContent: 'space-between' }}>
        <Text>ALLOW MINTING AT CREATION</Text>
        <CheckboxInput
          isActive={isActive}
          onClick={() => onIsActiveChange(!isActive)}
        />
      </InputWell>
    </InteractiveDetailRowsContainer>
  );
};
