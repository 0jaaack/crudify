import React, { useEffect } from "react";
import styled from "styled-components";
import CONFIG from "crudify-service/dashboard/src/constants/config";
import LoadingSpinner from "crudify-service/dashboard/src/components/atoms/Spinner";
import { useToast } from "crudify-service/dashboard/src/hooks/useToast";

function ServerReloadModal({ closeModal, successNext }) {
  const toast = useToast();

  useEffect(() => {
    const checkServerInterval = setInterval(async () => {
      try {
        const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/health`);
        const { data } = await response.json();

        if (data === "ok") {
          toast("수정사항을 반영해, 서버를 재시작하였습니다!");
          closeModal();

          if (!!successNext) {
            return successNext();
          }
        }
      } catch {
        return;
      }
    }, 100);

    return () => {
      clearInterval(checkServerInterval);
    };
  }, []);

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
  position: relative;
  width: 28rem;
  height: 15rem;
`;

export default ServerReloadModal;
