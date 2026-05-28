import mongoose from "mongoose";

const diretorSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  nome: {type: String, required: [true, "Nome do diretor obrigatório"]},
  nacionalidade: {type: String}
}, {versionKey: false});

const diretor = mongoose.model("diretores", diretorSchema);

export {diretor, diretorSchema};