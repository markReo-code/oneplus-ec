"use client";

import Link from "next/link";
import styles from "./index.module.css"
import { useNoDropdownTransition } from "@/app/_hooks/useNoDropdownTransition";

type Props = {
    subItems: {label: string; href: string}[];
    isOpen: boolean;
    panelId: string;
}

export default function DesktopDropdownMenu({subItems, isOpen, panelId}: Props) {
    const noTransition = useNoDropdownTransition();

    return (
        <div 
          id={panelId}
          className={`${styles.panel} ${isOpen ? styles.open : ""} ${noTransition ? styles.noTransition : ""}`}
          aria-hidden={!isOpen}
          >
            <ul className={styles.list}>
                {subItems.map((subItem) => (
                    <li key={subItem.label} className={styles.item}>
                        <Link href={subItem.href} className={styles.link}>
                          <span className="u-hover-line">{subItem.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
