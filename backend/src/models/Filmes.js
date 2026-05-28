import mongoose from "mongoose";
import {diretorSchema} from "./Diretor.js";

const DURACAO_MAX = 180;
const DURACAO_MIN = 80;

const filmeSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  titulo: {type: String, required: [true, "Título do filme obrigatório"]},
  genero: {type: String},
  anoLancamento: {type: Number},
  duracaoMinutos: {type: Number,
    validate:{
      validator: (valor) => {
        return valor >= DURACAO_MIN && valor <= DURACAO_MAX; 
      },
      message: `O filme deve conter entre ${DURACAO_MIN} e ${DURACAO_MAX} minutos`
    }
  },
  diretor: {type: diretorSchema, required: [true, "Diretor do filme obrigatório"]}
}, {versionKey: false});  

const filme = mongoose.model("filmes", filmeSchema);

export default filme;   