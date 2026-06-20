import styled from "styled-components";
import CardModel from "../../CardModel/index.jsx";
import { Input, Form, Button, Select, Option } from "../../../Inputs/index.jsx";
import Subtitle from "../../CardSubtitle/index.jsx";
import { deleteFilme, getFilmes } from "../../../../services/filmeService.js";
import { useEffect, useState } from "react";
import { Trash, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
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

function ListCard({ setFilmeToUpdate, reloadFilmes, setReloadFilmes }) {
  const [filmes, setFilmes] = useState([]);
  const [mensagem, setMensagem] = useState(null);
  const [filtrosAtuais, setFiltrosAtuais] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Emm caso de update em um filme, limpa a lista de filmes que estava sendo exibida
  useEffect(() => {
    if (!reloadFilmes) return;
    function updateFetchFilmes() {
      setFilmes([]);
      setReloadFilmes(false);
    }
    updateFetchFilmes();
  }, [reloadFilmes]);

  async function handleGetFilmes(e) {
    e.preventDefault();
    setFilmes([]);
    setMensagem(null);
    try {
      const filtros = processaBusca(e);
      setFiltrosAtuais(filtros);
      buscarFilmes(filtros, 1);
    } catch (error) {
      setMensagem(error.response.data.message);
    }
  }

  async function buscarFilmes(filtros, pagina) {
    setFilmes([])
    setPaginaAtual(pagina);
    const params = {
      ...filtros,
      pagina,
    };
    try {
      const data = await getFilmes(params);
      data.result.length === 0 && Object.keys(params).length === 0
        ? setMensagem("Não há filmes cadastrados") //
        : setFilmes(data.result);
    } catch (error) {
      setMensagem(error.response.data.message);
    }
  }

  async function handleDeleteFilme(id) {
    try {
      const data = await deleteFilme(id);
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function renderResultado(filmes, mensagem) {
    if (filmes.length > 0) {
      return (
        <ResultadoContainer>
          {filmes.map((filme) => {
            return (
              <Resultado key={filme._id}>
                <p>{filme.titulo}</p>
                <button onClick={() => handleDeleteFilme(filme._id)}>
                  <Trash size={18} color="white" strokeWidth={2} />
                </button>
                <button onClick={() => setFilmeToUpdate(filme)}>
                  <Edit2 size={18} color="white" strokeWidth={2} />
                </button>
              </Resultado>
            );
          })}
          <IconesPaginacao>
            <button
              onClick={() => buscarFilmes(filtrosAtuais, paginaAtual - 1)}
            >
              <ChevronLeft></ChevronLeft>
            </button>
            <button
              onClick={() => buscarFilmes(filtrosAtuais, paginaAtual + 1)}
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
    <ListContainer titulo="Listar Filmes">
      <Subtitle subtitle="Filtros"></Subtitle>
      <Form onSubmit={handleGetFilmes}>
        <Input placeholder="Título" name="titulo" />
        <Input placeholder="Gênero" name="genero" />
        <Input placeholder="Diretor" name="diretor" />
        <Input placeholder="Ano de Lançamento" name="anoLancamento" />
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
      {renderResultado(filmes, mensagem)}
    </ListContainer>
  );
}

export default ListCard;
