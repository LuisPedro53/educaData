import React, { useRef, useEffect, useState } from "react";
import { FormContainer, InputArea, Input, Label, Button } from "../Styles/Form";
import { toast } from "react-toastify";
import axios from "axios";

const Form = ({ editingUser, setEditingUser, fetchUsers }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cdAluno, setCdAluno] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = () => {
    fetchUsers(nome, cpf, email);
  };

  useEffect(() => {
    if (editingUser) {
      setNome(editingUser.nmAluno);
      setEmail(editingUser.emailAluno);
      setCpf(editingUser.cpfAluno);
      setCdAluno(editingUser.cdAluno);
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editingUser]);

  const handleCreate = async (aluno) => {
    try {
      const response = await axios.post("http://localhost:8080/graphql", {
        query: `
        mutation CreateAluno($nmAluno: String!, $cpfAluno: String!, $emailAluno: String!) {
          createAluno(nmAluno: $nmAluno, cpfAluno: $cpfAluno, emailAluno: $emailAluno) {
            nmAluno
            cpfAluno
            emailAluno
          }
        }
      `,
        variables: aluno,
      });

      toast.success("Aluno criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      toast.error("Erro ao criar aluno!");
    }
  };

  const handleUpdate = async (aluno) => {
    try {
      const response = await axios.post("http://localhost:8080/graphql", {
        query: `
        mutation UpdateAluno($cdAluno: String!, $nmAluno: String, $cpfAluno: String, $emailAluno: String) {
          updateAluno(cdAluno: $cdAluno, nmAluno: $nmAluno, cpfAluno: $cpfAluno, emailAluno: $emailAluno) {
            cdAluno
            nmAluno
            cpfAluno
            emailAluno
          }
        }
      `,
        variables: aluno,
      });

      toast.success("Aluno atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      toast.error("Erro ao atualizar aluno!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const aluno = {
      nmAluno: nome,
      cpfAluno: cpf,
      emailAluno: email,
    };

    if (!nome || !email || !cpf) {
      return toast.warn("Preencha todos os campos");
    }

    if (isEditing) {
      aluno.cdAluno = editingUser.cdAluno;
      handleUpdate(aluno);
    } else {
      handleCreate(aluno);
    }

    setNome("");
    setEmail("");
    setCpf("");
    setCdAluno("");
    setIsEditing(false);
    fetchUsers();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input
          name="nmAluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input
          name="emailAluno"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputArea>

      <InputArea>
        <Label>CPF</Label>
        <Input
          name="cpfAluno"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </InputArea>

      <Button type="submit">SALVAR</Button>
      <Button type="button" onClick={handleSearch}>
        PESQUISAR
      </Button>
    </FormContainer>
  );
};

export default Form;
