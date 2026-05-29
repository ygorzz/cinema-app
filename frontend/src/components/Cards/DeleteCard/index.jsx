import styled from "styled-components";
import CardModel from "../CardModel/index.jsx";
import { Input, Form, InputSubmit } from "../../Inputs/index.jsx";
import Subtitle from "../Subtitle/index.jsx";

const DeleteContainer = styled(CardModel)``;

function DeleteCard() {
  return (
    <DeleteContainer titulo="Remover Filme">
      <Subtitle subtitle="Id do Filme" />
      <Form>
        <Input placeholder="ID" />
        <InputSubmit value="Remover" />
      </Form>
    </DeleteContainer>
  );
}

export default DeleteCard;
