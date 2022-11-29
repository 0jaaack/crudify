import React from "react";
import styled from "styled-components";

import THEME from "../../constants/theme";
import { useModal } from "../../hooks/useModal";
import SubListMenu from "../Items/SubListMenu";
import CollectionCreationModal from "../windows/CollectionCreationModal";

// hook으로 정리 예정
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CONFIG from "../../constants/config";
import { useCollectionsState } from "../../hooks/useCollections";

function SideBar() {
  const [collections, setCollections] = useCollectionsState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const modal = useModal();
  const currentPath = pathname.split("/").slice(0, 3).join("/");

  useEffect(() => {
    (async () => {
      const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/collections`);
      const { data } = await response.json();

      setCollections(data);
    })();
  }, [setCollections]);

  const onPageButtonClick = (event) => {
    const destination = event.target.innerText.toLowerCase();
    navigate(`/${destination}`);
  };

  const handleCreateCollection = () => {
    modal(<CollectionCreationModal />);
  };

  return (
    <Container>
      <SingleMenu
        onClick={onPageButtonClick}
        isHighlighted={pathname === "/home"}
      >
        Home
      </SingleMenu>
      <SubListMenu
        title="collections"
        list={collections}
        current={currentPath}
      />
      <CreateButton onClick={handleCreateCollection}>
        새로운 컬렉션
      </CreateButton>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 18vw;
  min-width: 14rem;
  height: 100%;
  margin-right: 1.2rem;
  padding: 3rem 1rem 1rem;
  background: ${THEME.COLORS.WHITE};
  font-size: 1.3rem;
  border-radius: 0.9rem;
`;

const SingleMenu = styled.button`
  display: inline-block;
  width: 100%;
  height: 2.5rem;
  padding-left: 1rem;
  background: ${({ isHighlighted }) => isHighlighted ? THEME.COLORS.NAVY : "inherit"};
  color: ${({ isHighlighted }) => isHighlighted ? THEME.COLORS.WHITE : "inherit"};
  text-align: left;
  border-radius: 0.5rem;

  &:hover {
    background: ${THEME.COLORS.NAVY};
    color: ${THEME.COLORS.WHITE};
  }
`;

const CreateButton = styled.button`
  height: 2rem;
  font-size: 0.95rem;
  text-align: left;
  border-radius: 0.5rem;
  margin-left: 1rem;
  padding: 0 3.4rem 0 1rem;
  outline: none;

  &::before {
    content: "+";
    margin-right: 0.5rem;
  }

  &:hover {
    background: #233654;
    color: #E5E5E5;
  }
`;

export default SideBar;
