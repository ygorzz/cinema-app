import { Link } from "react-router-dom";
import styled from "styled-components";

const Options = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  height: 80px;
  color: #fff;
  font-size: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.85;
  }
`;

function HeaderOptions() {
  return (
    <Options>
      <Link to={"/filmes"}>
        <Option>Filmes</Option>
      </Link>
      <Link to={"/diretores"}>
        <Option>Diretores</Option>
      </Link>
    </Options>
  );
}

export default HeaderOptions;
