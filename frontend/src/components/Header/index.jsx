import styled from "styled-components";
import HeaderOptions from "./HeaderOptions/index.jsx";
import Logo from "./Logo/index.jsx";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 32px;
  color: #fff;
  background-image: linear-gradient(
    135deg,
    #0a0a0a 0%,
    #1e0000 45%,
    #7a1111 75%,
    #c41a1a 100%
  );
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  a {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 0 14px;
    font-size: 22px;
    font-weight: 500;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 0.85;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <HeaderOptions />
    </HeaderContainer>
  );
}

export default Header;
