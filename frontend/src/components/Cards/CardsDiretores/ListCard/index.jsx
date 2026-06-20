import styled from "styled-components";
import CardModel from "../../CardModel/index.jsx";
import { Input, Form, Button, Select, Option } from "../../../Inputs/index.jsx";
import Subtitle from "../../Subtitle/index.jsx";
import { useState } from "react";
import { Edit2, Trash } from "lucide-react";
import {
  deleteDiretor,
  getDiretores,
} from "../../../../services/diretorService.js";
import { useEffect } from "react";

const ListContainer = styled(CardModel)``;

const ResultadoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Resultado = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  p {
    font-size: 18px;
  }
  button {
    background: none;
    height: 20px;
    cursor: pointer;
  }
  cursor: pointer;
  &:hover {
    border: 1px solid white;
  }
`;

function processaBusca(e) {
  const filtros = {};
  const form = e.target;
  for (const input of form) {
    if (input.name && input.value !== "") {
      filtros[input.name] = input.value;
    }
  }
  return filtros;
}

function ListCard({ setDiretorToUpdate, reloadDiretores, setReloadDiretores }) {
  const [diretores, setDiretores] = useState([]);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    if (!reloadDiretores) return;
    function updateFetchDiretores() {
      setDiretores([]);
      setReloadDiretores(false);
    }
    updateFetchDiretores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadDiretores]);

  async function handleGetDiretores(e) {
    e.preventDefault();
    setDiretores([]);
    setMensagem(null);
    try {
      const filtros = processaBusca(e);
      const data = await getDiretores(filtros);
      data.result.length === 0 && Object.keys(filtros).length === 0
        ? setMensagem("Não há diretores cadastrados")
        : setDiretores(data.result);
    } catch (error) {
      setMensagem(error.response.data.message);
    }
  }

  async function handleDeleteDiretor(id) {
    try {
      const data = await deleteDiretor(id);
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  function renderResultado(diretores, mensagem) {
    if (diretores.length > 0) {
      return (
        <ResultadoContainer>
          {diretores.map((diretor) => {
            return (
              <Resultado key={diretor._id}>
                <p>{diretor.nome}</p>
                <button onClick={() => handleDeleteDiretor(diretor._id)}>
                  <Trash size={18} color="white" strokeWidth={2} />
                </button>
                <button onClick={() => setDiretorToUpdate(diretor)}>
                  <Edit2 size={18} color="white" strokeWidth={2} />
                </button>
              </Resultado>
            );
          })}
        </ResultadoContainer>
      );
    } else if (mensagem) {
      return (
        <Resultado>
          <p>{mensagem}</p>
        </Resultado>
      );
    } else {
      return null;
    }
  }

  return (
    <ListContainer titulo="Listar Diretores">
      <Subtitle subtitle="Filtros"></Subtitle>
      <Form onSubmit={handleGetDiretores}>
        <Input placeholder="Nome" name="nome" />
        <Input placeholder="Nacionalidade" name="nacionalidade" />
        <Select name="ordenacao" defaultValue="">
          <Option value="" disabled>
            Ordenar por
          </Option>
          <Option value="1">A-Z</Option>
          <Option value="-1">Z-A</Option>
        </Select>
        <Button type="submit" color="#c41a1a">
          Buscar
        </Button>
      </Form>
      {renderResultado(diretores, mensagem)}
    </ListContainer>
  );
}

export default ListCard;
