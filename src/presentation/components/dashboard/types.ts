import type { ThemePreference } from "../../../application/hooks/useTheme";
import type { Member } from "../../../domain/members";

export type Section = "members" | "about" | "works";

export type DashboardProps = {
  member: Member;
  memberIndex: number;
  section: Section;
  preference: ThemePreference;
  onThemeChange: (value: ThemePreference) => void;
  onMemberChange: (index: number) => void;
  onSectionChange: (section: Section) => void;
};
