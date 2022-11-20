import React from "react";
import Frame from "./FrameWindow";
import ModelNavigator from "./ModelNavigator";
import styled from "styled-components";

function Endpoints() {
  return (
    <Frame>
      <ModelNavigator />
      <ApiList>
        <API
          name={"find"}
          method={"get"}
          url={"/localhost:3000/api/find"}
          isChecked={true}
        />
        <API
          name={"findOne"}
          method={"get"}
          url={"/localhost:3000/api/find"}
          isChecked={false}
        />
        <API
          name={"create"}
          method={"post"}
          url={"/localhost:3000/api/find"}
          isChecked={true}
        />
        <API
          name={"update"}
          method={"post"}
          url={"/localhost:3000/api/find"}
          isChecked={false}
        />
        <API
          name={"delete"}
          method={"delete"}
          url={"/localhost:3000/api/find"}
          isChecked={true}
        />
        <API
          name={"deleteOne"}
          method={"delete"}
          url={"/localhost:3000/api/find"}
          isChecked={true}
        />
      </ApiList>
    </Frame>
  )
}

function API({ name, method, url, isChecked }) {
  return (
    <APIWrapper>
      <APIName>
        <CheckBox type="checkbox"/>
        {name}
      </APIName>
      {isChecked && (
        <EndpointBar>
          <APIMethod>{method}</APIMethod>
          <APIUrl>{url}</APIUrl>
          <CopyButton className="material-symbols-outlined">
            content_copy
          </CopyButton>
        </EndpointBar>
      )}
    </APIWrapper>
  );
}

const ApiList = styled.ul`
  margin-top: 2rem;
`;

const APIWrapper = styled.li`
  display: flex;
  margin: 1.3rem 0;
  width: 70%;
`;

const APIName = styled.label`
  display: inline-block;
  vertical-align: middle;
  width: 10rem;
  height: 100%;
  margin-right: 3rem;
  font-size: 1.3rem;
  line-height: 3rem;
  cursor: pointer;
`;

const EndpointBar = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #000000;
  border-radius: 0.3rem;
`;

const APIMethod = styled.p`
  height: 100%;
  padding: 0.5rem;
  border-right: 1px solid #000000;
  text-transform: uppercase;
  user-select: none;
`;

const APIUrl = styled.p`
  width: 100%;
  padding: 0.5rem;
  background: #575757;
  color: #e5e5e5;
`;

const CopyButton = styled.span`
  padding-right: 0.5rem;
  background: #575757;
  color: #E5E5E5;
  line-height: 3rem;
  user-select: none;
  cursor: pointer;
`;

const CheckBox = styled.input`
  display: none;
`;

export default Endpoints;
