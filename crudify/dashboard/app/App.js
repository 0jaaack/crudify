import React from "react";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Home from "../components/Home";

function App() {
  return (
    <Wrapper>
      <Header />
      <MainSection>
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MainSection>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0.7rem;
  overflow: hidden;
`;

const MainSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default App;