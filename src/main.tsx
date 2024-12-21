import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";

import App from "./components/Conversations/demo/basic";

// import App from "./components/Bubble/demo/loadingState";
// import App from "./components/Bubble/demo/typing.tsx";
// import App from "./components/Bubble/demo/list";
// import App from "./components/Bubble/demo/basic";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
