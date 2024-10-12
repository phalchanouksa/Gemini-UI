// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChatContainer from "./ChatContainer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatContainer />
  </StrictMode>
);
