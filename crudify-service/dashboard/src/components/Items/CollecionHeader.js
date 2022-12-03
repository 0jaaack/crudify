import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import CONFIG from "../../constants/config";
import capitalize from "../../utils/captalize";

function CollectionHeader({ children }) {
  const { collection } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname
    .split("/")
    .slice(-1)[0];

  const onCollectionMenuClick = (event) => {
    const destination = location.pathname
      .split("/")
      .slice(0, 3)
      .concat(event.target.textContent)
      .join("/");

    navigate(destination);
  };

  return (
    <Container>
      <HeaderMain>
        <CollectionTitle>
          {capitalize(collection)}
        </CollectionTitle>
        <CollectionNavigator>
          {CONFIG.COLLECTION_MENU.map((collectionMenu) => (
            <NavLink
              key={collectionMenu}
              onClick={onCollectionMenuClick}
              isCurrentPage={currentPage === collectionMenu}
            >
              {collectionMenu}
            </NavLink>
          ))}
        </CollectionNavigator>
      </HeaderMain>
      <ButtonConsole>
        {children}
      </ButtonConsole>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const HeaderMain = styled.div`
`;

const CollectionTitle = styled.h1`
  margin-top: 1rem;
  font-size: 3rem;
`;

const CollectionNavigator = styled.ul`
  display: flex;
  width: 100%;
  margin-top: 0.3rem;
`;

const NavLink = styled.li`
  margin-right: 1rem;
  color: ${({ isCurrentPage }) => isCurrentPage ? "inherit" : "#808080"};
  font-size: 1.4rem;
  text-transform: uppercase;
  cursor: pointer;
`;

const ButtonConsole = styled.div`
  margin-top: 3rem;
`;

export default CollectionHeader;
