import enviaRespostaLista from "../helpers/enviaRespostaLista.js";
import enviaRespostaObjeto from "../helpers/enviaRespostaObjeto.js";
import {diretor} from "../models/Diretor.js";

const mensagemErro404 = "Não foi encontrado diretor correspondente a esse ID.";

class DiretorController {

  static async listarDiretores (req, res, next){
    const busca = processaBusca(req.query);
    try {
      const listaDiretores = await diretor.find(busca);
      enviaRespostaLista(listaDiretores, res, busca);
    } catch (error) {
      next(error);
    };
  };

  static async buscarDiretorPorId (req, res, next){
    const id = req.params.id;
    try {
      const diretorEncontrado = await diretor.findById(id);
      enviaRespostaObjeto(diretorEncontrado, res, next, mensagemErro404);
    } catch (error) {
      next(error);    
    };
  };

  static async cadastrarDiretor (req, res, next){
    try {
      // create -> valida campos required antes de executar a operação no BD
      const diretorCadastrado = await diretor.create(req.body);
      enviaRespostaObjeto(diretorCadastrado, res, next);
    } catch (error) {
      next(error);
    };
  };

  static async atualizarDiretor (req, res, next){
    const id = req.params.id;
    const atualizacao = req.body;
    try {
      const diretorAtualizado = await diretor.findByIdAndUpdate(id, atualizacao, {returnDocument: "after"});
      enviaRespostaObjeto(diretorAtualizado, res, next, mensagemErro404);
    } catch (error) {
      next(error);
    };
  };

  static async removerDiretor (req, res, next){
    try {
      const id = req.params.id;
      const diretorRemovido = await diretor.findByIdAndDelete(id);
      enviaRespostaObjeto(diretorRemovido, res, next, mensagemErro404); 
    } catch (error) {
      next(error);
    };
  };

};

function processaBusca(busca){
  const { nome, nacionalidade } = busca;
  const filtros = {};
  if(nome) filtros.nome = {$regex: nome, $options: "i"};
  if(nacionalidade) filtros.nacionalidade = {$regex: nacionalidade, $options: "i"};

  return filtros;
}

export default DiretorController;