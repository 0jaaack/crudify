import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "crudify-service/dashboard/src/hooks/useModal";
import { useSetCollections } from "../hooks/useCollections";
import styled from "styled-components";

import CONFIG from "../constants/config";
import ServerReloadModal from "crudify-service/dashboard/src/components/ServerReloadModal";
import THEME from "../constants/theme";

function CreateCollectionModal({ closeModal }) {
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
      <CreationButton>
        생성하기
      </CreationButton>
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
  font-size: 1.2rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${THEME.BLACK};
  outline: none;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const CreationButton = styled.button``;

export default CreateCollectionModal;
