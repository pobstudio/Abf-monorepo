import { FC } from 'react';
import {
  useProjectBuilderContext,
  useProjectMetadata,
} from '../../../contexts/projectBuilder';
import { DetailRowsContainer } from '../../details/rows';
import { PlaceholderRender } from '../../renders';
import { Label, MultiLineText, Text } from '../../texts';

export const TokenPreview: FC = () => {
  const { currentSampleTokenSeed } = useProjectBuilderContext();
  const { code } = useProjectMetadata();
  return (
    <DetailRowsContainer>
      <Label>INPUT</Label>
      <Text>{currentSampleTokenSeed ?? '-'}</Text>
      <Label>BRAINFUCK CODE</Label>
      <MultiLineText>{code ?? '-'}</MultiLineText>
      <Label>OUTPUT (AS BYTES)</Label>
      <MultiLineText>
        {'0x9d8901739585af157a9a23d4fac9e6cdd8c09f9788c3636d61ed77dc45b05687'}
      </MultiLineText>
      <Label>OUTPUT (AS RENDERED OUTPUT)</Label>
      <PlaceholderRender />
    </DetailRowsContainer>
  );
};
