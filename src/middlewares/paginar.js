import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

export default function paginar(req, res, next){

  let {limite = 2, pagina = 1} = req.query;

  limite = parseInt(limite);
  pagina = parseInt(pagina);
  
  if(isNaN(limite) || isNaN(pagina) || limite <= 0 || pagina <= 0 ) return next(new RequisicaoIncorreta());

  req.paginacao = {
    pagina,
    limite,
    skip: (pagina - 1) * limite
  };

  next();

}
