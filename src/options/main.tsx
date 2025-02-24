import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Option from "./Option";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Option />
  </StrictMode>
);
