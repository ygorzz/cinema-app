import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  height: 70px;
  border: 1px solid #fff;
`;

const TitleContent = styled.h3`
  margin: 20px;
  font-size: 24px;
  font-weight: 100;
  color: #fff;
`;

function Title({titulo}) {
  return (
    <TitleContainer>
      <TitleContent>{titulo}</TitleContent>
    </TitleContainer>
  );
}

export default Title;
