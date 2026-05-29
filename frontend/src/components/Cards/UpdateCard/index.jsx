import styled from "styled-components";
import CardModel from "../CardModel/index.jsx";
import { Input, Form, InputSubmit } from "../../Inputs/index.jsx";
import Subtitle from "../Subtitle/index.jsx";

const UpdateContainer = styled(CardModel)``;

function UpdateCard() {
  return (
    <UpdateContainer titulo="Atualizar Filme">
      <Subtitle subtitle="Id do Filme" />
      <Form>
        <Input placeholder="ID" />
      </Form>
      <Subtitle subtitle="Dados" />
      <Form>
        <Input placeholder="Titulo" />
        <Input placeholder="Gênero" />
        <Input placeholder="Ano de Lançamento" />
        <Input placeholder="Duração em Minutos" />
        <Input placeholder="Diretor" />
        <InputSubmit value="Atualizar" />
      </Form>
    </UpdateContainer>
  );
}

export default UpdateCard;
