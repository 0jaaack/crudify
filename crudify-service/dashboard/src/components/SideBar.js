import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FrameWindow from "./FrameWindow";

function SideBar() {
  const modelList = ["Users", "Todos"];
  const navigate = useNavigate();

  const onPageButtonClick = (event) => {
    const destination = event.target.innerText.toLowerCase();
    navigate(`/${destination}`);
  };
  const onModelPageButtonClick = (event) => {
    const destination = event.target.innerText.toLowerCase();
    navigate(`/models/${destination}/contents`);
  };

  return (
    <SideBarWindow>
      <PageMenu>
        <PageItem>
          <PageButton onClick={onPageButtonClick}>
            Home
          </PageButton>
        </PageItem>
        <SubMenuItem>
          Models
          <SubPageMenu>
            {modelList.map((model) => (
              <SubPageItem>
                <PageButton onClick={onModelPageButtonClick}>
                  {model}
                </PageButton>
              </SubPageItem>
            ))}
            {/* <a>+ 새로운 모델 생성하기</a> */}
          </SubPageMenu>
        </SubMenuItem>
        <PageItem>
          <PageButton onClick={onPageButtonClick}>
            Log
          </PageButton>
        </PageItem>
        <PageItem>
          <PageButton onClick={onPageButtonClick}>
            Settings
          </PageButton>
        </PageItem>
      </PageMenu>
    </SideBarWindow>
  );
}

const SideBarWindow = styled(FrameWindow)`
  width: 18vw;
  min-width: 13rem;
  height: 100%;
  margin-right: 1.2rem;
  padding: 0.5rem;
`;

const PageMenu = styled.ul`
  margin-top: 0.7rem;
`;

const PageItem = styled.li`
  width: 100%;
  height: 2.6rem;
  font-size: 1.4rem;
  font-weight: 300;
`;

const SubMenuItem = styled.li`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 300;
  padding-left: 1rem;
`;

const PageButton = styled.button`
  display: inline-block;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  text-align: left;
  border-radius: 0.5rem;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const SubPageMenu = styled.ul`
  margin-top: 0.3rem;
`;

const SubPageItem = styled(PageItem)`
  padding-left: 0.5rem;
  font-size: 1.1rem;
  height: 2rem;
  border-radius: 0.3rem;
`;

export default SideBar;
