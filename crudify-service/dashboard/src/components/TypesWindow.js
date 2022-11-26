import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import CONFIG from "crudify-service/dashboard/src/constants/config";
import THEME from "../constants/theme";
import { useModal } from "../hooks/useModal";
import { useToast } from "../hooks/useToast";
import capitalize from "../utils/captalize";
import FrameWindow from "./FrameWindow";
import ModelNavBar from "./ModelNavBar";
import CreateType from "crudify-service/dashboard/src/components/TypeCreationModal";
import ServerReloadModal from "../components/ServerReloadModal";

const FIELD_TYPE = {
  TEXT: "text",
  EMAIL: "email",
  DATE: "date",
  PASSWORD: "password",
  NUMBER: "number",
  ID: "id"
};

const GOOGLE_ICON = {
  [FIELD_TYPE.TEXT]: "notes",
  [FIELD_TYPE.PASSWORD]: "lock",
  [FIELD_TYPE.EMAIL]: "alternate_email",
  [FIELD_TYPE.DATE]: "calendar_month",
  [FIELD_TYPE.NUMBER]: "looks_one",
  [FIELD_TYPE.ID]: "person"
};

function Types() {
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

  return (
    <FrameWindow>
      <PageHeader>
        <ModelNavBar />
        <ButtonConsole>
          <Button onClick={() => modal(<CreateType createType={(type) => setFieldList(prev => prev.concat(type))} />)}>+ 새로운 Type 추가</Button>
          {isModified && <SaveButton onClick={handleSave}>변경사항 저장</SaveButton>}
        </ButtonConsole>
      </PageHeader>
      <FieldList>
        <FieldListHeader>
          <FieldNameHeader>name</FieldNameHeader>
          <FieldTypeHeader>type</FieldTypeHeader>
        </FieldListHeader>
        {fieldList.map(({ name, type }) => (
          <FieldBar name={name} fieldType={type} key={name} />
        ))}
      </FieldList>
    </FrameWindow>
  )
}

function FieldBar({ name, fieldType }) {
  return (
    <FieldBarWrapper>
      <FieldTitle>
        <TypeIcon className="material-symbols-outlined">
          {GOOGLE_ICON[fieldType]}
        </TypeIcon>
        <FieldName>{name}</FieldName>
      </FieldTitle>
      <FieldType>{fieldType}</FieldType>
    </FieldBarWrapper>
  );
}

const PageHeader = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

const ButtonConsole = styled.div`
`;

const FieldList = styled.div`
  width: 80%;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

const FieldListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1rem;
  padding: 0 2rem;
  color: #000000;
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const FieldBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  min-width: 30rem;
  height: 3rem;
  margin: 1.3rem 0;
  padding: 0 2rem;
  background: #16233A;
  color: #E5E5E5;
  font-size: 1rem;
  font-weight: 500;
  line-height: 3rem;
  border-radius: 0.5rem;
  box-shadow: ${THEME.BOX_SHDOW};
  cursor: pointer;

  &:hover {
    transform: scaleX(1.005);
  }
`;

const FieldTitle = styled.div`
  position: relative;
  top: -2px;
  margin-left: 1rem;
`;

const TypeIcon = styled.span`
  vertical-align: middle;
  margin-right: 1rem;
  line-height: 3rem;
`;

const FieldName = styled.span`
  display: inline-block;
  vertical-align: middle;
  font-weight: 500;
  line-height: 3rem;
`;

const FieldType = styled.span`
  width: 5rem;
  margin-right: 10rem;
  font-weight: 300;
`;

const FieldNameHeader = styled(FieldName)`
  margin-left: 3.5rem;
  line-height: unset;
`;

const FieldTypeHeader = styled(FieldType)`
  font-weight: 500;
`;

const SaveButton = styled.button`
  font-weight: 500;
  width: 5rem;
  height: 3rem;
  justify-self: center;
  border-radius: 0.5rem;
  background-color: ${THEME.GREEN};
  color: #FFFFFF;
  margin: 2rem 0 0 0.5rem;
  width: 8rem;
  font-size: 1rem;
`;

const Button = styled.button`
  font-weight: 500;
  width: 11rem;
  height: 3rem;
  justify-self: center;
  border-radius: 0.5rem;
  background-color: #233654;
  color: #FFFFFF;
  font-size: 1rem;
  margin-top: 2rem;
`;

export default Types;
