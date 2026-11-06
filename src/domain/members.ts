export type Member = {
  name: string;
  handle: string;
  description: string;
  interests: readonly string[];
  avatar: string;
  personalSite?: { href: string; domain: string };
  blog?: { path?: string };
};

export const MEMBERS: readonly Member[] = [
  {
    name: "mimifuwacc",
    handle: "mimifuwacc",
    description:
      "Webアプリケーションの開発を中心に、学祭向けサービスや個人サイトを制作。大学ではアセンブリの形式検証に取り組んでいる。",
    interests: ["Webアプリケーション", "フロントエンド", "形式検証"],
    avatar: "/members/mimifuwacc.png",
    personalSite: { href: "https://mimifuwa.cc", domain: "mimifuwa.cc" },
    blog: { path: "/blogs" },
  },
  {
    name: "あかあく",
    handle: "AkaakuHub",
    description:
      "個人開発でWebサービスやブラウザゲームを作り、チームではモバイルオーダーシステムの開発・導入に取り組む。",
    interests: ["Webサービス", "ブラウザゲーム", "開発ツール"],
    avatar: "/members/akaakuhub.jpg",
    personalSite: { href: "https://akaaku.net", domain: "akaaku.net" },
    blog: {},
  },
  {
    name: "tora",
    handle: "t0ratiger",
    description:
      "Webアプリケーションやリアルタイム通信を開発し、Rust・Go・Cでインタプリタやサーバーも実装する。",
    interests: ["リアルタイム通信", "プログラミング言語", "Webバックエンド"],
    avatar: "/members/t0ratiger.jpg",
  },
  {
    name: "Keita Ito",
    handle: "keitaitonet",
    description:
      "フロントエンド・バックエンド・AWSを横断して、学園祭向けサービスや3D Webアプリを開発する。",
    interests: ["フロントエンド", "バックエンド", "AWS"],
    avatar: "/members/keitaitonet.jpg",
    personalSite: { href: "https://keitaito.net", domain: "keitaito.net" },
  },
  {
    name: "Kanaru",
    handle: "kanaru0928",
    description:
      "TypeScriptとReactを中心に、モバイルオーダーや3D Webアプリを開発し、AWSなどのインフラも構築する。",
    interests: ["Webフロントエンド", "クラウドインフラ", "機械学習"],
    avatar: "/members/kanaru0928.jpg",
    personalSite: { href: "https://www.kanaru.me", domain: "kanaru.me" },
  },
];
