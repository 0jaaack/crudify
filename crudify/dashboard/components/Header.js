import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Wrapper>
      <Logo>
        CRUDIFY
      </Logo>
    </Wrapper>
  );
}


const Wrapper = styled.header`
  display: flex;
  align-items: center;
  height: 13vh;
`;

const Logo = styled.span`
  position: relative;
  font-size: 3.8rem;
  font-style: italic;
  font-weight: 700;
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    right: -35px;
    top: 15px;
    width: 15px;
    height: 15px;
    background: #1BCC5A;
    border-radius: 50%;
  }
`;

export default Header;
