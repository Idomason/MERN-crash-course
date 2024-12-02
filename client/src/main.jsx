import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "../src/components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "../src/components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Toaster />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
