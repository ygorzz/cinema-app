import styled from "styled-components";
import Header from "../CardHeader/index.jsx";
import CardBody from "../CardBody/index.jsx";

const Card = styled.div`
  flex: 1;
  min-width: 0;

  margin: 0;
  padding: 24px;

  background: #18181b;
  border: 1px solid #27272a;

  border-radius: 16px;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.25),
    0 2px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;

  transition: all 0.2s ease;

  &:hover {
    border-color: #3f3f46;
  }
`;
function CardModel({ titulo, children }) {
  return (
    <Card>
      <Header titulo={titulo}></Header>
      <CardBody children={children} />
    </Card>
  );
}

export default CardModel;
