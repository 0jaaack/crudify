import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useTypes, useUpdateTypes } from "../../hooks/useTypes";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
import THEME from "../../constants/theme";
import Button from "../atoms/Button";
import Window from "../atoms/Window";
import TypeBar from "../Items/TypeBar";
import CollectionHeader from "../Items/CollecionHeader";
import TypeCreationModal from "./TypeCreationModal";
import ServerReloadModal from "./ServerReloadingModal";

function ModelWindow() {
  const toast = useToast();
  const modal = useModal();
  const { collection } = useParams();
  const [types, refetchTypes] = useTypes(collection);
  const updateTypes = useUpdateTypes(collection);
  const [modelData, setModelData] = useState(types);

  const isModified = JSON.stringify(types) !== JSON.stringify(modelData);

  const handleSave = async () => {
    updateTypes(modelData, {
      onSuccess: () => {
        return modal(
          <ServerReloadModal
            successNext={refetchTypes}
          />
        );
      },
      onError: () => {
        return toast("타입 정보를 저장하지 못하였습니다.");
      },
    });
  };

  const handleCreateType = () => {
    const createNewType = (type) => {
      return setModelData(prev => prev.concat(type));
    };

    return modal(
      <TypeCreationModal
        createNewType={createNewType}
      />
    );
  };

  return (
    <Container>
      <CollectionHeader>
        <Button onClick={handleCreateType}>
          + 새로운 Type 추가
        </Button>
        {isModified && (
          <SaveButton onClick={handleSave}>
            변경사항 저장
          </SaveButton>
        )}
      </CollectionHeader>
      <TypeList>
        {types.map(({ name, type }) => (
          <TypeBar name={name} type={type} key={name} />
        ))}
      </TypeList>
    </Container>
  )
}

function Container({ children }) {
  return (
    <Window>
      <ModelContainer>
        {children}
      </ModelContainer>
    </Window>
  );
}

const ModelContainer = styled.div`
  padding-right: 5vw;
`;

const TypeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  width: 90%;
  margin-top: 4rem;
  padding-bottom: 2rem;

  & > div:first-child span.typeName::before {
    content: "name";
    position: absolute;
    top: -2.8rem;
    left: 0rem;
    color: ${THEME.COLORS.BLACK};
    text-transform: uppercase;
  }

  & > div:first-child span.typeSelection::before {
    content: "type";
    position: absolute;
    top: -2.8rem;
    left: 0rem;
    color: ${THEME.COLORS.BLACK};
    text-transform: uppercase;
    font-weight: 500;
  }
`;

const SaveButton = styled(Button)`
  background: ${THEME.COLORS.GREEN};
  color: ${THEME.COLORS.BLACK};
`;


export default ModelWindow;
