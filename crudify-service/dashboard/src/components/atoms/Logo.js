import React from "react";
import styled from "styled-components";
import THEME from "crudify-service/dashboard/src/constants/theme";

function Logo() {
  return (
    <Container>
      Crudify
    </Container>
  );
}

const Container = styled.span`
  position: relative;
  color: ${THEME.COLORS.WHITE};
  font-size: 3.8rem;
  font-style: italic;
  font-weight: 700;
  text-transform: uppercase;

  &::before {
    content: "";
    position: absolute;
    top: 15px;
    right: -35px;
    width: 15px;
    height: 15px;
    background: ${THEME.GREEN};
    border-radius: 50%;
  }
`;

export default Logo;
