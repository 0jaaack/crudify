import React, { useState } from "react";
import styled from "styled-components";
import Frame from "./FrameWindow";

function Home() {
  return (
    <Frame>
      <HomeHeader>
        <HomeTitle>누구나 쉽게 만드는 API Server!</HomeTitle>
        <HomeDescription>crudify를 이용해, 쉽게 API Server를 만들어보세요.</HomeDescription>
      </HomeHeader>
      <QuickButton>새로운 모델 생성</QuickButton>
      <QuickButton>Endpoint 관리</QuickButton>
      <QuickButton>README</QuickButton>
    </Frame>
  )
}

const HomeHeader = styled.section`
  margin-bottom: 2rem;
`;

const HomeTitle = styled.h2`
  font-size: 2.3rem;
  font-weight: 300;
`;

const HomeDescription = styled.p`
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

const QuickButton = styled.button`
  display: block;
  width: 80%;
  height: 3rem;
  margin: 1.2rem 0;
  padding-left: 1rem;
  background: #575757;
  color: #E5E5E5;
  text-align: left;
  font-size: 1rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #000000;
  }
`;

export default Home;
