import React from "react";
import styled from "styled-components";
import THEME from "../../constants/theme";

function Window({ children }) {
  return (
    <Container>
      <Frame>
        {children}
      </Frame>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${THEME.COLORS.WHITE};
  border-radius: 0.9rem;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
      display: none;
  }
`;

const Frame = styled.section`
  width: 100%;
  height: 100%;
  padding: 2rem;
  position: absolute;
  left: 0;
  top: 0;
`;

export default Window;
