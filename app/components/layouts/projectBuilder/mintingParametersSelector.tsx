import { FC, useMemo } from 'react';
import { HUNDRED_PERCENT_BPS } from '../../../constants';
import {
  useModifyProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import {
  DetailTitleAnchorRow,
  InteractiveDetailRowsContainer,
} from '../../details/rows';
import { Flex } from '../../flexs';
import { CheckboxInput, InputWell, NumberInput } from '../../inputs/input';
import { MultiLineText, Text, TextAnchor } from '../../texts';
import { Tooltip } from '../../tooltip';

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
        <Flex>
          <Text style={{ marginRight: 6 }}>SUPPLY</Text>
          <Tooltip direction={'left'}>
            <MultiLineText>
              Total supply mintable in this ABF NFT collection.
            </MultiLineText>
          </Tooltip>
        </Flex>
        <NumberInput
          value={mintingSupply ?? ''}
          onChange={(e) => onMintingSupplyChange(e.target.valueAsNumber)}
          style={{ textAlign: 'right' }}
          placeholder="0"
        />
      </InputWell>
      <InputWell>
        <Flex>
          <Text style={{ marginRight: 6 }}>PRICE</Text>
          <Tooltip direction={'left'}>
            <MultiLineText>
              Price in ETH for a collector to mint this collection. ABF protocol
              extracts no fees, all minting profits go to creator.
            </MultiLineText>
          </Tooltip>
        </Flex>
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
        <Flex>
          <Text style={{ marginRight: 6 }}>
            SECONDARY MARKET ROYALTY (0-100)
          </Text>
          <Tooltip direction={'left'}>
            <MultiLineText>
              Set the secondary market royalty fee routed to creator; utilizes{' '}
              <TextAnchor>EIP2981</TextAnchor>.
            </MultiLineText>
          </Tooltip>
        </Flex>
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
        <Flex>
          <Text style={{ marginRight: 6 }}>ALLOW MINTING AT CREATION</Text>
          <Tooltip direction={'left'}>
            <MultiLineText>
              If toggled, minting will immediately be available after contract
              creation. If not toggled, creator can enable minting at a late
              time.
            </MultiLineText>
          </Tooltip>
        </Flex>
        <CheckboxInput
          isActive={isActive}
          onClick={() => onIsActiveChange(!isActive)}
        />
      </InputWell>
    </InteractiveDetailRowsContainer>
  );
};
