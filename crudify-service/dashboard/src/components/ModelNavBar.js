import React from "react";
import styled from "styled-components";
import capitalize from "crudify-service/dashboard/src/utils/captalize";

import { useLocation, useNavigate, useParams } from "react-router-dom";

function ModelNavBar() {
  const { collection } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const modelPages = ["model", "api"];
  const currentPage = location.pathname
    .split("/")
    .slice(-1)[0];

  const onPageClick = (event) => {
    const destination = location.pathname
      .split("/")
      .slice(0, 3)
      .concat(event.target.textContent)
      .join("/");

    navigate(destination);
  };

  return (
    <div>
      <CollectionTitle>{capitalize(collection)}</CollectionTitle>
      <HeaderNavigator>
        {modelPages.map((modelPage) => (
          <NavLink
            key={modelPage}
            onClick={onPageClick}
            isCurrentPage={currentPage === modelPage}
          >
            {modelPage}
          </NavLink>
        ))}
      </HeaderNavigator>
    </div>
  )
}

const CollectionTitle = styled.h1`
  margin-top: 1rem;
  font-size: 3rem;
`;

const HeaderNavigator = styled.ul`
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

export default ModelNavBar;
