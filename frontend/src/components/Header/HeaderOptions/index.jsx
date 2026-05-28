import styled from "styled-components";

const Options = styled.ul`
  display: flex;
  cursor: pointer;
`;

const Option = styled.li`
  padding: 0 18px;
  font-size: 26px;
  display: flex;
  align-items: center;
`;

function HeaderOptions() {
  return (
    <Options>
      <Option>Filmes</Option>
      <Option>Diretores</Option>
    </Options>
  );
}

export default HeaderOptions;
