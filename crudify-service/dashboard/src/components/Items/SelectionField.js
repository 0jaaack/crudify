import React, { useState } from "react";
import styled from "styled-components";

import CONFIG from "../../constants/config";
import THEME from "../../constants/theme";
import ICON_TYPES from "../../constants/iconTypes";
import Icon from "../atoms/Icon";

function SelectionField({ onSelectionChange }) {
  const [currentSelection, setCurrentSelection] = useState(null);
  const handleSelectionClick = (selection) => {
    setCurrentSelection(selection);
    onSelectionChange(selection);
  };

  return (
    <TypeSelectionField>
      <legend>타입 선택</legend>
      {CONFIG.SELECTIONS.map((selection) => (
        <TypeSelection
          key={selection}
          isHighlighted={currentSelection === selection}
        >
          <Icon type={ICON_TYPES[selection.toUpperCase()]} />
          <CheckInput
            type="radio"
            onClick={() => handleSelectionClick(selection)}
          />
          {selection}
        </TypeSelection>
      ))}
    </TypeSelectionField>
  );
}

const TypeSelectionField = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  max-width: 100%;
  padding-top: 1rem;
  border: none;
  font-weight: 500;
`;

const TypeSelection = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 0.2rem;
  width: 32%;
  height: 3rem;
  background: ${({ isHighlighted }) => isHighlighted ? THEME.GREEN : THEME.NAVY};
  color: ${({ isHighlighted }) => isHighlighted ? THEME.BLACK : THEME.WHITE};
  font-size: 1.2rem;
  text-align: center;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const CheckInput = styled.input`
  display: none;
`;

export default SelectionField;
