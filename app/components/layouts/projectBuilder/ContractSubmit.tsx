import { FC } from 'react';
import { InteractiveDetailRowsContainer } from '../../details/rows';
import { PrimaryButton, TertiaryButton } from '../../inputs/button';

export const ContractSubmit: FC = () => {
  return (
    <InteractiveDetailRowsContainer>
      <PrimaryButton>CREATE COLLECTION</PrimaryButton>
      <TertiaryButton>RESET</TertiaryButton>
    </InteractiveDetailRowsContainer>
  );
};
