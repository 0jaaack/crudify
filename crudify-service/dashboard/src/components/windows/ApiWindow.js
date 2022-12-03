import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useEndpoints, useUpdateEndpoints } from "../../hooks/useEndpoints";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
import THEME from "../../constants/theme";
import Button from "../atoms/Button";
import Window from "../atoms/Window";
import CollectionHeader from "../Items/CollecionHeader";
import ServerReloadModal from "../windows/ServerReloadingModal";

function ApiWindow() {
  const toast = useToast();
  const modal = useModal();
  const { collection } = useParams();
  const [endpoints, refetchEndpoints] = useEndpoints(collection);
  const updateEndpoints = useUpdateEndpoints(collection);
  const [apiData, setApiData] = useState(endpoints);

  const isModified = JSON.stringify(apiData) !== JSON.stringify(endpoints);

  const changeEndpointPermission = (type, permission) => {
    const endpointIndex = endpoints.findIndex((endpoint) => endpoint.type === type);

    setApiData(prev => ([
      ...prev.slice(0, endpointIndex),
      {
        ...prev[endpointIndex],
        permission
      },
      ...prev.slice(endpointIndex + 1)
    ]));
  };

  const saveEndpointsPermission = async () => {
    const endpointData = endpoints.map((endpoint) => {
      const { url, type, method, permission } = endpoint;
      return { url, type, method, permission };
    });

    updateEndpoints(endpointData, {
      onSuccess: () => {
        return modal(
          <ServerReloadModal
            successNext={refetchEndpoints}
          />
        );
      },
      onError: () => {
        return toast("엔드포인트 데이터를 저장하는 데 실패하였습니다.");
      }
    });
  };

  return (
    <Window>
      <CollectionHeader>
        {isModified && (
          <SaveButton
            onClick={saveEndpointsPermission}
          >
            변경사항 저장
          </SaveButton>
        )}
      </CollectionHeader>
      <EndpointList>
        {apiData.map((endpoint) => (
          <Box
            isHighlighted={endpoint.permission === "allowed"}
            onClick={() => changeEndpointPermission(endpoint.type, endpoint.permission === "notAllowed" ? "allowed" : "notAllowed")}
            key={endpoint.type}
          >
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5% 0;
  width: 32%;
  min-width: 32%;
  height: 13rem;
  background: ${({ isHighlighted }) => isHighlighted ?  THEME.COLORS.GREEN : THEME.COLORS.DARK_NAVY};
  color: ${({ isHighlighted }) => isHighlighted ? THEME.COLORS.BLACK : THEME.COLORS.WHITE};
  font-size: 1.5rem;
  font-weight: 500;
  border-radius: 0.5rem;
  box-shadow: ${THEME.BOX_SHADOW};
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background: ${THEME.COLORS.GREEN};
  color: ${THEME.COLORS.BLACK};
`;

export default ApiWindow;
