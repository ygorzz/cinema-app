import * as FilmeService from "../services/filmeService.js";

class FilmeController {

  static async listarFilmes(req, res, next) {
    const {query, paginacao} = req;
    console.log(paginacao);
    try {
      const listaFilmes = await FilmeService.listarFilmes(query, paginacao);
      res.status(200).json({result: listaFilmes});
    } catch (error) {
      next(error);
    };
  };

  static async buscarFilmePorId(req, res, next) {
    const { id } = req.params;
    try {
      const filmeEncontrado = await FilmeService.buscarFilmePorId(id);
      res.status(200).json({result: filmeEncontrado});
    } catch (error) {
      next(error);
    };
  };

  static async cadastrarFilme(req, res, next) {
    const dadosFilme = req.body;
    try {
      const filmeCadastrado = await FilmeService.cadastrarFilme(dadosFilme);
      res.status(201).json({message: "Filme cadastrado com sucesso", result: filmeCadastrado});
    } catch (error) {
      next(error);
    }
  };

  static async atualizarFilme(req, res, next) {
    const { id } = req.params;
    const atualizacao = req.body;
    try {
      const filmeAtualizado = await FilmeService.atualizarFilme(id, atualizacao);
      res.status(200).json({message: "Filme atualizado com sucesso", result: filmeAtualizado});
    } catch (error) {
      next(error);
    }

  };

  static async removerFilme(req, res, next) {

    const { id } = req.params;
    try {
      const filmeRemovido = await FilmeService.removerFilme(id);
      res.status(200).json({message: "Filme removido com sucesso", result: filmeRemovido});
    } catch (error) {
      next(error);
    }
  };
};

export default FilmeController;