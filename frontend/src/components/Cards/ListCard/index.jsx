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

function ListCard() {
  const [resultado, setResultado] = useState([]);
  const [temRequisicao, setTemrequisicao] = useState(false);

  async function handleGetFilmes(e) {
    e.preventDefault();
    const filtros = processaBusca(e);
    try {
      const data = await getFilmes(filtros);
      if(data.resultado.length === 0){
        setResultado(data.message);
      } else {
        setResultado(data.resultado)
      }
      setTemrequisicao(true);
    } catch (error) {
      console.log(error);
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
      {temRequisicao ? (
        <Resultado>
          {resultado.map((filme) => {
            return <p key={filme.id}>{filme.titulo}</p>;
          })}
        </Resultado>
      ) : null}
    </ListContainer>
  );
}

export default ListCard;
