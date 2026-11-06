import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UIProvider } from "@yamada-ui/react/providers/ui-provider";
import { App } from "./app";
import { ThemeProvider, useThemeContext } from "./application/hooks/useTheme";

const container = document.querySelector("#root");

if (!container) {
  throw new Error("#root element not found");
}

function AppRoot() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { theme } = useThemeContext();

  return (
    <UIProvider colorMode={theme}>
      <App />
    </UIProvider>
  );
}

createRoot(container).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);
