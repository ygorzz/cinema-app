import styled from "styled-components";
import Title from "../CardsSections/Title/index.jsx";

const Card = styled.div`
  margin: 40px;
  height: calc(100% - 80px);
  width: 25%;
  border: 1px solid #fff;
`;

const BodyContainer = styled.div`
  height: calc(100% - 70px);
`

const FiltersContainer = styled.div`
  
`

const FilterTitle = styled.h3`
  color: #fff;
  margin: 20px;
  font-size: 22px;
  font-weight: 100;
`

function CardModel({ titulo }) {
  return (
    <Card>
      <Title titulo={titulo}></Title>
      <BodyContainer>
        <FiltersContainer>
          <FilterTitle>Filtros</FilterTitle>
        </FiltersContainer>
      </BodyContainer>
    </Card>
  );
}

export default CardModel;
