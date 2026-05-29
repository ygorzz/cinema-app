import styled from "styled-components";
import CardModel from "../CardModel/index.jsx";
import { Input, Form, InputSubmit } from "../../Inputs/index.jsx";
import Subtitle from "../Subtitle/index.jsx";

const AddContainer = styled(CardModel)``;

function AddCard() {
  return (
    <AddContainer titulo="Adicionar Filme">
      <Subtitle subtitle="Dados" />
      <Form>
        <Input placeholder="Titulo" />
        <Input placeholder="Gênero" />
        <Input placeholder="Ano de Lançamento" />
        <Input placeholder="Duração em Minutos" />
        <Input placeholder="Diretor" />
        <InputSubmit value="Adicionar" />
      </Form>
    </AddContainer>
  );
}

export default AddCard;
