import express from "express";
import FilmeController from "../controllers/filmeController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes
  .get("/filmes", paginar, FilmeController.listarFilmes)
  .get("/filmes/:id", FilmeController.buscarFilmePorId)
  .post("/filmes", FilmeController.cadastrarFilme)
  .put("/filmes/:id", FilmeController.atualizarFilme)
  .delete("/filmes/:id", FilmeController.removerFilme);

export default routes;