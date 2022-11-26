import React, { useState } from "react";
import styled from "styled-components";
import THEME from "crudify-service/dashboard/src/constants/theme";

const typeSelectionList = ["text", "number", "email", "boolean", "date", "list"];
const GOOGLE_ICON = {
  text: "notes",
  number: "notes",
  email: "alternate_email",
  boolean: "notes",
  date: "calendar_month",
  list: "notes"
};

function SelectionField({ onSelectionChange }) {
  const [currentSelection, setCurrentSelection] = useState(null);
  const handleSelectionClick = (selection) => {
    setCurrentSelection(selection);
    onSelectionChange(selection);
  };

  return (
    <TypeSelectionField>
      <legend>타입 선택</legend>
      {typeSelectionList.map((selection) => (
        <TypeSelection
          key={selection}
          isHighlighted={currentSelection === selection}
        >
          <TypeIcon className="material-symbols-outlined">
            {GOOGLE_ICON[selection]}
          </TypeIcon>
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
  max-width: 100%;
  padding-top: 1rem;
  border: none;
  font-weight: 500;
  display: flex;
  gap: 0.2rem;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

const TypeSelection = styled.label`
  width: 32%;
  height: 3rem;
  color: ${({ isHighlighted }) => isHighlighted ? THEME.BLACK : THEME.WHITE};
  border-radius: 0.5rem;
  background: ${({ isHighlighted }) => isHighlighted ? THEME.GREEN : THEME.NAVY};
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const CheckInput = styled.input`
  display: none;
`;

const TypeIcon = styled.span`
  margin-right: 0.1rem;
`;

export default SelectionField;
