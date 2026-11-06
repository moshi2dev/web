import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";
import { Button } from "@yamada-ui/react/components/button";
import type { ThemePreference } from "../../application/hooks/useTheme";

const options = [
  { value: "light", label: "ライト", Icon: LuSun },
  { value: "dark", label: "ナイト", Icon: LuMoon },
  { value: "system", label: "端末設定", Icon: LuMonitor },
] as const;

export function ThemeSwitcher({
  value,
  onChange,
}: {
  value: ThemePreference;
  onChange: (value: ThemePreference) => void;
}) {
  const currentOption = options.find((option) => option.value === value) ?? options[0];
  const currentIndex = options.findIndex((option) => option.value === value);
  const nextOption = options[(currentIndex + 1) % options.length];

  return (
    <Button
      className="theme-switcher"
      variant="ghost"
      type="button"
      aria-label={`表示テーマ: ${currentOption.label}`}
      title={`表示テーマ: ${currentOption.label}（クリックで${nextOption.label}）`}
      onClick={() => onChange(nextOption.value)}
      data-magnetic
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="40px"
      h="40px"
      minW="40px"
      p="0"
      m="0 0 0 auto"
      border="1px solid var(--border)"
      borderRadius="md"
      bg="var(--panel)"
      color="var(--text)"
    >
      <currentOption.Icon aria-hidden="true" size={17} />
    </Button>
  );
}
