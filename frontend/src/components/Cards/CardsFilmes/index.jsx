import ListCard from "./ListCard/index.jsx";
import AddCard from "./AddCard/index.jsx";
import { useState } from "react";
import { CardsContainer } from "../index.jsx";

function CardsFilmes() {
  const [filmeToUpdate, setFilmeToUpdate] = useState(null);
  const [reloadFilmes, setReloadFilmes] = useState(false);
  
  return (
    <CardsContainer>
      <ListCard setFilmeToUpdate={setFilmeToUpdate} reloadFilmes={reloadFilmes} setReloadFilmes={setReloadFilmes} />
      <AddCard filmeToUpdate={filmeToUpdate} setFilmeToUpdate={setFilmeToUpdate} setReloadFilmes={setReloadFilmes} />
    </CardsContainer>
  );
}

export default CardsFilmes;
