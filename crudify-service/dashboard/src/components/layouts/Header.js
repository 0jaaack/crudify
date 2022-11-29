import React from "react";
import styled from "styled-components";
import Logo from "../atoms/Logo";

function Header() {
  return (
    <Container>
      <Logo />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 13vh;
`;

export default Header;
