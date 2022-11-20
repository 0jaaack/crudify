import React from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";

function FrameNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const modelPages = ["contents", "types", "endpoints"];
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
    <HeaderNavigator>
      {modelPages.map((modelPage) => (
        <NavLink
          onClick={onPageClick}
          isCurrentPage={currentPage === modelPage}
        >
          {modelPage}
        </NavLink>
      ))}
    </HeaderNavigator>
  )
}

const HeaderNavigator = styled.ul`
  display: flex;
`;

const NavLink = styled.li`
  margin-right: 1rem;
  color: ${({ isCurrentPage }) => isCurrentPage ? "inherit" : "#808080"};
  font-size: 1.5rem;
  text-transform: uppercase;
  cursor: pointer;
`;

export default FrameNavigation