import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useModal } from "../hooks/useModal";
import { useCollectionsState } from "../hooks/useCollections";

import CreateCollectionModal from "crudify-service/dashboard/src/components/CollectionCreationModal";
import captalize from "../utils/captalize";
import CONFIG from "../constants/config";

function SideBar() {
  const [collections, setCollections] = useCollectionsState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const modal = useModal();

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
  const onModelPageButtonClick = (event) => {
    const destination = event.target.innerText.toLowerCase();
    navigate(`/collections/${destination}/model`);
  };

  return (
    <Container>
      <PageMenu>
        <PageItem>
          <PageButton
            onClick={onPageButtonClick}
            isHighlighted={pathname === "/home"}
          >
            Home
          </PageButton>
        </PageItem>
        <SubMenuItem>
          Collection
          <SubPageMenu>
            {collections.map((collection) => (
              <SubPageItem key={collection}>
                <PageButton
                  onClick={onModelPageButtonClick}
                  isHighlighted={pathname.includes(`/collections/${collection}`)}
                >
                  {captalize(collection)}
                </PageButton>
              </SubPageItem>
            ))}
            <CreateButton onClick={() => modal(<CreateCollectionModal />)}>
              새로운 컬렉션
            </CreateButton>
          </SubPageMenu>
        </SubMenuItem>
      </PageMenu>
    </Container>
  );
}

const Container = styled.section`
  width: 18vw;
  min-width: 13rem;
  height: 100%;
  margin-right: 1.2rem;
  padding: 1rem;
  background: #E5E5E5;
  border-radius: 0.9rem;
`;

const PageMenu = styled.ul`
  margin-top: 2rem;
`;

const PageItem = styled.li`
  width: 100%;
  height: 2.6rem;
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
`;

const SubMenuItem = styled.li`
  width: 100%;
  font-size: 1.3rem;
  padding-left: 1rem;
`;

const PageButton = styled.button`
  display: inline-block;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  text-align: left;
  border-radius: 0.5rem;
  background: ${({ isHighlighted }) => isHighlighted ? "#233654" : "inherit"};
  color: ${({ isHighlighted }) => isHighlighted ? "#E5E5E5" : "inherit"};

  &:hover {
    background: #233654;
    color: #E5E5E5;
  }
`;

const SubPageMenu = styled.ul`
  margin-top: 0.3rem;
`;

const SubPageItem = styled(PageItem)`
  font-size: 1.1rem;
  height: 2rem;
`;

const CreateButton = styled.button`
  width: 100%;
  height: 2rem;
  font-size: 0.95rem;
  text-align: left;
  border-radius: 0.5rem;
  padding-left: 1rem;
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
