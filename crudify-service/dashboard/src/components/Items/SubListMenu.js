import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import THEME from "../../constants/theme";
import captalize from "../../utils/captalize";

function SubListMenu({ title, list, current }) {
  const navigate = useNavigate();

  const onSubItemClick = (event) => {
    const destination = event.target.innerText;
    navigate(`/${title}/${destination}/model`.toLowerCase());
  };

  return (
    <Container>
      {captalize(title)}
      <SubList>
        {list.map((subItem) => (
          <SubItem
            key={subItem}
            onClick={onSubItemClick}
            isHighlighted={current === `/collections/${subItem}`}
          >
            {captalize(subItem)}
          </SubItem>
        ))}
      </SubList>
    </Container>
  );
}

const SubList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.2rem 0;
  margin-top: 0.3rem;
`;

const SubItem = styled.li`
  height: 2rem;
  padding-left: 1rem;
  background: ${({ isHighlighted }) => isHighlighted ? THEME.COLORS.NAVY : "inherit"};
  color: ${({ isHighlighted }) => isHighlighted ? THEME.COLORS.WHITE : "inherit"};
  font-size: 1.1rem;
  line-height: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background: ${THEME.COLORS.NAVY};
    color: ${THEME.COLORS.WHITE};
  }
`;

const Container = styled.div`
  width: 100%;
  padding-left: 1rem;
`;

export default SubListMenu;
