import mongoose from "mongoose";

// é executado antes do model se comunicar com o banco de dados, antes do create
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "",
  message: ({path}) => `O campo ${path} foi fornecido em branco`
});