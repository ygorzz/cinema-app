import styled from "styled-components";
import CardModel from "../../CardModel/index.jsx";
import { Input, Form, Button } from "../../../Inputs/index.jsx";
import Subtitle from "../../Subtitle/index.jsx";
import {
  insertDiretor,
  updateDiretor,
} from "../../../../services/diretorService.js";
import { useEffect, useState } from "react";

const AddContainer = styled(CardModel)``;

function processaBusca(e) {
  const diretor = {};
  const form = e.target;
  for (const input of form) {
    if (input.name) {
      diretor[input.name] = input.value;
    }
  }
  return diretor;
}

function AddCard({ diretorToUpdate, setDiretorToUpdate, setReloadDiretores }) {
  const [campos, setCampos] = useState({
    nome: "",
    nacionalidade: "",
  });

  useEffect(() => {
    function buildFields() {
      if (diretorToUpdate) {
        setCampos({
          nome: diretorToUpdate.nome ?? "",
          nacionalidade: diretorToUpdate.nacionalidade ?? "",
        });
      } else {
        setCampos({
          nome: "",
          nacionalidade: ""
        })
      }
    }
    buildFields();
  }, [diretorToUpdate]);

  async function handleInsertDiretor(e) {
    e.preventDefault();
    try {
      const diretor = processaBusca(e);
      const data = await insertDiretor(diretor);
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  async function handleUpdateDiretor(e) {
    e.preventDefault();
    try {
      const diretor = processaBusca(e);
      diretor._id = diretorToUpdate._id;
      const data = await updateDiretor(diretor);
      setReloadDiretores(true);
      setDiretorToUpdate(null);
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <AddContainer titulo={diretorToUpdate ? "Atualizar Diretor" : "Adicionar Diretor"}>
      <Subtitle subtitle="Dados" />
      <Form
        onSubmit={diretorToUpdate ? handleUpdateDiretor : handleInsertDiretor}
      >
        <Input
          placeholder="Nome"
          name="nome"
          required
          value={campos.nome}
          onChange={(e) => setCampos({ ...campos, nome: e.target.value })}
        />
        <Input
          placeholder="Nacionalidade"
          name="nacionalidade"
          value={campos.nacionalidade}
          onChange={(e) =>
            setCampos({ ...campos, nacionalidade: e.target.value })
          }
        />

        {diretorToUpdate && (
          <Button onClick={() => setDiretorToUpdate(null)} type="button" >Cancelar</Button>
        )}
        <Button type="submit" color="#c41a1a">
          {diretorToUpdate ? "Salvar Alterações" : "Adicionar"}
        </Button>
      </Form>
    </AddContainer>
  );
}

export default AddCard;
