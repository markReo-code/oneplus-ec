export type HeaderNavItem = {
  label: string;
  href?: string;
  subItems?: {
    label: string;
    href: string;
  }[];
};

export const headerNavItems: HeaderNavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    subItems: [
      { label: "T-Shirts", href: "/collections/tshirts" },
      { label: "Shirts", href: "/collections/shirts" },
      { label: "Bottoms", href: "/collections/bottoms" },
      { label: "Caps", href: "/collections/caps" },
    ],
  },
  {
    label: "All Items",
    href: "/products"
  },
];
