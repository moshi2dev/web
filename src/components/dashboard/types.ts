import type { ThemePreference } from "../../hooks/use-theme";
import type { Member } from "../../data/members";

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
