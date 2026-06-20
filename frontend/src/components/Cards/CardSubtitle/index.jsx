import styled from "styled-components";

const SubtitleElement = styled.h2`
  margin: 0;
  color: #f5f5f5;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

function Subtitle({subtitle}){
    return(
        <SubtitleElement>{subtitle}</SubtitleElement>
    )
}

export default Subtitle;