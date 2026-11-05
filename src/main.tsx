import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UIProvider } from "@yamada-ui/react";
import { App } from "./app";
import { useTheme } from "./application/hooks/useTheme";

const container = document.querySelector("#root");

if (!container) {
  throw new Error("#root element not found");
}

function AppRoot() {
  const { preference, theme, changePreference } = useTheme();
  return (
    <UIProvider colorMode={theme}>
      <App preference={preference} theme={theme} onThemeChange={changePreference} />
    </UIProvider>
  );
}

createRoot(container).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);
