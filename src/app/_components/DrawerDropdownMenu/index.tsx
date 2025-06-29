"use client";

import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  subItems: { label: string; href: string }[];
  isDropdownOpen: boolean;
  panelId: string;
};

export default function DrawerDropdownMenu({ subItems, isDropdownOpen, panelId }: Props) {
  return (
    <div 
      id={panelId}
      className={`${styles.panel} ${isDropdownOpen ? styles.open : ""}`}
      aria-hidden={!isDropdownOpen}
    >
      <ul className={styles.list}>
        {subItems.map((subItem) => (
          <li key={subItem.label} className={styles.item}>
            <Link href={subItem.href} className={styles.link}>
              {subItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
