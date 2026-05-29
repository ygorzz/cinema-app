import styled from "styled-components";
import CardModel from "../CardModel/index.jsx";
import { Input, Form, InputSubmit } from "../../Inputs/index.jsx";
import Subtitle from "../Subtitle/index.jsx";

const ListContainer = styled(CardModel)``;

function ListCard() {
  return (
    <ListContainer titulo="Listar Filmes">
      <Subtitle subtitle="Filtros"></Subtitle>
      <Form action={log}>
        <Input placeholder="ID" name="id" />
        <Input placeholder="Título" name="title" />
        <Input placeholder="Gênero" name="gender"/>
        <Input placeholder="Diretor" name="director" />
        <Input placeholder="Ano de Lançamento" name="year" />
        <InputSubmit value="Buscar" />
      </Form>
    </ListContainer>
  );
}

function log(formData){
  console.log(formData.get("gender"))
}

export default ListCard;
