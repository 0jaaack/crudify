import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAddCollection } from "../../hooks/useCollections";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
import THEME from "../../constants/theme";
import Button from "../atoms/Button";
import ServerReloadModal from "../windows/ServerReloadingModal";

function CreateCollectionModal({ closeModal }) {
  const addCollection = useAddCollection();
  const navigate = useNavigate();
  const modal = useModal();
  const toast = useToast();

  const handleCreateClick = async (event) => {
    event.preventDefault();

    const collectionName = event.target.collectionName.value;
    addCollection(collectionName, {
      onSuccess: () => {
        modal(
          <ServerReloadModal
            successNext={() => navigate(`/collections/${collectionName}/model`)}
          />
        );
      },
      onError: () => {
        toast("컬렉션을 저장하는 데 실패하였습니다.");
        closeModal();
      }
    });

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
