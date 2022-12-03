import React from "react";
import styled from "styled-components";

import { useServerReload } from "../../hooks/useServerReload";
import { useToast } from "../../hooks/useToast";
import LoadingSpinner from "../atoms/Spinner";

function ServerReloadModal({ closeModal, successNext }) {
  const toast = useToast();

  useServerReload(1000 * 10, {
    onSuccess: () => {
      closeModal();

      return successNext();
    },
    onFail: () => {
      toast("서버를 일시적인 이유로 재시작하지 못하였습니다.");

      return closeModal();
    }
  });

  return (
    <Container>
      <LoadingSpinner />
      변경사항을 반영하여 재시작 중입니다.
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem 0;
  position: relative;
  width: 28rem;
  height: 15rem;
`;

export default ServerReloadModal;
