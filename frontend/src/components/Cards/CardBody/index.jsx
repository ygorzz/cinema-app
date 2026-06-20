import styled from "styled-components";

const BodyContainer = styled.div`
  height: calc(100% - 70px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function CardBody({ children }) {
  return (
    <BodyContainer>
      {children}
    </BodyContainer>
  );
}

export default CardBody;
