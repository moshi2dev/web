import { COLOR_MODE_STORAGE_KEY, getStorageScript } from "@yamada-ui/react";
import type { Plugin } from "vite-plus";
import { defineConfig } from "vite-plus";

/**
 * カラーモードの同期スクリプトを `<body>` 直後に注入する。
 * これがないとページ読み込み時にカラーモードが一瞬チラつく(FOUC)。
 * @see https://yamada-ui.com/docs/get-started/frameworks/vite
 */
function injectColorModeScript(): Plugin {
  return {
    name: "inject-color-mode-script",
    transformIndexHtml(html) {
      const content = getStorageScript(
        "colorMode",
        COLOR_MODE_STORAGE_KEY,
      )({
        defaultValue: "dark",
      });

      return html.replace("<body>", `<body><script>${content}</script>`);
    },
  };
}

export default defineConfig({
  plugins: [injectColorModeScript()],
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
