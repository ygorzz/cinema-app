// Trata entradas do usuário para evitar Regex Injections
export default function escapeRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}