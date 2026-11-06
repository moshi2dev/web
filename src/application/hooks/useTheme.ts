import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference = "light" | "dark" | "system";
export type ColorTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference;
  theme: ColorTheme;
  changePreference: (value: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const storageKey = "moshi2-theme";

function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference);
  const [systemDark, setSystemDark] = useState(
    () => matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const theme: ColorTheme = preference === "system" ? (systemDark ? "dark" : "light") : preference;

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) setPreference(readPreference());
    };
    media.addEventListener("change", onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.siteTheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#25282a" : "#ecece5");
  }, [theme]);

  const changePreference = (value: ThemePreference) => {
    setPreference(value);
    try {
      localStorage.setItem(storageKey, value);
    } catch {}
  };
  return { preference, theme, changePreference };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeState = useTheme();

  return createElement(ThemeContext.Provider, { value: themeState }, children);
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
}
