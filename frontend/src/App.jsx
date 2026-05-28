import styled from "styled-components";
import Header from "./components/Header/index.jsx";
import Cards from "./components/Cards/index.jsx";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

function App() {
  return (
    <AppContainer>
      <Header />
      <Cards />
    </AppContainer>
  )
}

export default App
