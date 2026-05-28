import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

export default function paginar(req, res, next){

  let {limite = 10, pagina = 1, ordenacao = "_id:-1"} = req.query;
  let {campoOrdenacao, ordem} = processaOrdenacao(ordenacao);

  limite = parseInt(limite);
  pagina = parseInt(pagina);
  ordem = parseInt(ordem);
  
  if(isNaN(limite) || isNaN(pagina) || limite <= 0 || pagina <= 0 ) return next(new RequisicaoIncorreta());

  req.paginacao = {
    pagina,
    limite,
    skip: (pagina - 1) * limite,
    campoOrdenacao,
    ordem
  };

  next();
}

function processaOrdenacao(ordenacao){
  const parametrosOrdenacao = {};
  const [campoOrdenacao, ordem] = ordenacao.split(":");
  parametrosOrdenacao.campoOrdenacao = campoOrdenacao;
  parametrosOrdenacao.ordem = ordem;

  return parametrosOrdenacao;
}