import React from "react";
import styled from "styled-components";

function NameField({ onNameChange }) {
  return (
    <Container>
      <NameFieldTitle>
        타입 이름
      </NameFieldTitle>
      <TypeNameInput
        type="text"
        onChange={(event) => onNameChange(event.target.value)}
      />
    </Container>
  );
}

const Container = styled.label`
  width: 100%;
  font-weight: 500;
`;

const NameFieldTitle = styled.span`
  font-weight: 500;
`;

const TypeNameInput = styled.input`
  width: 100%;
  height: 3rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid #575757;
  outline: none;
  text-align: center;
  font-size: 1rem;

  &:focus {
    border-bottom: 1px solid #000000;
  }
`;

export default NameField;
