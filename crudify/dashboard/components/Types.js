import React from "react";
import styled from "styled-components";
import FrameWindow from "./FrameWindow";
import FrameNavigation from "./ModelNavigator";

const FIELD_TYPE = {
  TEXT: "text",
  EMAIL: "email",
  DATE: "date",
  PASSWORD: "password",
};

const GOOGLE_ICON = {
  [FIELD_TYPE.TEXT]: "notes",
  [FIELD_TYPE.PASSWORD]: "lock",
  [FIELD_TYPE.EMAIL]: "alternate_email",
  [FIELD_TYPE.DATE]: "calendar_month",
};

function Types() {
  return (
    <FrameWindow>
      <FrameNavigation />
      <FieldList>
        <FieldListHeader>
          <FieldNameHeader>name</FieldNameHeader>
          <FieldTypeHeader>type</FieldTypeHeader>
        </FieldListHeader>
        <FieldBar name="username" fieldType={FIELD_TYPE.TEXT} />
        <FieldBar name="password" fieldType={FIELD_TYPE.PASSWORD} />
        <FieldBar name="email" fieldType={FIELD_TYPE.EMAIL} />
        <FieldBar name="createdAt" fieldType={FIELD_TYPE.DATE} />
      </FieldList>
      <button>+ 새로운 Type 추가</button>
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

const FieldList = styled.section`
  width: 80%;
  margin-top: 2rem;
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
  background: #575757;
  color: #E5E5E5;
  font-size: 1rem;
  font-weight: 500;
  line-height: 3rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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

export default Types;
