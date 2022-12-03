import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "./hooks/useToast";
import { ModalProvider } from "./hooks/useModal";

import App from "./app/App";
import GlobalStyle from "./app/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
const crudifyQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});

root.render(
  <QueryClientProvider client={crudifyQueryClient}>
    <Router>
      <ToastProvider>
        <ModalProvider>
          <React.Suspense>
            <App />
          </React.Suspense>
          <GlobalStyle />
        </ModalProvider>
      </ToastProvider>
    </Router>
  </QueryClientProvider>
);
