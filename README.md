# web

[vite-plus](https://viteplus.dev/)(`vp`)をベースにした Web サイトテンプレート。

## スタック

| ツール                | 役割                                           | コマンド                 |
| --------------------- | ---------------------------------------------- | ------------------------ |
| Vite+ (`vp`)          | 統合ツールチェーン(Vite 8 / Rolldown / Vitest) | `vp dev` / `vp build`    |
| TypeScript 7 (`tsgo`) | 型チェック(Go ネイティブコンパイラ)            | `pnpm exec tsc --noEmit` |
| Oxfmt                 | フォーマッタ                                   | `vp fmt`                 |
| Oxlint                | リンタ(typeAware + typeCheck 有効)             | `vp lint`                |
| Knip                  | 未使用の依存・export・ファイル検出             | `pnpm run knip`          |
| Git Hooks             | Vite+ フックディスパッチャ(`.vite-hooks/`)     | `vp hooks status`        |
| Yamada UI             | React コンポーネントライブラリ                 | —                        |

`vp check` でフォーマット → リント → 型チェック(Oxc の type-aware パス + TypeScript Go ツールチェーン)が 1 コマンドで実行されます。

## コマンド

```sh
pnpm install      # または vp install
pnpm run dev      # 開発サーバー(pnpm exec vp dev)
pnpm run build    # 型チェック + プロダクションビルド
pnpm run preview  # ビルドのローカルプレビュー
pnpm exec vp check        # fmt + lint + 型チェック
pnpm exec vp check --fix  # 自動修正を適用
pnpm run test             # Vitest(pnpm exec vp test)
pnpm run knip             # 未使用コード・依存の検出
```

## Git Hooks

- `pnpm install` 時に `prepare` スクリプト経由で `vp config` がフックをセットアップします(詳細: `vp hooks status`)。
- **pre-commit**: `vp staged` — ステージされたファイルに対して `vp check --fix` を実行(`vite.config.ts` の `staged` ブロックで設定)。
- **pre-push**: `vp check` と `pnpm run knip` を実行。
- フックを無効化したい環境では `vp hooks disable` または `VP_GIT_HOOKS=0 git commit` を使用。

## 構成

```txt
.
├── .vite-hooks/     # Git フック(pre-commit / pre-push)
├── knip.json        # Knip 設定
├── pnpm-workspace.yaml
├── src/
│   ├── app.tsx
│   ├── lib/         # ユーティリティ + テスト
│   └── main.tsx
├── tsconfig.json
├── vite.config.ts   # Vite+ 統合設定(fmt / lint / staged / plugins)
└── index.html
```

## Yamada UI

`UIProvider` は `src/main.tsx` でアプリ全体を包んでいます。カラーモードの FOUC 対策として、`vite.config.ts` の `injectColorModeScript` プラグインが同期スクリプトを注入します。

```tsx
import { Button } from "@yamada-ui/react";

function Example() {
  return <Button>Click me</Button>;
}
```

## ダッシュボード

ダッシュボードはHTMLで表示します。背景はWeb WorkerとOffscreenCanvasで描画し、マウスに反応する動きはOSのモーション設定に従います。
