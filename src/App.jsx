import GlobalStyle from "./Styles/global.js";
import styled from "styled-components";
import Form from "./Components/Form.jsx";
import Grid from "./Components/Grid.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState, useEffect } from "react";

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
  const [users, setUsers] = useState([]);
  const [ondEdit, setOndEdit] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post("http://localhost:8080/graphql", {
          query: `
            query GetAlunos($nmAluno: String, $cpfAluno: String, $emailAluno: String) {
              alunos(nmAluno: $nmAluno, cpfAluno: $cpfAluno, emailAluno: $emailAluno) {
                nmAluno
                emailAluno
                cpfAluno
              }
            }
          `,
          variables: {
            nmAluno: null, // Preencha com o valor desejado ou deixe como null se não desejar filtrar por este campo
            cpfAluno: null, // Preencha com o valor desejado ou deixe como null se não desejar filtrar por este campo
            emailAluno: null, // Preencha com o valor desejado ou deixe como null se não desejar filtrar por este campo
          },
        });
        setUsers(response.data.data.alunos);
      } catch (error) {
        toast.error("Erro ao carregar alunos");
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Container>
        <Title>Alunos</Title>
        <Form />
        <Grid users={users} />
      </Container>

      <GlobalStyle />
    </>
  );
}

export default App;
