// Receber e centraliza todas as rotas. Processa todas do mesmo modo.
import express from "express";
import cors from "cors";
import diretorRoutes from "./diretorRoutes.js";
import filmeRoutes from "./filmeRoutes.js";
import manipulador404 from "../middlewares/manipulador404.js";
import manipuladorDeErros from "../middlewares/manipuladorDeErros.js";

// Inclui na instância do Express (app) os middlewares e as rotas do projeto.
export default function routes(app){
  app.use(cors("*"));
  app.route("/").get((req, res) => res.status(200).json({message: "Primeira rota"}));
  app.use(express.json(), diretorRoutes, filmeRoutes);
  app.use(manipulador404); // Se a rota da req não for compatível com as registradas, a req cai dentro desse middleware.
  app.use(manipuladorDeErros);
};