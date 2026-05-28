import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

export default function validaPagina(totalDocumentos, pagina, limite){
  const totalPaginas = Math.ceil(totalDocumentos / limite); // Math.ceil -> arredonda pra cima
    
  if(pagina > totalPaginas){
    throw new RequisicaoIncorreta(`Página solicitada (${pagina}) excede o número máximo de páginas (${totalPaginas})`);
  }
}