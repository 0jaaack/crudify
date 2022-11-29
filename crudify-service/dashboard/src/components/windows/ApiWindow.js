import React from "react";
import styled from "styled-components";

// hook으로 정리 예정
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CONFIG from "crudify-service/dashboard/src/constants/config";
import TEXT from "crudify-service/dashboard/src/constants/text";
import { useModal } from "crudify-service/dashboard/src/hooks/useModal";
import { useToast } from "crudify-service/dashboard/src/hooks/useToast";
import capitalize from "crudify-service/dashboard/src/utils/captalize";
import ServerReloadModal from "crudify-service/dashboard/src/components/windows/ServerReloadingModal";

import Button from "crudify-service/dashboard/src/components/atoms/Button";
import Window from "crudify-service/dashboard/src/components/atoms/Window";
import CollectionHeader from "crudify-service/dashboard/src/components/Items/CollecionHeader";
import Endpoint from "crudify-service/dashboard/src/components/Items/EndpointItem";
import THEME from "crudify-service/dashboard/src/constants/theme";

function ApiWindow() {
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
    <Window>
      <CollectionHeader>
        {isModified && (
          <SaveButton
            onButtonClick={handleSave}
          >
            변경사항 저장
          </SaveButton>
        )}
      </CollectionHeader>
      <EndpointList>
        {endpoints.map((endpoint) => (
          // <Endpoint
          //   key={endpoint.type}
          //   endpoint={endpoint}
          //   isChecked={endpoint.permission !== "notAllowed"}
          //   onEndpointsChange={setEndpoints}
          // />
          <Box>
            {endpoint.type}
          </Box>
        ))}
      </EndpointList>
    </Window>
  );
}

const EndpointList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

const Box = styled.div`
  background: ${THEME.COLORS.DARK_NAVY};
  width: 32%;
  height: 13rem;
  color: red;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: ${THEME.BOX_SHADOW};

  &:hover {
    transform: scale(1.02);
  }
`;

const SaveButton = styled(Button)`
  background: ${THEME.COLORS.GREEN};
  color: ${THEME.COLORS.BLACK};
`;

export default ApiWindow;
