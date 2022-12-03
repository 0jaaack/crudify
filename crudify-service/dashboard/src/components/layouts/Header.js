import React from "react";
import styled from "styled-components";

import { useCheckServer } from "../../hooks/useServerCheck";
import Logo from "../atoms/Logo";

function Header() {
  const isHealthy = useCheckServer();

  return (
    <Container>
      <Logo isConnected={isHealthy} />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 13vh;
`;

export default Header;
