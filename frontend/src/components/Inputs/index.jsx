import styled from "styled-components";

const FormElement = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const InputElement = styled.input`
  height: 40px;
  width: 48%;
  padding: 0 12px;
  font-size: 16px;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  background-color: #222222;
  color: #ffffff;
  transition: border-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: #666666;
  }
  &::placeholder {
    color: #999999;
  }
`;

const ButtonElement = styled.button`
  height: 42px;
  width: 100%;

  margin: 12px 0;

  cursor: pointer;

  border: none;
  border-radius: 8px;

  background-color: ${(props) => props.color || "#ffffff"};

  color: white;

  font-size: 16px;
  font-weight: 500;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SelectElement = styled.select`
  height: 40px;
  width: 49%;
  padding: 0 12px;
  font-size: 16px;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  background-color: #222222;
  color: #ffffff;
  transition: border-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: #666666;
  }
`;

const OptionElement = styled.option``;

export function Form({ children, ...props }) {
  return <FormElement {...props}>{children}</FormElement>;
}

export function Input({ ...props }) {
  return <InputElement {...props} />;
}

export function Button({ ...props }) {
  return <ButtonElement {...props} />;
}

export function Select({ children, ...props }) {
  return <SelectElement {...props}>{children}</SelectElement>;
}

export function Option({ children, ...props }) {
  return <OptionElement {...props}>{children}</OptionElement>;
}
