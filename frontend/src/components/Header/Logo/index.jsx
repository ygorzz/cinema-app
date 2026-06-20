import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h2`
  margin: 0;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.85;
  }
`;

function Logo(){
    return (
        <Link to="/filmes">
            <Title>CinemaAPI</Title>
        </Link>
    )
}

export default Logo;