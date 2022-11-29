import React from "react";
import styled from "styled-components";

import THEME from "../../constants/theme";
import ICON_TYPES from "../../constants/iconTypes";
import Icon from "../atoms/Icon";

function TypeBar({ name, type }) {
  return (
    <Container>
      <TypeTitle>
        <Icon
          type={ICON_TYPES[type.toUpperCase()]}
        />
        <TypeName className="typeName">
          {name}
        </TypeName>
      </TypeTitle>
      <TypeSelection className="typeSelection">
        {type}
      </TypeSelection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 3rem;
  padding: 0 15vw 0 6vw;
  background: ${THEME.COLORS.DARK_NAVY};
  color: ${THEME.COLORS.WHITE};
  font-weight: 500;
  line-height: 3rem;
  border-radius: 0.5rem;
  box-shadow: ${THEME.BOX_SHADOW};
  cursor: pointer;

  &:hover {
    transform: scaleX(1.005);
  }
`;

const TypeTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
  height: 100%;
`;

const TypeName = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  font-weight: 500;
  line-height: 3rem;
`;

const TypeSelection = styled.span`
  position: relative;
  width: 5rem;
  font-weight: 300;
`;

export default TypeBar;
