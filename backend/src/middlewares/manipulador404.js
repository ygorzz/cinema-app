import Erro404 from "../errors/Erro404.js";

export default function manipulador404(req, res, next){
  next(new Erro404());
} 