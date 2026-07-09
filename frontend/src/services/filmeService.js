import axios from "axios";
import { validaOrdenacao } from "../helpers/validaOrdenacao";

const filmeAPI = axios.create({ baseURL: `/api/filmes` });

async function getFilmes(filtros) {
    filtros.ordenacao = validaOrdenacao(filtros.ordenacao, "titulo");   
    const response = await filmeAPI.get("/", {
        params: filtros
    }); 
    return response.data;
}

async function deleteFilme(id) {
    const response = await filmeAPI.delete(`${id}`);
    return response.data;
}

async function insertFilme(filme) {
    const response = await filmeAPI.post("/", filme)
    return response.data;
}

async function updateFilme({ _id, ...atualizacao }) {
    const response = await filmeAPI.put(`${_id}`, atualizacao)
    return response.data;
}

export {
    getFilmes,
    deleteFilme,
    insertFilme,
    updateFilme
}