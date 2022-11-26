import THEME from "crudify-service/dashboard/src/constants/theme";
import React, { useState } from "react";
import styled from "styled-components";

function AdvancedOptionsField({ onAdvanecdOptionChange }) {
  const [options, setOptions] = useState({});
  const [showAdvancedOption, setShowAdvancedOption] = useState(false);
  const handleOptionChange = (config) => {
    const newOptions = {
      ...options,
      ...config
    };

    onAdvanecdOptionChange(newOptions);
    setOptions(newOptions);
  };

  return (
    <Container>
      <AdvancedOptionTitle
        onClick={() => {
          setOptions({});
          setShowAdvancedOption(!showAdvancedOption);
        }}
      >
        세부 설정
        <ArrowIcon className="material-symbols-outlined">
          {showAdvancedOption ? "arrow_drop_up" : "arrow_drop_down"}
        </ArrowIcon>
      </AdvancedOptionTitle>
      {showAdvancedOption && (
        <AdvancedOptions>
          <OptionField
            isChecked={!!options.required}
          >
            <Checkbox
              type="checkbox"
              onChange={(event) => handleOptionChange({ required: event.target.checked })}
            />
            필수적인 값
          </OptionField>
          <OptionField
            isChecked={!!options.unique}
          >
            <Checkbox
              type="checkbox"
              onChange={(event) => handleOptionChange({ unique: event.target.checked })}
            />
            고유한 값
          </OptionField>
          <OptionField
            isChecked={!!options.hasDefault}
          >
            <Checkbox
              type="checkbox"
              onChange={(event) => handleOptionChange({ hasDefault: event.target.checked, default: "" })}
            />
            기본값
          </OptionField>
        </AdvancedOptions>
      )}
      {!!options.hasDefault && (
        <DefaultValueInput
          type="input"
          onChange={(event) => handleOptionChange({ default: event.target.value })}
          placeholder="기본값을 입력해주세요"
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 2rem;
  font-weight: 500;
`;

const AdvancedOptionTitle = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
  margin-bottom: 1rem;
`;

const ArrowIcon = styled.span`
  position: absolute;
  top: 0.3rem;
  left: 3.2rem;
  font-size: 4rem;
  line-height: 1rem;
`;

const AdvancedOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0 0.5rem;
`;

const OptionField = styled.label`
  width: 8rem;
  height: 3rem;
  border-radius: 0.5rem;
  line-height: 3rem;
  text-align: center;
  background: ${({ isChecked }) => isChecked ? THEME.GREEN : THEME.LIGHTER_BLACK};
  color: ${({ isChecked }) => isChecked ? THEME.BLACK : THEME.WHITE};
`;

const Checkbox = styled.input`
  display: none;
`;

const DefaultValueInput = styled.input`
  display: block;
  width: 70%;
  margin: 1rem auto 0;
  height: 2.5rem;
  border: none;
  outline: none;
  padding: 0.5rem;
`;

export default AdvancedOptionsField;
