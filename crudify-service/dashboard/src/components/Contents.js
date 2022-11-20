import React from "react";
import styled from "styled-components";
import Frame from "./FrameWindow";
import FrameNavigation from "./ModelNavigator";

function Contents() {
  return (
    <Frame>
      <FrameNavigation />
      <ContentTable>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>gongjaehyeok</td>
            <td>gongjaehyeok@gmail.com</td>
            <td>admin</td>
          </tr>
          <tr>
            <td>1</td>
            <td>user1</td>
            <td>user1@gmail.com</td>
            <td>common</td>
          </tr>
          <tr>
            <td>2</td>
            <td>user2</td>
            <td>user2@gmail.com</td>
            <td>common</td>
          </tr>
        </tbody>
      </ContentTable>
      <button>+ 새로운 Content 추가</button>
    </Frame>
  )
}

const ContentTable = styled.table`
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
  border-spacing: 0 10px;
  border: 1px solid #000000;
  border-radius: 0.6rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  tbody {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    background: #1E1E1E;
    color: #E5E5E5;
  }

  thead {
    background: #B9B9B9;
  }

  tr {
    height: 1rem;
  }

  td,th {
    padding: 0.5rem;
  }

  th {
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  * {
    text-align: left;
  }
`;

export default Contents;
