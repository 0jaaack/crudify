import React from "react";
import styled from "styled-components";

import BarButton from "../atoms/BarButton";
import Window from "../atoms/Window";
import CreateCollectionModal from "../windows/CollectionCreationModal";

// hook으로 정리 예정
import { useState, useEffect } from "react";
import CONFIG from "crudify-service/dashboard/src/constants/config";
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
        const result = await response.json();

        setIsConnected(!!result?.data);
      } catch {
        toast("서버와의 연결에 실패하였습니다.");
        setIsConnected(!!result?.data);
      }
    })();
  }, [setIsConnected]);

  const title = isConnected
    ? "Hello Crudify World!"
    : "Server Not Connected!";

  const handleCreateModal = () => {
    modal(<CreateCollectionModal />);
  };

  return (
    <Container>
      <HomeHeader>
        <HomeTitle>{title}</HomeTitle>
        <HomeDescription>
          <span>서버와의 연결에 성공하였습니다.</span><br />
          <span>이제 새로운 컬렉션을 만들고, Endpoint를 연결해볼 수 있어요!</span>
        </HomeDescription>
      </HomeHeader>
      <QuickMenu>
        <BarButton onClick={handleCreateModal}>
          새로운 컬렉션 생성
        </BarButton>
        <BarButton>Endpoint 관리</BarButton>
        <BarButton>README</BarButton>
      </QuickMenu>
    </Container>
  );
}

function Container({ children }) {
  return (
    <Window>
      <HomeContainer>
        {children}
      </HomeContainer>
    </Window>
  );
}

const HomeContainer = styled.div`
  width: 80%;
`;

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

const QuickMenu = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.7rem 0;
`;

export default Home;
