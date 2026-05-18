import Erro404 from "../errors/Erro404.js";

export default function enviaRespostaObjeto(dadosBusca, res, mensagem = "Não foi encontrado dado correspondente a esse ID.") {

  // Para respostas em outras rotas
  if (validaBuscaObjeto(dadosBusca)){
    return res.status(200).json({resultado: dadosBusca });
  } else {
    throw new Erro404(mensagem);
  }

}

// Verifica se houve retorno de null ou não para a busca - retorna true/false
function validaBuscaObjeto(dadosBusca) {
  return dadosBusca !== null;
}