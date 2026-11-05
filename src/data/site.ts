export const SERVER = {
  name: "まいくら鯖",
  tagline: "みんなで築く、夜空のサバイバル",
  ip: "mc.maikura-saba.example.jp",
  onlinePlayers: 87,
  maxPlayers: 200,
  version: "1.21.x (Java / Bedrock)",
  uptime: "99.9%",
  stats: [
    { label: "同時接続プレイヤー", value: "87 / 200" },
    { label: "対応バージョン", value: "1.21.x (Java / Bedrock)" },
    { label: "稼働率", value: "99.9%" },
    { label: "平均レスポンス", value: "23ms" },
  ] as const,
} as const;

export type Feature = {
  icon: string;
  title: string;
  description: string;
  tags: readonly string[];
  wide?: boolean;
};

export const FEATURES: readonly Feature[] = [
  {
    icon: "🌿",
    title: "バニラニア サバイバル",
    description:
      "手触りを大切にしたバニラ寄りの調整。階段・ブランチ詰まりのない快適な経済と建築環境を用意しています。",
    tags: ["土地保護", "経済管理"],
    wide: true,
  },
  {
    icon: "🛡️",
    title: "グリーフィング防止",
    description: "CoreProtect と土地ロックで建築物を保護。荒らしは24時間体制で即対応します。",
    tags: ["CoreProtect", "土地ロック"],
  },
  {
    icon: "🛒",
    title: "プレイヤーズ経済",
    description: "ショップ優待枠・オークション・住民券で取引。無課金で全要素を遊べます。",
    tags: ["ショップ", "オークション"],
  },
  {
    icon: "✨",
    title: "季節イベント",
    description:
      "ハロウィン、冬まつり、夏祭り…。運営イベントとプレイヤー企画が年間を通して開催されます。",
    tags: ["月次イベント", "コンテスト"],
  },
  {
    icon: "⚡",
    title: "ラグの少ない環境",
    description:
      "AMD EPYC + NVMe + 10Gbps 回線。同時接続 200 人でも TPS 20 を維持するサーバー構成です。",
    tags: ["TPS 20 維持", "10Gbps"],
  },
  {
    icon: "🗣️",
    title: "やさしい コミュニティ",
    description: "Discord のテキスト / VC が活発。初心者歓迎チャンネルで案内役がサポートします。",
    tags: ["Discord", "初心者歓迎"],
    wide: true,
  },
] satisfies readonly Feature[];

export const JOIN_STEPS = [
  {
    step: "01",
    title: "Minecraft を起動",
    description:
      "Java Edition または Bedrock Edition の最新版を用意します。旧バージョンでも ViaVersion で参加可能です。",
  },
  {
    step: "02",
    title: "マルチプレイを選択",
    description: "サーバーアドレスに下の IP を入力して一覧に追加します。",
  },
  {
    step: "03",
    title: "IP を入力して接続",
    description: "初参加は Discord の歓迎チャンネルで案内役がご案内します。お気軽にどうぞ。",
  },
] as const;

export const NEWS = [
  {
    date: "2026-11-01",
    tag: "イベント",
    title: "ハロウィンナイト 2026 開催中",
    description: "限定ショップ、コスプレコンテスト、夜間レイドを 11/7 まで開催中です。",
  },
  {
    date: "2026-10-12",
    tag: "更新",
    title: "1.21 系最新へ対応",
    description: "ViaVersion を導入し、旧クライアントからの参加も引き続きサポートします。",
  },
  {
    date: "2026-09-20",
    tag: "機能",
    title: "新・経済区「ミナト地区」オープン",
    description: "港湾エリアに商店街が拡張。出店枠は先着制で受付中です。",
  },
  {
    date: "2026-08-15",
    tag: "お知らせ",
    title: "夏まつり花火大会レポート",
    description: "花火職人ギルドが手掛けた 2 万発のロケットの様子をまとめました。",
  },
] as const;

export const FAQ = [
  {
    question: "Java と Bedrock どちらで遊べますか?",
    answer:
      "両方対応しています。Bedrock は GeyserMC 経由で接続でき、スマホやタブレットなど環境を選びません。",
  },
  {
    question: "初心者でも大丈夫?",
    answer:
      "大丈夫です。初心者歓迎チャンネルと案内役がいて、土地保護や経済の基本から教えてくれます。",
  },
  {
    question: "有料課金はありますか?",
    answer:
      "ありません。運営は寄付のみで成り立っており、ゲーム内のメリットはすべて等しく提供されます。",
  },
  {
    question: "接続できないときは?",
    answer: "IP の再確認とクライアントのバージョン確認をした上で Discord でお知らせください。",
  },
] as const;
