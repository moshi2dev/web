import { useState } from "react";
import { Box } from "@yamada-ui/react";
import { Scene } from "./components/scene";
import { Dashboard } from "./components/dashboard";
import { MEMBERS } from "./data/members";
import type { ColorTheme, ThemePreference } from "./hooks/use-theme";
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
  const [memberIndex, setMemberIndex] = useState(0);
  const [section, setSection] = useState<"members" | "about" | "works">("members");

  return (
    <Box as="main" className="app" minH="100svh">
      <Scene theme={theme}>
        <Dashboard
          member={MEMBERS[memberIndex]!}
          memberIndex={memberIndex}
          section={section}
          preference={preference}
          onThemeChange={onThemeChange}
          onMemberChange={(index) => {
            setMemberIndex(index);
            setSection("members");
          }}
          onSectionChange={setSection}
        />
      </Scene>
    </Box>
  );
}
