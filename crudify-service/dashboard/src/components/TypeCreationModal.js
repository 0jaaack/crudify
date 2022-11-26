import THEME from "crudify-service/dashboard/src/constants/theme";
import React, { useState, useCallback } from "react";
import styled from "styled-components";

import NameField from "crudify-service/dashboard/src/components/NameField";
import SelectionField from "crudify-service/dashboard/src/components/SelectionField";
import AdvancedOptionsField from "crudify-service/dashboard/src/components/AdvancedOptionsField";

function TypeCreationModal({ createType, closeModal }) {
  const [typeConfig, setTypeConfig] = useState({
    name: "",
    selection: null,
    option: {}
  });

  const handleTypeOptionChange = useCallback((option) => {
    setTypeConfig(prev => Object.assign(prev, option));
  }, [setTypeConfig]);

  const handleTypeCreate = () => {
    const type = {
      name: typeConfig.name,
      type: typeConfig.selection,
      options: []
        .concat(!!typeConfig.options?.required ? "required" : [])
        .concat(!!typeConfig.options?.unique ? "unique" : []),
      values: {
        ...(!!typeConfig.options?.hasDefault && { default: typeConfig.options.default })
      }
    };

    createType(type);

    return closeModal();
  };

  return (
    <Container>
      <NameField
        onNameChange={(name) => handleTypeOptionChange({ name })}
      />
      <SelectionField
        currentSelection={typeConfig.selection}
        onSelectionChange={(selection) => handleTypeOptionChange({ selection })}
      />
      <AdvancedOptionsField
        onAdvanecdOptionChange={(options) => handleTypeOptionChange({ options })}
      />
      <CreationButton
        onClick={handleTypeCreate}
      >
        생성하기
      </CreationButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 3rem;
  width: 40rem;
  padding: 5rem;
  gap: 2rem 0;
`;

const CreationButton = styled.button`
  background: ${THEME.GREEN};
  border-radius: 0.5rem;
  height: 3rem;
  width: 7rem;
  font-weight: 500;
  position: absolute;
  bottom: 2rem;
  left: calc(50% - 3.5rem);
  margin: 0 auto;
`;

export default TypeCreationModal;
