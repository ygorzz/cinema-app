import styled from "styled-components";

export const IconesPaginacao = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;

  margin-top: 32px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 42px;
    height: 42px;

    border: 1px solid #3f3f46;
    border-radius: 50%;

    background: #202024;
    color: white;

    cursor: pointer;

    transition: all 0.2s ease;
  }

  button:hover {
    background: #27272a;
    transform: translateY(-2px);
  }
`;