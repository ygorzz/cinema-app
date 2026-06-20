import styled from "styled-components";
import CardModel from "../../CardModel/index.jsx";
import { Input, Form, Button, Select, Option } from "../../../Inputs/index.jsx";
import Subtitle from "../../CardSubtitle/index.jsx";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Edit2, Trash } from "lucide-react";
import {
  deleteDiretor,
  getDiretores,
} from "../../../../services/diretorService.js";
import { useEffect } from "react";
import { Resultado, ResultadoContainer } from "../../../Resultado/index.jsx";
import { IconesPaginacao } from "../../../IconesPaginacao/index.jsx";

const ListContainer = styled(CardModel)``;

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
    const [filtrosAtuais, setFiltrosAtuais] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    if (!reloadDiretores) return;
    function updateFetchDiretores() {
      setDiretores([]);
      setReloadDiretores(false);
    }
    updateFetchDiretores();
     
  }, [reloadDiretores]);

  async function handleGetDiretores(e) {
    e.preventDefault();
    setDiretores([]);
    setMensagem(null);
    try {
      const filtros = processaBusca(e);
      setFiltrosAtuais(filtros);
      buscarDiretores(filtros, 1);
    } catch (error) {
      setMensagem(error.response.data.message);
    }
  }

    async function buscarDiretores(filtros, pagina) {
      setDiretores([])
      setPaginaAtual(pagina);
      const params = {
        ...filtros,
        pagina,
      };
      try {
        const data = await getDiretores(params);
        data.result.length === 0 && Object.keys(params).length === 0
          ? setMensagem("Não há diretores cadastrados") //
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
          <IconesPaginacao>
            <button
              onClick={() => buscarDiretores(filtrosAtuais, paginaAtual - 1)}
            >
              <ChevronLeft></ChevronLeft>
            </button>
            <button
              onClick={() => buscarDiretores(filtrosAtuais, paginaAtual + 1)}
            >
              <ChevronRight></ChevronRight>
            </button>
          </IconesPaginacao>
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
