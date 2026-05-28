// Configuração da aplicação
import express from "express";
import routes from "./routes/index.js";

const app = express(); // Cria instância
routes(app); // Inicia as rotas

export default app;