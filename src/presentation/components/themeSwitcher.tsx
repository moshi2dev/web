import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";
import { Box, Icon as YamadaIcon, VisuallyHidden } from "@yamada-ui/react";
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
  return (
    <Box
      as="fieldset"
      className="theme-switcher"
      data-value={value}
      display="grid"
      gridTemplateColumns="repeat(3, 40px)"
      p="4px"
      m="0 0 0 auto"
    >
      <VisuallyHidden as="legend">表示テーマ</VisuallyHidden>
      {options.map(({ value: option, label, Icon }) => (
        <Box
          as="label"
          className="theme-option"
          key={option}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="40px"
          h="40px"
        >
          <input
            type="radio"
            name="theme"
            aria-label={label}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <YamadaIcon as={Icon} aria-hidden="true" boxSize="17px" />
        </Box>
      ))}
    </Box>
  );
}
