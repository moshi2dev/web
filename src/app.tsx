import { useState } from "react";
import { Box } from "@yamada-ui/react/components/box";
import { Scene } from "./presentation/components/scene";
import { Dashboard } from "./presentation/components/dashboard";
import type { Section } from "./presentation/components/dashboard";
import { MEMBERS } from "./domain/members";
import type { ColorTheme, ThemePreference } from "./application/hooks/useTheme";
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
  const [section, setSection] = useState<Section>("about");

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
