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

export const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 12px;
  background: none;
  border: none;
  border-radius: none;
  outline: none;
  overflow: hidden;
  line-height: 12px;
  flex-grow: 1;
  ::-webkit-file-upload-button {
    margin-right: 12px;
    line-height: 12px;
    font-size: 12px;
    font-family: 'Roboto Mono', monospace;
    border-radius: 0px;
    padding: 6px 8px;
    background: #e0e0e0;
    border: none;
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

export const CheckboxInput = styled.button<{ isActive?: boolean }>`
  width: 16px;
  height: 16px;
  outline: none;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    bottom: 2px;
    right: 2px;
    left: 2px;
    background: ${(p) => (p.isActive ? 'black' : 'white')};
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
