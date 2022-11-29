import React from "react";
import styled from "styled-components";

import THEME from "../../constants/theme";
import Button from "../atoms/Button";

// hook으로 정리 예정
import { useNavigate } from "react-router-dom";
import { useModal } from "crudify-service/dashboard/src/hooks/useModal";
import { useSetCollections } from "../../hooks/useCollections";
import CONFIG from "../../constants/config";
import ServerReloadModal from "crudify-service/dashboard/src/components/windows/ServerReloadingModal";


function CreateCollectionModal() {
  const setCollections = useSetCollections();
  const navigate = useNavigate();
  const modal = useModal();

  const handleCreateClick = async (event) => {
    event.preventDefault();

    const collectionName = event.target.collectionName.value;

    await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: collectionName
      }),
    });

    setCollections(prev => prev.concat(collectionName));

    modal(
      <ServerReloadModal
        successNext={() => navigate(`/collections/${collectionName}/model`)}
      />
    );
  };

  return (
    <CreateCollectionForm onSubmit={handleCreateClick}>
      <Title>컬렉션 생성하기</Title>
      <CollectionNameInput type="text" name="collectionName"/>
      <Button>생성하기</Button>
    </CreateCollectionForm>
  );
}

const CreateCollectionForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 30rem;
  height: 20rem;
  padding: 2rem;
`;

const CollectionNameInput = styled.input`
  width: 50%;
  height: 3rem;
  border: none;
  border-bottom: 1px solid ${THEME.COLORS.BLACK};
  background: transparent;
  font-size: 1.2rem;

  &:focus {
    border-bottom: 1.5px solid ${THEME.COLORS.BLACK};
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

export default CreateCollectionModal;
