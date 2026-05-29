import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  height: 70px;
  border: 1px solid #333333;
  /* background-color: #CCCCCC; */
`;

const Title = styled.h3`
  margin: 20px;
  font-size: 24px;
  font-weight: 100;
  color: #fff;
`;

function CardHeader({titulo}) {
  return (
    <HeaderContainer>
      <Title>{titulo}</Title>
    </HeaderContainer>
  );
}

export default CardHeader;
