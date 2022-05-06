import styled from 'styled-components';

export const BaseButton = styled.button`
  outline: none;
  background: none;
  border: none;
  transition: 200ms ease-in-out transform;
  padding: 0;
  font-size: 12px;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: black;
  color: white;
  padding: 28px;
  width: 100%;
`;
