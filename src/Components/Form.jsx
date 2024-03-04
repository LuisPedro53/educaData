import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { FormContainer, InputArea, Input, Label, Button } from "../Styles/Form";

const Form = ({ editingUser }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    if (editingUser) {
      setNome(editingUser.nmAluno);
      setEmail(editingUser.emailAluno);
      setCpf(editingUser.cpfAluno);
    }
  }, [editingUser]);

  return (
    <FormContainer>
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
      <Button type="button">PESQUISAR</Button>
    </FormContainer>
  );
};

export default Form;
