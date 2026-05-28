import "dotenv/config"; // inicia o dotenv na aplicação
import "./src/config/mongooseValidations.js";
import app from "./src/app.js";
import conectaNoBD from "./src/config/dbConnect.js";

const PORT = 3000;

// Tenta conexão com o BD e, se consegue, inicia o server
async function startServer() {
  try {
    const conexao = await conectaNoBD();

    conexao.once("open", () => {
      console.log("Conexão com o BD feita com sucesso");

      app.listen(PORT, () => {
        console.log("Servidor rodando e aguardando requisição");
      });
    });
  } catch (error) {
    console.error("Erro ao conectar com o BD", error);
  }
}

startServer();