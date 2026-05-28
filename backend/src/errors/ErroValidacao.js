import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

export default class ErroValidacao extends RequisicaoIncorreta{
  constructor(erroOuMensagem){

    if(typeof erroOuMensagem === "string"){
      super(erroOuMensagem);
      return; 
    }

    const mensagensErros = Object.values(erroOuMensagem.errors)
      .map(erro => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${mensagensErros}`);
  }
}