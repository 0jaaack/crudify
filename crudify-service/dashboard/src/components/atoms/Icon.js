import React from "react";
import styled from "styled-components";

function Icon({ type, size }) {
  return (
    <IconSymbol
      size={size}
      className="material-symbols-outlined"
    >
      {type}
    </IconSymbol>
  );
}

const IconSymbol = styled.span`
  font-size: ${({ size }) => size ?? 1.6}rem;
`;

export default Icon;
