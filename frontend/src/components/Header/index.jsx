import styled from "styled-components";
import HeaderOptions from "./HeaderOptions/index.jsx";
import Logo from "./Logo/index.jsx";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    color: #FFF;
    background-image: linear-gradient(135deg, #0a0a0a 0%, #1e0000 45%, #7a1111 75%, #c41a1a 100%);
    
`

function Header(){
    return (
        <HeaderContainer>
            <Logo />
            <HeaderOptions />
        </HeaderContainer>
    )
} 

export default Header;