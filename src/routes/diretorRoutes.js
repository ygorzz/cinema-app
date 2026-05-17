import express from "express";
import DiretorController from "../controllers/diretorController.js";

// Carrega as funcionalidades que precisamos para gerenciar e trabalhar com rotas
const routes = express.Router();

routes
  .get("/diretores", DiretorController.listarDiretores)
  .get("/diretores/:id", DiretorController.buscarDiretorPorId)
  .post("/diretores", DiretorController.cadastrarDiretor)
  .put("/diretores/:id", DiretorController.atualizarDiretor)
  .delete("/diretores/:id", DiretorController.removerDiretor);

export default routes;