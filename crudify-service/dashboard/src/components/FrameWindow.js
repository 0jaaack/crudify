import React from "react";
import styled from "styled-components";

function FrameWindow({ children }) {
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
  background: #e5e5e5;
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

export default FrameWindow;
