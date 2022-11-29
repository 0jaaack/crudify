import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Button from "../atoms/Button";
import NameField from "../items/NameField";
import SelectionField from "../items/SelectionField";
import AdvancedOptionsField from "../items/AdvancedOptionsField";

function TypeCreationModal({ createNewType, closeModal }) {
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

    createNewType(type);

    return closeModal();
  };

  return (
    <Container>
      <Title>
        새로운 타입 생성
      </Title>
      <NameField
        onNameChange={(name) => handleTypeOptionChange({ name })}
      />
      <SelectionField
        currentSelection={typeConfig.selection}
        onSelectionChange={(selection) => handleTypeOptionChange({ selection })}
      />
      <AdvancedOptionsField
        onAdvanecdOptionsChange={(options) => handleTypeOptionChange({ options })}
      />
      <div>
        <CreationButton
          onClick={handleTypeCreate}
        >
          생성하기
        </CreationButton>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem 0;
  position: relative;
  width: 40rem;
  padding: 4rem 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CreationButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;

export default TypeCreationModal;
