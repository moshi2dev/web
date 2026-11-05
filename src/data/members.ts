export type Member = {
  name: string;
  handle: string;
  description: string;
  interests: readonly string[];
  avatar: string;
  personalSite?: { href: string; domain: string };
};

export const MEMBERS: readonly Member[] = [
  {
    name: "mimifuwacc",
    handle: "mimifuwacc",
    description: "Webアプリケーションエンジニア。アセンブリの形式検証にも取り組む。",
    interests: ["Web", "形式検証", "TypeScript"],
    avatar: "/members/mimifuwacc.png",
    personalSite: { href: "https://mimifuwa.cc", domain: "mimifuwa.cc" },
  },
  {
    name: "あかあく",
    handle: "AkaakuHub",
    description: "Webサイトやモバイルオーダーシステムなどを手がけるエンジニア。",
    interests: ["Web", "プロダクト開発", "セキュリティ"],
    avatar: "/members/akaakuhub.jpg",
    personalSite: { href: "https://akaaku.net", domain: "akaaku.net" },
  },
  {
    name: "tora",
    handle: "t0ratiger",
    description: "プログラミング言語とWebに取り組む。GitHubでも開発を公開中。",
    interests: ["プログラミング言語", "Web"],
    avatar: "/members/t0ratiger.jpg",
  },
  {
    name: "Keita Ito",
    handle: "keitaitonet",
    description: "フロントエンドからバックエンド、クラウドインフラまで手がける。",
    interests: ["フルスタック", "クラウド", "自宅サーバー"],
    avatar: "/members/keitaitonet.jpg",
    personalSite: { href: "https://keitaito.net", domain: "keitaito.net" },
  },
  {
    name: "Kanaru",
    handle: "kanaru0928",
    description: "Web開発からインフラ構築まで。モバイルオーダーや個人開発にも取り組む。",
    interests: ["TypeScript", "React", "インフラ"],
    avatar: "/members/kanaru0928.jpg",
    personalSite: { href: "https://www.kanaru.me", domain: "kanaru.me" },
  },
];
