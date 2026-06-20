import ListCard from "./ListCard/index.jsx";
import AddCard from "./AddCard/index.jsx";
import { useState } from "react";
import { CardsContainer } from "../index.jsx";

function CardsDiretores() {
  const [diretorToUpdate, setDiretorToUpdate] = useState(null);
  const [reloadDiretores, setReloadDiretores] = useState(false);

  return (
    <CardsContainer>
      <ListCard setDiretorToUpdate={setDiretorToUpdate} reloadDiretores={reloadDiretores} setReloadDiretores={setReloadDiretores} />
      <AddCard  diretorToUpdate={diretorToUpdate} setDiretorToUpdate={setDiretorToUpdate} setReloadDiretores={setReloadDiretores} />
    </CardsContainer>
  );
}

export default CardsDiretores;
