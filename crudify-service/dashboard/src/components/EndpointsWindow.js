import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import CONFIG from "crudify-service/dashboard/src/constants/config";
import TEXT from "crudify-service/dashboard/src/constants/text";
import THEME from "crudify-service/dashboard/src/constants/theme";
import { useModal } from "crudify-service/dashboard/src/hooks/useModal";
import { useToast } from "crudify-service/dashboard/src/hooks/useToast";
import capitalize from "crudify-service/dashboard/src/utils/captalize";
import FrameWindow from "crudify-service/dashboard/src/components/FrameWindow";
import ModelNavBar from "crudify-service/dashboard/src/components/ModelNavBar";
import Endpoint from "crudify-service/dashboard/src/components/Endpoint";
import ServerReloadModal from "crudify-service/dashboard/src/components/ServerReloadModal";

function EndpointsWindow() {
  const [endpoints, setEndpoints] = useState([]);
  const [configData, setConfigData] = useState([]);
  const { collection } = useParams();
  const toast = useToast();
  const modal = useModal();
  const isModified = JSON.stringify(configData) !== JSON.stringify(endpoints);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/apis/?collection=${collection}`);
        const { data: api } = await response.json();
        const endpointData = api.data.map((endpoint) => ({
          ...endpoint,
          description: TEXT.ENDPOINT_DESCRIPTION[endpoint.type]
        }));

        setConfigData(endpointData);
        setEndpoints(endpointData);
      } catch {
        toast(`${capitalize(collection)} 모델의 엔드포인트 정보를 가져오지 못하였습니다...`);
      }
    })();
  }, [setEndpoints]);

  const handleSave = async () => {
    const endpointData = endpoints.map((endpoint) => {
      const { url, type, method, permission } = endpoint;
      return { url, type, method, permission };
    });

    await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/apis`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api: collection,
        endpoints: endpointData
      }),
    });

    modal(<ServerReloadModal />);
  };

  return (
    <FrameWindow>
      <PageHeader>
        <ModelNavBar />
        {isModified && <SaveButton onClick={handleSave}>변경사항 저장</SaveButton>}
      </PageHeader>
      <EndpointList>
        {endpoints.map((endpoint) => (
          <Endpoint
            key={endpoint.type}
            endpoint={endpoint}
            isChecked={endpoint.permission !== "notAllowed"}
            onEndpointsChange={setEndpoints}
          />
        ))}
      </EndpointList>
    </FrameWindow>
  );
}

const PageHeader = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

const EndpointList = styled.ul`
  width: 100%;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

const SaveButton = styled.button`
  font-weight: 500;
  font-size: 1rem;
  width: 8rem;
  height: 3rem;
  justify-self: center;
  border-radius: 0.5rem;
  background-color: ${THEME.GREEN};
  margin-top: 2rem;
`;

export default EndpointsWindow;
