import React, { useState, createContext, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Frame from "../components/FrameWindow";

const ModalContext = createContext();

function ModalPortal({ children }) {
  const modalRoot = document.getElementById("modal-potal-root");
  return ReactDOM.createPortal(children, modalRoot);
}

function Modal({ element, closeModal }) {
  useEffect(() => {
    const body = document.querySelector("body");

    body.style.overflow = "hidden";

    return () => {
      body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <ModalPortal>
      <ModalBackground onClick={closeModal}>
        <ModalWindow>
          <ModalCloseButton onClick={closeModal} className="material-symbols-outlined">
            close
          </ModalCloseButton>
          {element}
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

const ModalWindow = styled(Frame)`
  width: unset;
  height: unset;
  min-width: 200px;
  min-height: 200px;
  position: relative;
`;

const ModalCloseButton = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 30px;
  cursor: pointer;

  &.material-symbols-outlined {
    font-variation-settings:
      "opsz" 48
  }
`;
