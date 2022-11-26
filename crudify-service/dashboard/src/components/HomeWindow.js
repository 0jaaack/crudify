import CONFIG from "crudify-service/dashboard/src/constants/config";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FrameWindow from "./FrameWindow";
import CreateCollectionModal from "./CollectionCreationModal";
import THEME from "../constants/theme";
import { useToast } from "crudify-service/dashboard/src/hooks/useToast";
import { useModal } from "crudify-service/dashboard/src/hooks/useModal";

function Home() {
  const toast = useToast();
  const modal = useModal();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/health`);
        const { data } = await response.json();

        setIsConnected(!!data);
      } catch {
        toast("서버와의 연결에 실패하였습니다.");
        setIsConnected(!!data);
      }
    })();
  }, [setIsConnected]);

  const title = isConnected
    ? "Hello Crudify World!"
    : "Server Not Connected!";

  return (
    <FrameWindow>
      <HomeHeader>
        <HomeTitle>{title}</HomeTitle>
        <HomeDescription>
          <span>서버와의 연결에 성공하였습니다.</span><br />
          <span>이제 새로운 컬렉션을 만들고, Endpoint를 연결해볼 수 있어요!</span>
        </HomeDescription>
      </HomeHeader>
      <QuickButton onClick={() => modal(<CreateCollectionModal />)}>
        새로운 컬렉션 생성
      </QuickButton>
      <QuickButton>Endpoint 관리</QuickButton>
      <QuickButton>README</QuickButton>
    </FrameWindow>
  )
}

const HomeHeader = styled.section`
  margin-bottom: 2rem;
`;

const HomeTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  text-transform: uppercase;
  font-style: italic;
`;

const HomeDescription = styled.p`
  font-size: 1.1rem;
  white-space: pre;
`;

const QuickButton = styled.button`
  display: block;
  width: 80%;
  height: 3rem;
  margin: 1.2rem 0;
  padding-left: 1rem;
  background: ${THEME.NAVY};
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
