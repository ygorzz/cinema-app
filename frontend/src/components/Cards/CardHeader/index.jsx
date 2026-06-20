import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 24px;
  border-bottom: 1px solid #2f2f2f;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 500;
  color: #f5f5f5;
  letter-spacing: 0.5px;
`;

function CardHeader({titulo}) {
  return (
    <HeaderContainer>
      <Title>{titulo}</Title>
    </HeaderContainer>
  );
}

export default CardHeader;
