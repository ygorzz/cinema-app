import axios from "axios";

const filmeAPI = axios.create({ baseURL: "http://localhost:3000/filmes" });

async function getFilmes(filtros) {
    if (filtros.ordenacao) {
        const campoOrdenacao = "titulo"
        const separador = ":"
        const ordem = filtros.ordenacao;
        filtros.ordenacao = campoOrdenacao + separador + ordem;
    }
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