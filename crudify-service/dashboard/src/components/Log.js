import React from "react";
import styled from "styled-components";
import Frame from "./FrameWindow";

function Log() {
  return (
    <LogFrame>
      <LogParagraph>
        {`
          [2022-11-13 18:09:58.135] http: GET /content-manager/components (8 ms) 200
          [2022-11-13 18:09:58.144] http: GET /content-manager/content-types (7 ms) 200
          [2022-11-13 18:30:03.245] http: GET /content-type-builder/components (8 ms) 200
          [2022-11-13 18:30:03.260] http: GET /content-type-builder/content-types (11 ms) 200
          [2022-11-13 18:30:03.273] http: GET /content-type-builder/reserved-names (11 ms) 200
          [2022-11-13 18:51:08.507] http: GET /upload/files?sort=updatedAt:DESC&page=1&pageSize=10&filters[$and][0][folder][id][$null]=true (12 ms) 200
          [2022-11-13 18:51:08.533] http: GET /upload/folders?sort=updatedAt:DESC&page=1&pageSize=10&pagination[pageSize]=-1&filters[$and][0][parent][id][$null]=true (10 ms) 200
          [2022-11-13 18:51:09.815] http: GET /admin/plugins (16 ms) 200
          [2022-11-13 18:51:11.674] http: GET /admin/project-settings (14 ms) 200
          [2022-11-13 18:51:13.027] http: GET /admin/roles (9 ms) 200
          [2022-11-13 18:51:13.825] http: GET /admin/users?pageSize=10&page=1&sort=firstname (26 ms) 200
          [2022-11-13 18:51:17.832] http: GET /admin/roles (8 ms) 200
          [2022-11-13 18:09:58.135] http: GET /content-manager/components (8 ms) 200
          [2022-11-13 18:09:58.144] http: GET /content-manager/content-types (7 ms) 200
          [2022-11-13 18:30:03.245] http: GET /content-type-builder/components (8 ms) 200
          [2022-11-13 18:30:03.260] http: GET /content-type-builder/content-types (11 ms) 200
          [2022-11-13 18:30:03.273] http: GET /content-type-builder/reserved-names (11 ms) 200
          [2022-11-13 18:51:08.507] http: GET /upload/files?sort=updatedAt:DESC&page=1&pageSize=10&filters[$and][0][folder][id][$null]=true (12 ms) 200
          [2022-11-13 18:51:08.533] http: GET /upload/folders?sort=updatedAt:DESC&page=1&pageSize=10&pagination[pageSize]=-1&filters[$and][0][parent][id][$null]=true (10 ms) 200
          [2022-11-13 18:51:09.815] http: GET /admin/plugins (16 ms) 200
          [2022-11-13 18:51:11.674] http: GET /admin/project-settings (14 ms) 200
          [2022-11-13 18:51:13.027] http: GET /admin/roles (9 ms) 200
          [2022-11-13 18:51:13.825] http: GET /admin/users?pageSize=10&page=1&sort=firstname (26 ms) 200
          [2022-11-13 18:51:17.832] http: GET /admin/roles (8 ms) 200
          [2022-11-13 18:09:58.135] http: GET /content-manager/components (8 ms) 200
          [2022-11-13 18:09:58.144] http: GET /content-manager/content-types (7 ms) 200
          [2022-11-13 18:30:03.245] http: GET /content-type-builder/components (8 ms) 200
          [2022-11-13 18:30:03.260] http: GET /content-type-builder/content-types (11 ms) 200
          [2022-11-13 18:30:03.273] http: GET /content-type-builder/reserved-names (11 ms) 200
          [2022-11-13 18:51:08.507] http: GET /upload/files?sort=updatedAt:DESC&page=1&pageSize=10&filters[$and][0][folder][id][$null]=true (12 ms) 200
          [2022-11-13 18:51:08.533] http: GET /upload/folders?sort=updatedAt:DESC&page=1&pageSize=10&pagination[pageSize]=-1&filters[$and][0][parent][id][$null]=true (10 ms) 200
          [2022-11-13 18:51:09.815] http: GET /admin/plugins (16 ms) 200
          [2022-11-13 18:51:11.674] http: GET /admin/project-settings (14 ms) 200
          [2022-11-13 18:51:13.027] http: GET /admin/roles (9 ms) 200
          [2022-11-13 18:51:13.825] http: GET /admin/users?pageSize=10&page=1&sort=firstname (26 ms) 200
          [2022-11-13 18:51:17.832] http: GET /admin/roles (8 ms) 200
        `}
      </LogParagraph>
    </LogFrame>
  )
}

const LogFrame = styled(Frame)`
  position: relative;
  padding-left: 2rem;
  background: #1C1C1C;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
      display: none;
  }
`;

const LogParagraph = styled.p`
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 2rem;
  color: #E5E5E5;
  overflow: scroll;
  white-space: pre-line;
`;

export default Log;
