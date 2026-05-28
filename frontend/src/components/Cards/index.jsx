import styled from "styled-components";
import ListCard from "./CardsCrud/ListCard/index.jsx";
import AddCard from "./CardsCrud/AddCard/index.jsx";
import UpdateCard from "./CardsCrud/UpdateCard/index.jsx";
import DeleteCard from "./CardsCrud/DeleteCard/index.jsx";

const CardsContainer = styled.div`
  display: flex;
  margin: auto;
  height: 100%;
  width: 100%;
  /* border: 1px solid #fff; */
`;

function Cards() {
  return (
    <CardsContainer>
      <ListCard />
      <AddCard />
      <UpdateCard />
      <DeleteCard />
    </CardsContainer>
  );
}

export default Cards;
