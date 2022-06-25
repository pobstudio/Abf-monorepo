import { FC } from 'react';
import { ProjectBuilderProvider } from '../../../contexts/projectBuilder';
import {
  TwoColumnContainer,
  TwoColumnContentContainer,
} from '../../divs/twoColumn';
import { BrainFuckEditor } from './brainFuckEditor';
import { Jumbotron } from './jumbotron';
import { MintingParametersSelector } from './mintingParametersSelector';
import { RendererParametersSelector } from './rendererParametersSelector';
import { ContractSubmit } from './submit';
import { TokenPreview } from './tokenPreview';

export const ProjectBuilder: FC = () => {
  return (
    <ProjectBuilderProvider>
      <TwoColumnContainer>
        <div>
          <TwoColumnContentContainer>
            <Jumbotron />
            <RendererParametersSelector />
            <BrainFuckEditor />
          </TwoColumnContentContainer>
          <TwoColumnContentContainer
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <MintingParametersSelector />
            <ContractSubmit />
          </TwoColumnContentContainer>
        </div>
        <div>
          <TwoColumnContentContainer
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <TokenPreview />
            {/* <FlexCenter>
              <TokenIdSwitcher />
            </FlexCenter> */}
          </TwoColumnContentContainer>
        </div>
      </TwoColumnContainer>
    </ProjectBuilderProvider>
  );
};
