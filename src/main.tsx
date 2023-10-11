import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Restricted mode is temporarily disabled because it causes issues with keycloak-js
  // see here: https://github.com/react-keycloak/react-keycloak/issues/93
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
