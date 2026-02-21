import { createRoot } from "react-dom/client";
import App from "./App";              // ✅ ADD THIS
import Master from "./components/Master";

createRoot(document.getElementById("root")).render(
  <Master>
    <App />
  </Master>
);
