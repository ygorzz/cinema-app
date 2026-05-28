import mongoose from "mongoose";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroBase from "../errors/ErroBase.js";
import ErroValidacao from "../errors/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
export default function mnipuladorDeErros(erro, req, res, next){
  if(erro instanceof mongoose.Error.CastError){
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError){
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof ErroBase){
    erro.enviarResposta(res);
  } else {
    console.log(erro);
    new ErroBase().enviarResposta(res);
  }
}