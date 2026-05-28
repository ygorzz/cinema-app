import ErroBase from "./ErroBase.js";

export default class Erro404 extends ErroBase{
  constructor(mensagem = "Página não localizada"){
    super(mensagem, 404);
  }
} 