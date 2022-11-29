import React from "react";
import styled from "styled-components";

function Endpoint({ endpoint, onEndpointsChange }) {
  const { type, description, url, method } = endpoint;
  const isChecked = endpoint.permission !== "notAllowed";

  const handlePermissionChange = (event) => {
    const permission = event.target.checked ? "allowed" : "notAllowed";

    onEndpointsChange((prev) => {
      const endpointIndex = prev.findIndex(prevEndpoint => prevEndpoint.type === endpoint.type);

      return [
        ...prev.slice(0, endpointIndex),
        { ...endpoint, permission },
        ...prev.slice(endpointIndex + 1)
      ];
    });
  };

  return (
    <Container isHighlighted={isChecked}>
      <EndpointTitle>
        <CheckBox
          type="checkbox"
          onChange={handlePermissionChange}
          defaultChecked={isChecked}
        />
        <EndpointType>{type}</EndpointType>
      </EndpointTitle>
      <EndpointDescription>
        {description.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </EndpointDescription>
      {isChecked &&
        <EndpointBar>
          <Method>{method}</Method>
          <URL>{url}</URL>
          <CopyButton className="material-symbols-outlined">
            content_copy
          </CopyButton>
        </EndpointBar>
      }
    </Container>
  );
}

const EndpointTitle = styled.label`
  display: flex;
`;

const EndpointBar = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;
  border: 1px solid #000000;
  border-radius: 0.3rem;
`;

const Method = styled.span`
  padding: 0.6rem;
  border-right: 1px solid #000000;
  text-transform: uppercase;
  user-select: none;
`;

const URL = styled.p`
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

const EndpointType = styled.h1`
  font-size: 1.3rem;
  cursor: pointer;
  user-select: none;
`;

const EndpointDescription = styled.p``;

const Container = styled.li`
  margin: 1.3rem 0;
  width: 80%;
  color: ${({ isHighlighted }) => isHighlighted ? "inherit" : "rgba(0, 0, 0, 0.6)"};
`;

export default Endpoint;
