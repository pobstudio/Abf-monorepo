import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { BRAINFUCK_DOCS_LINK, HUNDRED_PERCENT_BPS } from '../../../constants';
import {
  ProjectBuilderProvider,
  useModifyProjectMetadata,
  useProjectBuilderContext,
  useProjectMetadata,
  useRawProjectMetadata,
} from '../../../contexts/projectBuilder';
import { getIPFSUrl } from '../../../utils/urls';
import {
  DetailAnchorRow,
  DetailRow,
  InteractiveDetailRowsContainer,
  DetailTitleAnchorRow,
  DetailRowsContainer,
} from '../../details/rows';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { Flex, FlexCenter, FlexCenterColumn, FlexEnds } from '../../flexs';
import { BaseButton, PrimaryButton, TertiaryButton } from '../../inputs/button';
import {
  CheckboxInput,
  InputWell,
  NumberInput,
  TextArea,
  TextInput,
} from '../../inputs/input';
import { PlaceholderRender } from '../../renders';
import { Label, MultiLineText, Text, TextAnchor } from '../../texts';
import { BrainFuckEditor } from './brainFuckEditor';
import { ContractSubmit } from './ContractSubmit';
import { Jumbotron } from './jumbotron';
import { MintingParametersSelector } from './mintingParametersSelector';
import { RendererParametersSelector } from './rendererParametersSelector';
import { RendererSelector } from './rendererSelector';
import { TokenIdSwitcher } from './tokenIdSwitcher';
import { TokenParametersSelector } from './tokenParametersSelector';
import { TokenPreview } from './tokenPreview';

export const ProjectBuilder: FC = () => {
  return (
    <ProjectBuilderProvider>
      <TwoColumnContainer>
        <div>
          <TwoColumnContentContainer>
            <Jumbotron />
            <BrainFuckEditor />
          </TwoColumnContentContainer>
          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <TokenParametersSelector />
            <MintingParametersSelector />
            <ContractSubmit />
          </TwoColumnContentContainer>
        </div>
        <div>
          <TwoColumnContentContainer>
            <TokenPreview />
            <FlexCenter>
              <TokenIdSwitcher />
            </FlexCenter>
          </TwoColumnContentContainer>
          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <RendererParametersSelector />
          </TwoColumnContentContainer>
        </div>
      </TwoColumnContainer>
    </ProjectBuilderProvider>
  );
};
