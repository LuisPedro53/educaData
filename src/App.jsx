import GlobalStyle from "./Styles/global.js";
import styled from "styled-components";
import Form from "./Components/Form.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  return (
    <>
      <Container>
        <Title>Alunos</Title>
        <Form />
      </Container>

      <GlobalStyle />
    </>
  );
}

export default App;
