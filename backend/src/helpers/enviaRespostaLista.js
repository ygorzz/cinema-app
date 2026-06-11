export default function enviaRespostaLista(dadosBusca, res) {

  if (validaBuscaLista(dadosBusca)) {
    return res.status(200).json({resultado: dadosBusca});
  } else {
    return res.status(200).json({
      resultado: dadosBusca,
      message: "Não foram encontrados dados correspondentes com essa busca"
    });
  }
}

// Verifica se houve retorno de um ARRAY vazio ou não para a busca - retorna true/false
function validaBuscaLista(dadosBusca) {
  return dadosBusca.length > 0;
}
