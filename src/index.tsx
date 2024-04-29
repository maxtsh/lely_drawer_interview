import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const id = "root";

function createAppWrapper() {
  const appDiv = document.createElement("div");
  appDiv.setAttribute("id", id);
  document.body.appendChild(appDiv);
  return appDiv;
}

const rootElement = document.getElementById(id) || createAppWrapper();
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
