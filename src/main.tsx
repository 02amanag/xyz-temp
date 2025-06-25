import "./i18n";
import App from "./App.tsx";
import "./styles/index.css";
import { Toaster } from "xyz-comp";
import { createRoot } from "react-dom/client";
import { RootProviders } from "@/providers/root-providers";

createRoot(document.getElementById("root")!).render(
  <RootProviders>
    <App />
    <Toaster />
  </RootProviders>
);