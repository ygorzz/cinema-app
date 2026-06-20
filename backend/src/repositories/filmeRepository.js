import filme from "../models/Filmes.js";

async function existe(){
  return await filme.exists({});
}

async function contarDocumentos(busca){
  return await filme.countDocuments(busca);
}

async function listarFilmes(busca, options){
  if(options){
    const {limite, skip, campoOrdenacao, ordem} = options;  
    return await filme.find(busca)
      .sort({[campoOrdenacao] : ordem})
      .skip(skip)
      .limit(limite)
      .collation({locale: "pt" }); // Informa ao MongoDB o idioma usado para comparar, ordenar strings
  }
  return await filme.find(busca);
} 

async function buscarFilmePorId(id) {
  return await filme.findById(id);
}

async function cadastrarFilme(novoFilme) {
  return await filme.create(novoFilme);
}

async function atualizarFilmePorId(id, atualizacao) {
  return await filme.findByIdAndUpdate(id, atualizacao, {returnDocument: "after", runValidators: true});
}

async function removerFilmePorId(id) {
  return await filme.findByIdAndDelete(id);
} 

export {
  existe,
  contarDocumentos,
  listarFilmes,
  buscarFilmePorId,
  atualizarFilmePorId,
  removerFilmePorId,
  cadastrarFilme
};