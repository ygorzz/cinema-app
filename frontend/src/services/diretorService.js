import axios from "axios";
import { validaOrdenacao } from "../helpers/validaOrdenacao";

const diretorAPI = axios.create({ baseURL: `/api/diretores` });

async function getDiretores(filtros = {}) { // Objeto vazio para carregar diretores no select da page de filmes
    filtros.ordenacao = validaOrdenacao(filtros.ordenacao, "nome")
    const response = await diretorAPI.get("/", {
        params: filtros
    });
    return response.data;
}

async function deleteDiretor(id) {
    const response = await diretorAPI.delete(`${id}`);
    return response.data;
}

async function insertDiretor(diretor) {
    const response = await diretorAPI.post("/", diretor)
    console.log(response.data);
    return response.data;
}

async function updateDiretor({ _id, ...atualizacao }) {
    const response = await diretorAPI.put(`${_id}`, atualizacao);
    return response.data;
}

export {
    getDiretores,
    deleteDiretor,
    insertDiretor,
    updateDiretor
}