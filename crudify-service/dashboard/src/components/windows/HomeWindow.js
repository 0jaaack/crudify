import React from "react";
import styled from "styled-components";

import { useCheckServer } from "crudify-service/dashboard/src/hooks/useServerCheck";
import { useToast } from "crudify-service/dashboard/src/hooks/useToast";
import { useModal } from "crudify-service/dashboard/src/hooks/useModal";
import TEXT from "crudify-service/dashboard/src/constants/text";
import BarButton from "../atoms/BarButton";
import Window from "../atoms/Window";
import CreateCollectionModal from "../windows/CollectionCreationModal";

function Home() {
  const isHealthy = useCheckServer();
  const toast = useToast();
  const modal = useModal();

  const title = TEXT.HOME_TEXT.TITLE[isHealthy ? "SUCCESS" : "FAIL"];
  const descriptions = TEXT.HOME_TEXT.DESCRIPTION[isHealthy ? "SUCCESS" : "FAIL"];

  if (!isHealthy) {
    return toast("서버의 정보를 불러오는 데에 실패하였습니다.");
  }

  const handleCreateModal = () => {
    modal(<CreateCollectionModal />);
  };

  return (
    <Container>
      <HomeHeader>
        <HomeTitle>{title}</HomeTitle>
        <HomeDescription>
          {descriptions.map((text) => (
            <p key={text}>
              {text}
            </p>
          ))}
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

const HomeDescription = styled.div`
  font-size: 1.1rem;
  line-height: 2rem;
`;

const QuickMenu = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.7rem 0;
`;

export default Home;
