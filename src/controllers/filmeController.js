import filme from "../models/Filmes.js";
import { diretor } from "../models/Diretor.js";
import Erro404 from "../errors/Erro404.js";
import ErroValidacao from "../errors/ErroValidacao.js";
import enviaRespostaLista from "../helpers/enviaRespostaLista.js";
import enviaRespostaObjeto from "../helpers/enviaRespostaObjeto.js";
import validaPagina from "../helpers/validaPagina.js";
import validaLimite from "../helpers/validaLimite.js";

const mensagemErro404 = "Não foi encontrado filme correspondente a esse id.";

class FilmeController {

  static async listarFilmes(req, res, next) {

    try {

      const filmeExiste = await filme.exists({});
      if (!filmeExiste) {
        return res.status(200).json({ message: "Não há dados cadastrados nessa coleção" });
      }

      // Verifica se tem filtro ou não na url antes de realizar a busca
      const busca = processaBusca(req.query);
      const { pagina, limite, skip } = req.paginacao;

      validaLimite(limite);
      const totalDocumentos = await filme.countDocuments(busca);
      validaPagina(totalDocumentos, pagina, limite);

      const listaFilmes = await filme.find(busca)
        .skip(skip)
        .limit(limite);

      enviaRespostaLista(listaFilmes, res);
    } catch (error) {
      next(error);
    };
  };

  static async buscarFilmePorId(req, res, next) {

    const id = req.params.id;

    try {
      const filmeEncontrado = await filme.findById(id);
      enviaRespostaObjeto(filmeEncontrado, res, mensagemErro404);
    } catch (error) {
      next(error);
    };
  };

  static async cadastrarFilme(req, res, next) {

    const dadosFilme = req.body;
    const tituloFilme = req.body.titulo;
    const idDiretor = req.body.diretor;

    // Verificação antecipada para evitar consulta desnecessária no BD
    if (!tituloFilme || !idDiretor) {
      return next(new ErroValidacao("Titulo e diretor do filme são obrigatórios"));
    }

    try {
      const diretorBuscado = await diretor.findById(idDiretor); // Busca o diretor correspondente ao id
      if (!diretorBuscado) {
        return next(new Erro404("Não foi encontrado diretor correspondente a esse ID."));
      }

      const filmeCompleto = { ...dadosFilme, diretor: diretorBuscado }; // Constrói o objeto final
      const filmeCadastrado = await filme.create(filmeCompleto);
      enviaRespostaObjeto(filmeCadastrado, res, mensagemErro404);

    } catch (error) {
      next(error);
    };
  };

  static async atualizarFilme(req, res, next) {

    const id = req.params.id;
    const atualizacao = req.body;
    const idDiretor = atualizacao.diretor;

    try {
      if (idDiretor) {
        const diretorBuscado = await diretor.findById(idDiretor);
        if (!diretorBuscado) {
          return next(new Erro404("Não foi encontrado diretor correspondente a esse ID."));
        }
        atualizacao.diretor = diretorBuscado;
      }

      const filmeAtualizado = await filme.findByIdAndUpdate(id, atualizacao, { returnDocument: "after" });
      enviaRespostaObjeto(filmeAtualizado, res, mensagemErro404);
    } catch (error) {
      next(error);
    };
  };

  static async removerFilme(req, res, next) {

    const id = req.params.id;

    try {
      const filmeRemovido = await filme.findByIdAndDelete(id);
      enviaRespostaObjeto(filmeRemovido, res, mensagemErro404);
    } catch (error) {
      next(error);
    };
  };
};

function processaBusca(busca) {

  const { genero, anoLancamento, titulo, diretor } = busca;
  const filtros = {};

  if (genero) filtros.genero = genero;
  if (anoLancamento) filtros.anoLancamento = parseInt(anoLancamento);
  if (titulo) filtros.titulo = { $regex: titulo, $options: "i" };
  if (diretor) filtros.diretor = { $regex: diretor, $options: "i" };

  return filtros;
}

export default FilmeController;