import { FC } from 'react';
import styled from 'styled-components';
import { usePriorityAccount } from '../../../connectors/priority';
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
  const account = usePriorityAccount();
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
      <DetailRow>
        {['VALID RENDERER', !!rendererMetadataStub ? 'TRUE' : 'FALSE']}
      </DetailRow>
      {!!rendererMetadataStub?.label && (
        <DetailRow>{['RENDERER LABEL', rendererMetadataStub.label]}</DetailRow>
      )}
      {!account && (
        <RenderererParametersSelectorCover>
          <MultiLineText>CONNECT WALLET TO CHANGE RENDERER</MultiLineText>
        </RenderererParametersSelectorCover>
      )}
    </InteractiveDetailRowsContainer>
  );
};

const RenderererParametersSelectorCover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  text-align: center;
  left: 0;
  right: 0;
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.75);
`;
