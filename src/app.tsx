import { RouterProvider } from "@tanstack/react-router";
import type { ColorTheme, ThemePreference } from "./application/hooks/useTheme";
import { router } from "./application/router";
import "./style.css";

export function App({
  preference,
  theme,
  onThemeChange,
}: {
  preference: ThemePreference;
  theme: ColorTheme;
  onThemeChange: (value: ThemePreference) => void;
}) {
  return <RouterProvider router={router} context={{ preference, theme, onThemeChange }} />;
}
