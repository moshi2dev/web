import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";
import type { ThemePreference } from "../hooks/use-theme";

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
    <fieldset className="theme-switcher" data-value={value}>
      <legend className="visually-hidden">表示テーマ</legend>
      {options.map(({ value: option, label, Icon }) => (
        <label className="theme-option" key={option} title={label}>
          <input
            type="radio"
            name="theme"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </label>
      ))}
    </fieldset>
  );
}
