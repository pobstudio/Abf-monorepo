import styled from 'styled-components';

export const InputWell = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

export const TextInput = styled.input.attrs({ type: 'text' })`
  font-size: 12px;
  background: none;
  border: none;
  border-radius: none;
  outline: none;
  overflow: hidden;
  line-height: 12px;
  flex-grow: 1;
  ::placeholder {
    color: black;
    opacity: 0.2;
  }
`;

export const NumberInput = styled.input.attrs({ type: 'number' })`
  font-size: 12px;
  background: none;
  border: none;
  border-radius: none;
  outline: none;
  overflow: hidden;
  line-height: 12px;
  flex-grow: 1;
  ::placeholder {
    color: black;
    opacity: 0.2;
  }
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const TextArea = styled.textarea`
  font-size: 12px;
  background: none;
  border: none;
  border-radius: none;
  outline: none;
  overflow: hidden;
  flex-grow: 1;
  ::placeholder {
    color: black;
    opacity: 0.2;
  }
`;
