import { FC } from 'react';
import { ProjectBuilderProvider } from '../../../contexts/projectBuilder';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { FlexCenter } from '../../flexs';
import { BrainFuckEditor } from './brainFuckEditor';
import { ContractSubmit } from './contractSubmit';
import { Jumbotron } from './jumbotron';
import { MintingParametersSelector } from './mintingParametersSelector';
import { RendererParametersSelector } from './rendererParametersSelector';
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
