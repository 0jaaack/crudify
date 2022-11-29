import React from "react";
import styled from "styled-components";
import THEME from "../../constants/theme";

function NameField({ onNameChange }) {
  const handNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <Container>
      <NameFieldTitle>
        타입 이름
      </NameFieldTitle>
      <TypeNameInput
        type="text"
        onChange={handNameChange}
      />
    </Container>
  );
}

const Container = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 500;
`;

const NameFieldTitle = styled.span`
  font-weight: 500;
`;

const TypeNameInput = styled.input`
  display: block;
  width: 70%;
  height: 3rem;
  margin: 0 auto;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${THEME.COLORS.LIGHTER_BLACK};
  text-align: center;
  font-size: 1.2rem;
  outline: none;

  &:focus {
    border-bottom: 1.5px solid ${THEME.COLORS.BLACK};
  }
`;

export default NameField;
