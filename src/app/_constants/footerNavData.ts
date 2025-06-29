export type FooterNavItem = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export const FooterNavItems: FooterNavItem[] = [
  {
    title: "カスタマーサービス",
    links: [
      { label: "よくあるご質問", href: "/" },
      { label: "返品ポリシー", href: "/" },
      { label: "サイズガイド", href: "/" },
      { label: "お支払い方法", href: "/" },
    ],
  },
  {
    title: "ご利用ガイド",
    links: [
      { label: "特定商取引法に基づく表記", href: "/" },
      { label: "プライバシーポリシー", href: "/" },
      { label: "利用規約", href: "/" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "会社情報", href: "/" },
      { label: "採用情報", href: "/" },
      { label: "Sustainability", href: "/" },
    ],
  },
];
