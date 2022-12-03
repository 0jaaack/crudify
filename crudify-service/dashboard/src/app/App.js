import React from "react";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../components/layouts/Header";
import SideBar from "../components/layouts/SideBar";
import HomeWindow from "../components/windows/HomeWindow";
import ModelWindow from "../components/windows/ModelWindow";
import ApiWindow from "../components/windows/ApiWindow";

function App() {
  return (
    <Container>
      <Header />
      <Main>
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeWindow />} />
          <Route path="/collections/:collection" element={<Navigate to="./model" />} />
          <Route path="/collections/:collection/model" element={<ModelWindow />} />
          <Route path="/collections/:collection/api" element={<ApiWindow />} />
        </Routes>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0.7rem;
  overflow: hidden;
`;

const Main = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default App;
