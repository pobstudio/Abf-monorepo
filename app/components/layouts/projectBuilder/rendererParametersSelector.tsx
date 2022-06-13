import { FC } from 'react';
import {
  useModifyProjectMetadata,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import {
  DetailRow,
  DetailTitleAnchorRow,
  InteractiveDetailRowsContainer,
} from '../../details/rows';
import { Flex } from '../../flexs';
import { InputWell, TextInput } from '../../inputs/input';
import { MultiLineText, Text, TextAnchor } from '../../texts';
import { Tooltip } from '../../tooltip';

export const RendererParametersSelector: FC = () => {
  const { onRendererChange, onInputConstantsChange, onSeedChange } =
    useModifyProjectMetadata();
  const { renderer, inputConstants, seed } = useRawProjectMetadata();
  const {
    rendererMetadataStub,
    seed: validSeed,
    inputConstants: validInputConstants,
  } = useProjectMetadata();
  return (
    <InteractiveDetailRowsContainer>
      <DetailTitleAnchorRow>
        {['CONFIGURE RENDERING PARAMETERS', `DOCS`]}
      </DetailTitleAnchorRow>
      <InputWell>
        <Flex>
          <Text style={{ marginRight: 6 }}>RENDERER</Text>
          <Tooltip direction={'left'}>
            <MultiLineText>
              Renderers are on-chain contracts that interpret bytes into svg or
              html. Valid renderers for ABF must abide to the Renderer{' '}
              <TextAnchor>Spec</TextAnchor>.
            </MultiLineText>
          </Tooltip>
        </Flex>
        <TextInput
          style={{ textAlign: 'right' }}
          value={renderer ?? ''}
          onChange={(e) => onRendererChange(e.target.value)}
          placeholder="0xabcd...1234"
        />
      </InputWell>
      <InputWell>
        <Flex>
          <Text style={{ marginRight: 6 }}>SEED</Text>
          <Tooltip direction={'left'}>
            <MultiLineText>
              Seed provides a determinstic source of random for generating the
              input bytes provided to Brainfuck code.
            </MultiLineText>
          </Tooltip>
        </Flex>
        <TextInput
          value={seed ?? ''}
          onChange={(e) => onSeedChange(e.target.value)}
          style={{ textAlign: 'right' }}
          placeholder="0xabcd...decd"
        />
      </InputWell>
      <InputWell>
        <Flex>
          <Text style={{ marginRight: 6 }}>INPUT CONSTANTS</Text>
          <Tooltip direction={'left'}>
            <MultiLineText>
              Input constants are provided as the first 8 bytes of input to
              BrainFuck code; after these 8 bytes, the input will be random,
              generated via the seed.
            </MultiLineText>
          </Tooltip>
        </Flex>
        <TextInput
          value={inputConstants ?? ''}
          onChange={(e) => onInputConstantsChange(e.target.value)}
          style={{ textAlign: 'right' }}
          placeholder="0xabcd...decd"
        />
      </InputWell>
      <DetailRow>
        {['VALID RENDERER', !!rendererMetadataStub ? 'TRUE' : 'FALSE']}
      </DetailRow>
      {!!rendererMetadataStub?.label && (
        <DetailRow>{['RENDERER LABEL', rendererMetadataStub.label]}</DetailRow>
      )}
      <DetailRow>{['VALID SEED', !!validSeed ? 'TRUE' : 'FALSE']}</DetailRow>
      <DetailRow>
        {['VALID INPUT CONSTANTS', !!validInputConstants ? 'TRUE' : 'FALSE']}
      </DetailRow>
    </InteractiveDetailRowsContainer>
  );
};
