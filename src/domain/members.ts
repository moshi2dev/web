type MemberLinks = {
  site?: string;
  blog?: string;
};

export type Member = {
  name: string;
  handle: string;
  description: string;
  interests: readonly string[];
  avatar: string;
  links?: MemberLinks;
};

export const MEMBERS: readonly Member[] = [
  {
    name: "mimifuwacc",
    handle: "mimifuwacc",
    description: "Webアプリケーションの開発を中心に、学祭向けサービスや個人サイトを制作。",
    interests: ["Webアプリケーション", "形式検証", "ヰ世界情緒"],
    avatar: "/members/mimifuwacc.png",
    links: { site: "mimifuwa.cc", blog: "mimifuwa.cc/blogs" },
  },
  {
    name: "あかあく",
    handle: "AkaakuHub",
    description:
      "個人開発でWebサービスやUnityゲームを作り、チームではモバイルオーダーシステムの開発・導入に取り組む。",
    interests: ["Webサービス", "ゲーム", "女性声優"],
    avatar: "/members/akaakuhub.webp",
    links: { site: "akaaku.net", blog: "blog.akaaku.net" },
  },
  {
    name: "tora",
    handle: "t0ratiger",
    description:
      "Webアプリケーションやリアルタイム通信を開発し、Rust・Go・Cでインタプリタやサーバーも実装する。",
    interests: ["リアルタイム通信", "プログラミング言語", "Webバックエンド"],
    avatar: "/members/t0ratiger.webp",
  },
  {
    name: "Keita Ito",
    handle: "keitaitonet",
    description:
      "フロントエンド・バックエンド・AWSを横断して、学園祭向けサービスや3D Webアプリを開発する。",
    interests: ["フロントエンド", "バックエンド", "AWS"],
    avatar: "/members/keitaitonet.webp",
    links: { site: "keitaito.net" },
  },
  {
    name: "Kanaru",
    handle: "kanaru0928",
    description:
      "TypeScriptとReactを中心に、モバイルオーダーや3D Webアプリを開発し、AWSなどのインフラも構築する。",
    interests: ["Webフロントエンド", "クラウドインフラ", "機械学習"],
    avatar: "/members/kanaru0928.webp",
    links: { site: "kanaru.me", blog: "kanaru.me/articles" },
  },
];
