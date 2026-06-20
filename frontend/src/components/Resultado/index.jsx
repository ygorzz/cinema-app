import styled from "styled-components";

export const ResultadoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

export const Resultado = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  background: #202024;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  p {
    color: #f4f4f5;
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    flex: 1;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.15s ease;
  }
  button:hover {
    transform: scale(1.1);
  }
  &:hover {
    border-color: #3f3f46;
    background: #27272a;
  }
`;