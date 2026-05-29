import styled from "styled-components";

const FormElement = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const InputElement = styled.input`
  height: 35px;
  width: 48%;
  font-size: 20px;
  border-radius: 9px;
  background-color: #f0f0f0;
`;

const InputSubmitElement = styled(InputElement)`
  height: 40px;
  width: 100%;
  margin: 20px 0px;
  cursor: pointer;
  background-color: #c41a1a;
`;

export function Form({ action, children }) {
  return <FormElement action={action}>{children}</FormElement>;
}

export function Input({ placeholder, type, value, name }) {
  return <InputElement placeholder={placeholder} type={type} value={value} name={name} />;
}

export function InputSubmit({ placeholder, value }) {
  return (
    <InputSubmitElement placeholder={placeholder} type="submit" value={value} />
  );
}
