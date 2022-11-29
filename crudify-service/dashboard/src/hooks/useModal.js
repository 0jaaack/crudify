import React, { useState, createContext, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import THEME from "../constants/theme";

const ModalContext = createContext();

function ModalPortal({ children }) {
  const modalRoot = document.getElementById("modal-potal-root");
  return ReactDOM.createPortal(children, modalRoot);
}

function Modal({ element, closeModal }) {
  useEffect(() => {
    const body = document.querySelector("body");

    body.style.overflow = "hidden";

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        return closeModal();
      }
    });

    return () => {
      body.style.removeProperty("overflow");
    };
  }, []);

  const handleOuterClick = (event) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <ModalPortal>
      <ModalBackground onClick={handleOuterClick}>
        <ModalWindow>
          <ModalCloseButton onClick={closeModal} className="material-symbols-outlined">
            close
          </ModalCloseButton>
          {React.cloneElement(element, { closeModal })}
        </ModalWindow>
      </ModalBackground>
    </ModalPortal>
  );
}

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={setModal}>
      {children}
      {!!modal &&
        <Modal
          closeModal={() => setModal(null)}
          element={modal}
        />
      }
    </ModalContext.Provider>
  );
}

export function useModal() {
  const setModal = useContext(ModalContext);

  if (!setModal) {
    return null;
  }

  return (element) => setModal(element);
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
`;

const ModalWindow = styled.div`
  min-width: 200px;
  min-height: 200px;
  background: ${THEME.COLORS.WHITE};
  border-radius: 0.9rem;
  position: relative;
  z-index: 10;
  animation-name: slideIn, slideOut;
  animation-delay: 0s, 3s;
  animation-duration: 0.2s;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalCloseButton = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 30px;
  cursor: pointer;
  z-index: 99;

  &.material-symbols-outlined {
    font-variation-settings:
      "opsz" 48
  }
`;
