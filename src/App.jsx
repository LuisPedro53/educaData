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

  const [editingUser, setEditingUser] = useState(null);

  // Mova a definição de fetchUsers para fora do useEffect
  const fetchUsers = async () => {
    try {
      const response = await axios.post("http://localhost:8080/graphql", {
        query: `
        query GetAlunos($nmAluno: String, $cpfAluno: String, $emailAluno: String) {
          alunos(nmAluno: $nmAluno, cpfAluno: $cpfAluno, emailAluno: $emailAluno) {
            cdAluno
            nmAluno
            emailAluno
            cpfAluno
          }
        }
      `,
        variables: {
          nmAluno: null,
          cpfAluno: null,
          emailAluno: null,
        },
      });
      setUsers(response.data.data.alunos);
    } catch (error) {
      toast.error("Erro ao carregar alunos");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Passe fetchUsers como uma prop para o componente Form
  <Form
    editingUser={editingUser}
    setEditingUser={setEditingUser}
    fetchUsers={fetchUsers}
  />;

  return (
    <>
      <Container>
        <Title>Alunos</Title>
        <Form
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          fetchUsers={fetchUsers}
        />

        <Grid
          users={users}
          setUsers={setUsers}
          setEditingUser={setEditingUser}
        />
      </Container>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
}

export default App;
