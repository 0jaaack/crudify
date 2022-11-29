import React from "react";
import styled from "styled-components";

import THEME from "../../constants/theme";
import Button from "../atoms/Button";
import Window from "../atoms/Window";
import TypeBar from "../Items/TypeBar";
import CollectionHeader from "../Items/CollecionHeader";
import TypeCreationModal from "./TypeCreationModal";

// hook 정리 예정
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CONFIG from "crudify-service/dashboard/src/constants/config";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
import capitalize from "../../utils/captalize";
import ServerReloadModal from "./ServerReloadingModal";

function ModelWindow() {
  const [fieldList, setFieldList] = useState([]);
  const [configData, setConfigData] = useState([]);
  const { collection } = useParams();
  const toast = useToast();
  const modal = useModal();
  const isModified = JSON.stringify(fieldList) !== JSON.stringify(configData);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/models/?collection=${collection}`);
        const { data: model } = await response.json();

        setConfigData(model.data);
        setFieldList(model.data);
      } catch {
        toast(`${capitalize(collection)} 모델의 타입 정보를 가져오지 못하였습니다...`);
      }
    })();
  }, [collection, setFieldList]);

  const handleSave = async () => {
    await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/models`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: collection,
        types: fieldList
      }),
    });

    modal(<ServerReloadModal />);
  };

  const handleCreateType = () => {
    const createNewType = (type) => {
      return setFieldList(prev => prev.concat(type));
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
        {fieldList.map(({ name, type }) => (
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
