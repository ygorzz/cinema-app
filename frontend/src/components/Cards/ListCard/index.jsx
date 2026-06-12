import styled from "styled-components";
import CardModel from "../CardModel/index.jsx";
import { Input, Form, InputSubmit } from "../../Inputs/index.jsx";
import Subtitle from "../Subtitle/index.jsx";
import { getFilmes } from "../../../services/filmeService.js";
import { useState } from "react";

const ListContainer = styled(CardModel)``;

const Resultado = styled.div`
  color: white;
`;

function processaBusca(e) {
  const filtros = {};
  const form = e.target;
  for (const input of form) {
    if (input.value !== "") {
      filtros[input.name] = input.value;
    }
  }
  return filtros;
}

function renderResultado(resultado, mensagem) {
  if(resultado.length > 0) {
    return (
    <Resultado>
      {resultado.map((filme) => {
        return <p key={filme.id}>{filme.titulo}</p>;
      })}
    </Resultado>
    )
  } else if (mensagem) {
    return (
    <Resultado>
      <p>{mensagem}</p>
    </Resultado>
    )
  } else {
    return null;
  }
}

function ListCard() {
  const [resultado, setResultado] = useState([]);
  const [mensagem, setMensagem] = useState(null);

  async function handleGetFilmes(e) {
    e.preventDefault();
    try {
      setResultado([]);
      setMensagem(null);
      const filtros = processaBusca(e);
      const data = await getFilmes(filtros);
      data.result.length === 0
        ? setMensagem(data.message)
        : setResultado(data.result);
    } catch (error) {
      setMensagem(error.response.data.message);
    }
  }

  return (
    <ListContainer titulo="Listar Filmes">
      <Subtitle subtitle="Filtros"></Subtitle>
      <Form onSubmit={handleGetFilmes}>
        <Input placeholder="Título" name="titulo" />
        <Input placeholder="Gênero" name="genero" />
        <Input placeholder="Diretor" name="diretor" />
        <Input placeholder="Ano de Lançamento" name="anoLancamento" />
        <Input placeholder="Ordenar" name="ordenacao" />
        <InputSubmit value="Buscar" />
      </Form>
      {renderResultado(resultado, mensagem)}
    </ListContainer>
  );
}

export default ListCard;
