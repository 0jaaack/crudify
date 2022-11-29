import React, { useState } from "react";
import styled from "styled-components";
import THEME from "../../constants/theme";

function AdvancedOptionsField({ onAdvanecdOptionsChange }) {
  const [options, setOptions] = useState({});
  // const [showAdvancedOption, setShowAdvancedOption] = useState(false);

  const toggleOptions = () => {
    setOptions({});
  };

  const handleOptionChange = (config) => {
    const newOptions = {
      ...options,
      ...config
    };

    onAdvanecdOptionsChange(newOptions);
    setOptions(newOptions);
  };

  return (
    <Container>
      <OptionsTitle onClick={toggleOptions}>
        세부 설정
      </OptionsTitle>
      <AdvancedOptions>
        <OptionField
          onClick={() => setOptions(prev => ({ ...prev, required: !prev.required }))}
          isChecked={!!options.required}
        >
          필수적인 값
        </OptionField>
        <OptionField
          onClick={() => setOptions(prev => ({ ...prev, unique: !prev.unique }))}
          isChecked={!!options.unique}
        >
          고유한 값
        </OptionField>
        <OptionField
          onClick={() => setOptions(prev => ({ ...prev, hasDefault: !prev.hasDefault }))}
          isChecked={!!options.hasDefault}
        >
          기본값
        </OptionField>
      </AdvancedOptions>
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

const Container = styled.details`
  font-weight: 500;
`;

const OptionsTitle = styled.summary`
  margin-bottom: 1rem;
  cursor: pointer;
`;

const AdvancedOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0 0.5rem;
`;

const OptionField = styled.label`
  width: 8rem;
  height: 3rem;
  background: ${({ isChecked }) => isChecked ? THEME.GREEN : THEME.LIGHTER_BLACK};
  color: ${({ isChecked }) => isChecked ? THEME.BLACK : THEME.WHITE};
  line-height: 3rem;
  text-align: center;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const DefaultValueInput = styled.input`
  display: block;
  width: 70%;
  height: 2.5rem;
  margin: 1rem auto 0;
  padding: 0.5rem;
  border: none;
  font-size: 1rem;
  outline: none;
`;

export default AdvancedOptionsField;
