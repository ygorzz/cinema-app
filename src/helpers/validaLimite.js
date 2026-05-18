import ErroValidacao from "../errors/ErroValidacao.js";

export default function validaLimite(limite){
  const LIMITE_MAXIMO = 100;
  if(limite > LIMITE_MAXIMO) throw new ErroValidacao(`Limite solicitado (${limite}) excede o limite máximo (${LIMITE_MAXIMO})`);
}