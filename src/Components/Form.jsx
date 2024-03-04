import React, { useRef } from "react";
import styled from "styled-components";
import { FormContainer, InputArea, Input, Label, Button } from "../Styles/Form";

const Form = ({ onEdit }) => {
  const ref = useRef();

  return (
    <FormContainer>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nmAluno" />
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input name="emailAluno" type="email" />
      </InputArea>

      <InputArea>
        <Label>CPF</Label>
        <Input name="cpfAluno" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
      <Button type="button">PESQUISAR</Button>
    </FormContainer>
  );
};

export default Form;
