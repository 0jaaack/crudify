import THEME from "crudify-service/dashboard/src/constants/theme";
import React, { useState, createContext, useContext, useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ToastContext = createContext();

function ToastPortal({ children }) {
  const toastRoot = document.getElementById("toast-potal-root");
  return ReactDOM.createPortal(children, toastRoot);
}

function ToastMessage({ messages }) {
  return (
    <ToastPortal>
      <MessageList>
        {messages.map((message) => (
          <MessageBubble>
            {message}
          </MessageBubble>
        ))}
      </MessageList>
    </ToastPortal>
  );
}

export function ToastProvider({ children }) {
  const [toastmessages, setToastmessages] = useState([]);
  const registerToastMessage = useCallback(
    (message) => {
      setToastmessages(toastmessages => toastmessages.concat(message));

      setTimeout(() => {
        setToastmessages(toastmessages => toastmessages.slice(1));
      }, 5000);
    },
    [setToastmessages],
  );

  return (
    <ToastContext.Provider value={registerToastMessage}>
      {children}
      <ToastMessage messages={toastmessages} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const registerToastMessage = useContext(ToastContext);

  if (!registerToastMessage) {
    return null;
  }

  return (message) => registerToastMessage(message);
}

const MessageList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  width: 25vw;
  max-height: 100%;
  padding: 1rem 1.5rem 0 0;
`;

const MessageBubble = styled.p`
  max-width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.8rem 1rem;
  background: ${THEME.YELLOW};
  color: ${THEME.BLACK};
  font-size: 0.9rem;
  white-space: pre-line;
  border-radius: 0.6rem;
  box-shadow: ${THEME.BOX_SHODOW};
  animation-name: slideIn;
  animation-delay: 0s;
  animation-duration: 1s;

  @keyframes slideIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
