import styled from "styled-components";
import CardModel from "../../CardModel/index.jsx";
import { Input, Form, Button, Select, Option } from "../../../Inputs/index.jsx";
import Subtitle from "../../Subtitle/index.jsx";
import { insertFilme, updateFilme } from "../../../../services/filmeService.js";
import { useEffect, useState } from "react";
import { getDiretores } from "../../../../services/diretorService.js";

const AddContainer = styled(CardModel)``;

function processaBusca(e) {
  const filme = {};
  const form = e.target;
  for (const input of form) {
    if (input.name) {
      filme[input.name] = input.value;
    }
  }
  return filme;
}

function AddCard({ filmeToUpdate, setFilmeToUpdate, setReloadFilmes }) {
  const [diretores, setDiretores] = useState([]);
  const [campos, setCampos] = useState({
    titulo: "",
    genero: "",
    anoLancamento: "",
    duracaoMinutos: "",
    diretor: "",
  });

  // Quando filmeToUpdate mudar, preenche os campos
  useEffect(() => {
    function buildFields() {
      if (filmeToUpdate) {
        setCampos({
          titulo: filmeToUpdate.titulo ?? "",
          genero: filmeToUpdate.genero ?? "",
          anoLancamento: filmeToUpdate.anoLancamento ?? "",
          duracaoMinutos: filmeToUpdate.duracaoMinutos ?? "",
          diretor: filmeToUpdate.diretor?._id ?? filmeToUpdate.diretor ?? "",
        });
      } else {
        setCampos({
          titulo: "",
          genero: "",
          anoLancamento: "",
          duracaoMinutos: "",
          diretor: "",
        });
      }
    }
    buildFields();
  }, [filmeToUpdate]);

  useEffect(() => {
    async function fetchDiretores() {
      try {
        const data = await getDiretores();
        setDiretores(data.result || []);
      } catch (error) {
        console.log(error);
        alert("Erro ao carregar diretores. Tente novamente");
      }
    }

    fetchDiretores();
  }, []);

  async function handleInsertFilme(e) {
    e.preventDefault();
    try {
      const filme = processaBusca(e);
      const data = await insertFilme(filme);
      setCampos({
          titulo: "",
          genero: "",
          anoLancamento: "",
          duracaoMinutos: "",
          diretor: "",
        });
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function handleUpdateFilme(e) {
    e.preventDefault();
    try {
      const filme = processaBusca(e);
      filme._id = filmeToUpdate._id;
      const data = await updateFilme(filme);
      setReloadFilmes(true);
      setFilmeToUpdate(null);
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <AddContainer
      titulo={filmeToUpdate ? "Atualizar Filme" : "Adicionar Filme"}
    >
      <Subtitle subtitle="Dados" />
      <Form onSubmit={filmeToUpdate ? handleUpdateFilme : handleInsertFilme}>
        <Input
          placeholder="Titulo"
          name="titulo"
          required
          value={campos.titulo}
          onChange={(e) => setCampos({ ...campos, titulo: e.target.value })}
        />
        <Input
          placeholder="Gênero"
          name="genero"
          value={campos.genero}
          onChange={(e) => setCampos({ ...campos, genero: e.target.value })}
        />
        <Input
          placeholder="Ano de Lançamento"
          name="anoLancamento"
          value={campos.anoLancamento}
          onChange={(e) =>
            setCampos({ ...campos, anoLancamento: e.target.value })
          }
        />
        <Input
          placeholder="Duração em Minutos"
          name="duracaoMinutos"
          value={campos.duracaoMinutos}
          onChange={(e) =>
            setCampos({ ...campos, duracaoMinutos: e.target.value })
          }
        />
        <Select
          name="diretor"
          required
          value={campos.diretor}
          onChange={(e) => setCampos({ ...campos, diretor: e.target.value })}
        >
          <Option value="" disabled>
            Diretor
          </Option>
          {diretores.length !== 0 &&
            diretores.map((diretor) => (
              <Option key={diretor._id} value={diretor._id}>
                {diretor.nome}
              </Option>
            ))}
        </Select>

        {filmeToUpdate && (
          <Button onClick={() => setFilmeToUpdate(null)} type="button">Cancelar</Button>
        )}
        <Button type="submit" color="#c41a1a">
          {filmeToUpdate ? "Salvar Alterações" : "Adicionar"}
        </Button>
      </Form>
    </AddContainer>
  );
}

export default AddCard;
